import React,{ Component } from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ActivityList from './ActivityList';
import ActivityModal from '../container/ActivityModalContainer';
import moment from 'moment';

/**
* Representation of activities lists for a week (week-end excluded)
**/
class WeekActivity extends Component {


  constructor(props) {
    super(props);
    this.state = {weekDate: this.getMonday()};

  }

  getMonday() {
    return moment().day('Monday');
  }

  getWeekActivities() {
    const endWeek = moment(this.state.weekDate).add(7,'d');
    return this.props.activities.filter( (activity) => {
      const activityDate = moment(activity.date, 'YYYY-MM-DD');
      if(
        ( activityDate.isAfter(this.state.weekDate, 'day') && activityDate.isBefore(endWeek, 'day') )
        ||
        (activityDate.isSame(this.state.weekDate, 'day'))
      ){
        return true;
      }
    });
  }

  getActivitiesByDay(dayIndex) {
    return this.getWeekActivities().filter((activity) => {
      return (new Date(activity.date)).getDay() == dayIndex;
    });
  }

  previousWeek = () => {
    const newDate = moment(this.state.weekDate).subtract(7, 'd');
    this.setState({weekDate: newDate});
  }

  nextWeek = () => {
    const newDate = moment(this.state.weekDate).add(7, 'd');
    this.setState({weekDate: newDate});
  }

  getDateFormated() {
    const laDate = moment(this.state.weekDate);
    return laDate.date()+' '+(laDate.format('MMMM'))+' '+laDate.year();
  }

  render() {
    return (
      <div className='WeekActivity'>
        <Header textAlign='center' size='huge' inverted>
            Week activities
        </Header>
        <Grid padded>
          <div style={{margin:'auto'}}>
            <Icon name='arrow left' inverted link size='large' onClick={this.previousWeek}/>
            <div className='StateDate'> {this.getDateFormated()} </div>
            <Icon name='arrow right' inverted link size='large' onClick={this.nextWeek}/>
          </div>
          <div className="five column row">
            <div className="column ui segment">
              <ActivityList name={'Lundi'} activities={this.getActivitiesByDay(1)}/>
            </div>
            <div className="column ui segment">
              <ActivityList name={'Mardi'} activities={this.getActivitiesByDay(2)}/>
            </div>
            <div className="column ui segment">
              <ActivityList name={'Mercredi'} activities={this.getActivitiesByDay(3)}/>
            </div>
            <div className="column ui segment">
              <ActivityList name={'Jeudi'} activities={this.getActivitiesByDay(4)}/>
            </div>
            <div className="column ui segment">
              <ActivityList name={'Vendredi'} activities={this.getActivitiesByDay(5)}/>
            </div>
          </div>
          <ActivityModal weekDate={this.state.weekDate}/>
        </Grid>
      </div>
    );
  }
}

WeekActivity.propTypes = {
  activities: PropTypes.array,
};



export default WeekActivity;
