import React,{ Component } from 'react';
import { Segment, Grid, Icon, Header, Divider, Popup } from 'semantic-ui-react';
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

  render() {
    return (
      <div className='Dashboard'>
        <Header textAlign='center' size='huge' inverted>
            Dashboard
        </Header>
        <Segment style={{textAlign:'center'}}>
          <Grid>
            <div className="three column row">
              <div className="column ui">
                <div style={{width:'70%', display:'inline-block'}}>
                  <Header> Goals </Header>
                  <Divider/>
                  {
                    this.generateGoals(this.props.goals)
                  }
                </div>
              </div>
              <div className="column ui">
                <Header size='medium'>Week</Header>
                <Divider/>
                <div className='CirProgBarLarge'>
                  <CircularProgressbar percentage={this.getActivityDonePercByWeek()}/>
                </div>
              </div>
              <div className="column ui">
                <Header size='medium'>Goal</Header>
                <Divider/>
                <div className='CirProgBarMedium'>
                  <CircularProgressbar className='CirProgBarMedium' percentage={this.getActivityDoneByTypePerc(this.props.activities, this.state.typeSelected.name)} />
                </div>
                <div className='TitleWithIcon'>
                  <Icon name='arrow left' link fitted onClick={this.previousType}/>
                  <div className='progressTitle'>
                    {this.state.typeSelected.name}
                  </div>
                  <Icon name='arrow right' link fitted onClick={this.nextType}/>
                </div>
              </div>
            </div>
            {/*Second ROW*/}
            <div className="three column row">
              <div className="column ui">
              </div>
              <div className="column ui">
                <p>
                  What a journey! Look at all the activities you accomplished this week!
                </p>
              </div>
              <div className="column ui">
                <p>
                  <strong>{this.state.typeSelected.name}</strong> activities is on the road to success
                </p>
              </div>
            </div>
          </Grid>
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
