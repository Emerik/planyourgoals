import React,{ Component } from 'react';
import { Segment, Grid, Header, Divider, Tab, Label, Icon, Statistic } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CircularProgressbar from 'react-circular-progressbar';
import moment from 'moment';
import * as utilFunc from '../../utils/activityFunc';
import GoalModal from '../container/GoalModalContainer';
import PieChart from 'react-svg-piechart';

/**
* Dashboard with metrics and stats
**/
class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weekDate: moment().day('Monday'),
      dateCursor: 0,
      typeSelected: {
        name: (this.props.goals &&  this.props.goals.length != 0) ? this.props.goals[0].type : '',
        index: 0
      },
      totalDistance: 0,
      totalTime: 0,
      expandedSector: null
    };

    this.handleMouseEnterOnSector = this.handleMouseEnterOnSector.bind(this);
  }

  /*
  * This function launch process after component initialisation
  */
  componentWillMount(){
    if(this.props.loadGoalsFromServer) this.props.loadGoalsFromServer();
    if(this.props.loadActivitiesFromServer) this.props.loadActivitiesFromServer();

    this.setState({
      totalTime : utilFunc.getSportTime(this.props.activities),
      totalDistance: utilFunc.getSportDistance(this.props.activities)});
  }

  /**
  * This function change chart sector selected and update sport counters
  **/
  handleMouseEnterOnSector(sector) {
    let startingdate = moment().date(1).subtract(12-this.state.dateCursor,'months');
    let deadline = moment();
    let activityFiltered = utilFunc.getActivityInterval(
      this.props.activities, startingdate, deadline);

    this.setState({
      expandedSector: sector,
      totalTime : utilFunc.getSportTime(activityFiltered, this.getSportData()[sector]),
      totalDistance : utilFunc.getSportDistance(activityFiltered, this.getSportData()[sector])
    });
  }


  /**
  * [Unused] This function return the number of activities done
  **/
  getActivityDonePercByWeek() {
    // If activities is empty
    if( !this.props.activities || this.props.activities.length == 0 ) return 0;

    const endWeek = moment(this.state.weekDate).add(7,'d');
    const weekActivity = this.props.activities.filter( (activity) => {
      const activityDate = moment(activity.date, 'YYYY-MM-DD');
      if(
        ( activityDate.isAfter(this.state.weekDate, 'day') && activityDate.isBefore(endWeek, 'day') )
        ||
        (activityDate.isSame(this.state.weekDate, 'day'))
      ){
        return true;
      }
    });

    let nbDone = weekActivity.reduce( (nbDone, activity) => {
      if(activity.status == true) return nbDone + 1;
      return nbDone;
    }, 0);

    if(nbDone === 0) return 0;

    return Math.round(nbDone*100/weekActivity.length);
  }


  /**
  * [Unused] This function return the color for goal depending on deadline
  **/
  getGoalColor = (deadline) => {
    if(moment().unix() > moment(deadline, 'YYYY-MM-DD').unix()){
      return 'red';
    }
    else if ( moment(deadline, 'YYYY-MM-DD').diff(moment(), 'days') < 8  ){
      return 'violet';
    }
    else {
      return 'green';
    }
  }

  /**
  * [Unused] This function return the icon to set for a goal according to his progress
  **/
  getGoalProgressIcon = (goal) => {
    const activityDone = this.getActivityDoneByType(this.props.activities, goal.type);

    if(goal.target <= activityDone){
      return 'checkmark';
    }
    else if (activityDone == 0){
      return 'wait';
    }
    else {
      return 'wrench';
    }
  }

  /**
  * This function return sport data from activities for general stats
  */
  getSportData = () =>{

    const colorArray = [ 'teal', 'orange',  'green', 'yellow', 'teal', 'blue','red'];

    // We get sports from activities
    let sportArray = this.props.activities.map((activity) => {
      return activity.sport;
    });

    // We filter to get only distinct values
    sportArray = sportArray.filter( (value, index, array) => {
      return array.indexOf(value) === index;
    }
    );

    // We get Date selected by user
    const deadline = moment().date(1).subtract(12-this.state.dateCursor,'months');

    //  We count occurence
    sportArray = sportArray.map( (sportActivity) => {
      return {
        name: sportActivity,
        occ: this.props.activities.reduce( (acc, activity) => {
          const activityDate = moment(activity.date, 'YYYY-MM-DD');
          if(sportActivity == activity.sport
            && (activityDate.isAfter(deadline, 'day') || activityDate.isSame(deadline, 'day'))
          ){

            return acc+1;
          }
          else return acc;
        }, 0)
      };
    });

    // We return an array
    return sportArray.map( (sport, index) => {
      return {
        label: sport.name,
        value: sport.occ,
        color: colorArray[index]};
    });

  }


  handleDelete = (goal) => {
    // Dispatch Action
    return this.props.onRemoveGoal({
      id: goal.id,
      name: goal.name,
      startingdate:  goal.startingdate,
      deadline: goal.deadline,
      sport: goal.sport,
      target: goal.target,
      goaltype:  goal.goaltype
    });
  }

  /**
  * This function change date taking into account to calculate totals
  */
  handleDateChange = (e) => {
    this.setState({
      dateCursor: e.target.value
    }, () => {
      // Update of time & distance must be operated after date update
      let startingdate = moment().date(1).subtract(12-this.state.dateCursor,'months');
      let deadline = moment();
      let activityFiltered = utilFunc.getActivityInterval(
        this.props.activities, startingdate, deadline);
      this.setState({
        totalTime : utilFunc.getSportTime(activityFiltered),
        totalDistance : utilFunc.getSportDistance(activityFiltered)
      });
    }
    );
  }

  /**
  * This function return the date selected with the cursor
  */
  getDateLimit = () => {
    return moment().date(1).subtract(12-this.state.dateCursor,'months').format('MMM YYYY');
  }


  /**
  * This function generate HTML for goal
  **/
  generateGoalStats = (goal) => {
    return { menuItem: goal.name, render: () =>
      <Tab.Pane>
        <Grid centered columns={4}>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Header as='h3'>Date</Header>
              <p><b>{'['+goal.startingdate+'] -> ['+goal.deadline+']'}</b></p>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Header as='h3'>Objectif</Header>
              <p><b>{goal.target}</b></p>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Header as='h3'>Sport</Header>
              <p><b>{goal.sport}</b></p>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Header as='h3'>Type</Header>
              <p><b>{this.getLabelGoaltype(+goal.goaltype)}</b></p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center' width='10'>
              <div className='CirProgBarSmall'>
                <CircularProgressbar percentage={utilFunc.getProgressByGoalType(this.props.activities, goal)}/>
                You achieved {utilFunc.getProgressByGoalType(this.props.activities, goal)}%
                ({utilFunc.getActivityDoneByGoal(this.props.activities, goal).length}/{goal.target})
                 of your Goal !
              </div>
            </Grid.Column>
            <Grid.Column textAlign='center' width='6'>
              <Header as='h3'>Actvités</Header>
              <div style={ {height:'200px', overflowY:'auto'} }>
                {
                  utilFunc.getGoalActivity(this.props.activities, goal).map( (activity, index) => {
                    console.log('[1] '+activity.status+' '+activity.id);
                    return <Segment key={index}> {activity.name.substring(0,30)}</Segment>;
                  } )
                }
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Icon name='delete' size='medium' color='red' link fitted onClick={() => this.handleDelete(goal)}/>
          </Grid.Row>
        </Grid>
      </Tab.Pane> };
  }


  /**
  * This function return HTML for goals
  **/
  generateGoalsV2 = (goals) => {
    if (!goals) return [];

    const htmlGoals =  goals.map( (goal) => this.generateGoalStats(goal) );


    const data = this.getSportData();

    const generalStats = { menuItem: 'Statistiques', render: () =>
      <Tab.Pane>
        <Grid centered columns={2} padded>
          <Grid.Row>
            <Header as='h2'>Statistiques Global</Header>
          </Grid.Row>
          <Grid.Row>
            <Header as='h3'>
              <Header.Content>
                Depuis :  {this.getDateLimit()}
              </Header.Content>
            </Header>
            <div style={ {width:'100%'} }>
              <input type='range'  min={0} max={12} value={this.state.dateCursor} onChange={this.handleDateChange} />
            </div>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Statistic size='small'>
                <Statistic.Label>Temps total</Statistic.Label>
                <Statistic.Value>{this.state.totalTime+'H'}</Statistic.Value>
              </Statistic>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Statistic size='small'>
                <Statistic.Label>Distance total</Statistic.Label>
                <Statistic.Value>{this.state.totalDistance+'km'}</Statistic.Value>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div>
                <PieChart
                  className='pieChartDashboard'
                  data={ data }
                  expandedSector={this.state.expandedSector}
                  onSectorHover={this.handleMouseEnterOnSector}
                  sectorStrokeWidth={2}
                  expandOnHover
                  shrinkOnTouchEnd
                />
              </div>
            </Grid.Column>
            <Grid.Column >
              <div>
                {
                  data.map((element, i) => (
                    <div key={i} style={{margin:'5%'}}>
                      <Label size='large' color={element.color} horizontal>
                        {
                          this.state.expandedSector === i ? (<Icon name='selected radio'/>) : ''
                        }
                        {element.label} : {element.value}
                      </Label>
                    </div>
                  ))
                }
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Tab.Pane> };

    htmlGoals.unshift(generalStats);

    return htmlGoals;
  }

  /**
  * This function return the label of an goaltype from its ID
  */
  getLabelGoaltype(idGoalType){

    const goaltype =  this.props.goaltypes.find((goaltype) => {
      if(goaltype.id == idGoalType) return goaltype;
    });

    return goaltype.name;
  }

  render() {
    return (
      <div className='Dashboard'>
        <Header textAlign='center' size='huge' inverted>
            Dashboard
        </Header>
        <Segment style={{textAlign:'center'}}>
          <Tab menu={{ fluid: true, vertical: true, tabular: 'left', secondary:true, pointing:true }} panes={this.generateGoalsV2(this.props.goals)} />
          <Divider/>
          <GoalModal/>
        </Segment>
      </div>
    );
  }

}

Dashboard.propTypes = {
  activities: PropTypes.array,
  goals: PropTypes.array,
  goaltypes: PropTypes.array,
  onRemoveGoal: PropTypes.func,
  loadGoalsFromServer: PropTypes.func,
  loadActivitiesFromServer: PropTypes.func
};

export default Dashboard;
