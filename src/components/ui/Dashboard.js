import React,{ Component } from 'react';
import { Segment, Grid, Icon, Header, Divider, Popup, Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CircularProgressbar from 'react-circular-progressbar';
import moment from 'moment';
import GoalModal from '../container/GoalModalContainer';

/**
* Dashboard with metrics and stats
**/
class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weekDate: moment().day('Monday'),
      typeSelected: {
        name: (this.props.goals &&  this.props.goals.length != 0) ? this.props.goals[0].type : '',
        index: 0
      },
    };
  }

  /*
  * This function return the number of activites done
  */
  getActivityDonePerc() {

    if( !this.props.activities || this.props.activities.length == 0 ) return 0;

    let nbDone = this.props.activities.reduce( (nbDone, activity) => {
      if(activity.status == true) return nbDone + 1;
      return nbDone;
    }, 0);

    return Math.round(nbDone*100/this.props.activities.length);
  }

  /*
  * This function return the number of activities done
  */
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


  /*
  * This function return the percentage of activities done by the type selected
  */
  getActivityDoneByTypePerc(activities, goal) {

    const activityDone = this.getActivityDoneByType(activities, goal);

    const activityNumber = this.getActivityNumberByType(activities, goal);

    if(activityNumber === 0) return 0;

    return Math.round(activityDone*100/activityNumber);
  }

  /*
  * This function return the number of activities completed by type
  */
  getActivityDoneByType(activities, goal) {
    if( !activities || !goal) return 0;
    return activities.reduce((nbDone, activity) => {
      if(activity.goal == goal && activity.status == true) return nbDone + 1;
      return nbDone;
    }, 0);
  }

  /*
  * This function return the number of activities by the type
  */
  getActivityNumberByType(activities, goal){
    if(!activities) return 0;

    return activities.reduce((nbr, activity) => {
      if(activity.goal == goal) return nbr + 1;
      return nbr;
    }, 0);
  }

  /*
  * This function change the type selected (decrement)
  */
  previousType = () => {

    if(!this.props.goals || this.props.goals.length == 0) return;

    const indexPrevious = this.state.typeSelected.index == 0 ?
      (this.props.goals.length-1)
      : this.state.typeSelected.index-1;

    this.setState({
      typeSelected: {
        name: this.props.goals[indexPrevious].type,
        index: indexPrevious
      }
    });
  }

  /*
  * This function change the type selected (increment)
  */
  nextType = () => {

    if(!this.props.goals || this.props.goals.length == 0) return;

    const indexNext = this.state.typeSelected.index == (this.props.goals.length-1)  ?
      0
      : this.state.typeSelected.index+1;

    this.setState({
      typeSelected: {
        name: this.props.goals[indexNext].type,
        index: indexNext
      }
    });
  }

  /**
  * This function return the color for goal depending on deadline
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
  * This function return the icon to set for a goal according to his progress
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
  * This function retrun HTML for goals
  **/
  generateGoals = (goals) => {
    if(!goals) return;

    return goals.map( (goal, index) => {
      return (
        <Popup key={index}
          trigger={
            <Segment  color={this.getGoalColor(goal.deadline)}>
              <Header size='small'>
                <Icon name={this.getGoalProgressIcon(goal)} />
                <Header.Content>
                  {goal.name}
                </Header.Content>
              </Header>
            </Segment>
          }
          hoverable
          position='right center'
          inverted
          flowing
        >
          <Grid centered columns={2}>
            <Grid.Column textAlign='center'>
              <Header as='h3'>Deadline</Header>
              <p><b>{goal.deadline}</b></p>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Header as='h3'>Target</Header>
              <p><b>{goal.target}</b></p>
            </Grid.Column>
          </Grid>
        </Popup>
      );
    });
  }

  getActivityDoneByGoal = (goal) => {
    //TODO calculate Activity done percentage for a goal given
    return 50;
  }

  getProgressByGoalType = (goal) => {
    //TODO return HTML to show progress depend of the goal type (distance, duration, frequency)
  }

  getSportTime = () => {
    if( !this.props.activities ) return 0;

    return this.props.activities.reduce( (acc, activity) => {
      return acc + +activity.duration;
    }, 0);

  }

  getDistance = () => {
    if( !this.props.activities ) return 0;

    return this.props.activities.reduce( (acc, activity) => {
      if( activity.distance != null ) return acc + +activity.distance;
      else return 0;
    }, 0);

  }

  /**
  * This function return HTML for goals
  **/
  generateGoalsV2 = (goals) => {
    if (!goals) return [];

    const htmlGoals =  goals.map( (goal) => {
      return { menuItem: goal.name, render: () =>
        <Tab.Pane>
          <Grid centered columns={3}>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Header as='h3'>Date</Header>
                <p><b>{goal.startingdate+'->'+goal.deadline}</b></p>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Header as='h3'>Target</Header>
                <p><b>{goal.target}</b></p>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Header as='h3'>Sport</Header>
                <p><b>{goal.sport}</b></p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <div className='CirProgBarSmall'>
                <CircularProgressbar percentage={this.getActivityDoneByGoal()}/>
                You achieved {this.getActivityDoneByGoal()}% of your Goal !

                {this.getProgressByGoalType()}
              </div>
            </Grid.Row>
          </Grid>
        </Tab.Pane> };
    });

    const generalStats = { menuItem: 'Statistiques', render: () =>
      <Tab.Pane>
        <Grid centered columns={2}>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Header as='h3'>Temps total</Header>
              <p><b>{this.getSportTime()+'H'}</b></p>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Header as='h3'>Distance total</Header>
              <p><b>{this.getDistance()+'km'}</b></p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <div className='CirProgBarSmall'>
              <CircularProgressbar percentage={75}/>
            </div>
          </Grid.Row>
        </Grid>
      </Tab.Pane> };

    htmlGoals.unshift(generalStats);

    return htmlGoals;
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
  goals: PropTypes.array
};

export default Dashboard;
