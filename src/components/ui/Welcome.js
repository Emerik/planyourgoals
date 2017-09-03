import React from 'react';
import PropTypes from 'prop-types';
import { Header, Grid, Segment, Image, Icon } from 'semantic-ui-react';
import moment from 'moment';



class Welcome extends React.Component {
  constructor(props){
    super(props);

  }

  componentDidMount(){

  }

  componentWillUnmount(){

  }


  getMonday() {
    return moment().day('Monday');
  }

  getWeekActivity = () => {
    // If activities is empty
    if( !this.props.activities || this.props.activities.length == 0 ) return null;

    const mondayDate = this.getMonday();
    const endWeek = moment(mondayDate).add(6,'d');

    return this.props.activities.filter( (activity) => {
      const activityDate = moment(activity.date, 'YYYY-MM-DD');

      if(
        ( activityDate.isAfter(mondayDate, 'day') && activityDate.isBefore(endWeek, 'day') )
        ||
        (activityDate.isSame(mondayDate, 'day') || activityDate.isSame(endWeek, 'day'))
      ){
        return true;
      }
    });
  }

  getActivityDone = () => {

    return this.getWeekActivity().map( (activity, index) => {

      if(activity.status == false) return;

      return (
        <Segment key={index}>
          <Header size='small'>
            <Image src={'images/'+activity.sport+'.png'} size='mini' />
            <Header.Content>
              {activity.name}
            </Header.Content>
          </Header>
        </Segment>
      );
    });

  }

  getActivityTodo = () => {
    return this.getWeekActivity().map( (activity, index) => {

      if(activity.status == true) return;

      return (
        <Segment key={index}>
          <Header size='small'>
            <Image src={'images/'+activity.sport+'.png'} size='mini' />
            <Header.Content>
              {activity.name}
            </Header.Content>
          </Header>
        </Segment>
      );
    });
  }

  getGoal = () => {
    // If activities is empty
    if( !this.props.goals || this.props.goals.length == 0 ) return null;

    const mondayDate = this.getMonday();
    const endWeek = moment().add(6,'d');

    const weekGoals = this.props.goals.filter( (goal) => {
      const goalStartDate = moment(goal.startingdate, 'YYYY-MM-DD');
      const goalEndDate = moment(goal.deadline, 'YYYY-MM-DD');
      if(
        ( goalStartDate.isBefore(mondayDate, 'day') && goalEndDate.isAfter(mondayDate, 'day') )
        ||
        (goalStartDate.isSame(mondayDate, 'day') || goalEndDate.isSame(mondayDate, 'day'))
        ||
        ( goalStartDate.isAfter(mondayDate, 'day') && goalStartDate.isBefore(endWeek, 'day') )
      ){
        return true;
      }
    });


    console.log(weekGoals);

    return weekGoals.map( (goal, index) => {
      return (
        <Segment  key={index} >
          <Header size='small'>
            <Icon name='target' />
            <Header.Content>
              {goal.name}
            </Header.Content>
          </Header>
        </Segment>
      );
    });
  }

  render () {
    return (
      <div className="Welcome">
        <h1 className="title">Plan Your Goals</h1>

        <Header as='h2' inverted> Welcome {this.props.user ? this.props.user.pseudo : 'Inconnu'} </Header>

        <Grid columns={3} divided inverted>
          <Grid.Row>
            <Grid.Column>
              <div>
                <Header as='h3' inverted> Activité faites </Header>
                {
                  // Lister les activités faites de la semaine
                  this.getActivityDone()
                }
              </div>
            </Grid.Column>
            <Grid.Column>
              <div>
                <Header as='h3' inverted> Activité à faire </Header>
                {
                  // Lister les activités a faire dans la semaine
                  this.getActivityTodo()
                }
              </div>
            </Grid.Column>
            <Grid.Column>
              <div>
                <Header as='h3' inverted> Objectifs </Header>
                {
                  // Lister les objectifs de la semaine
                  this.getGoal()
                }
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </div>
    );
  }

}

Welcome.propTypes = {
  user: PropTypes.object,
  activities: PropTypes.array,
  goals: PropTypes.array

};

export default Welcome;
