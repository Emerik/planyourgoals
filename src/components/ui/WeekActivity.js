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
    this.state = {
      weekDate: this.getMonday(),
      openModal: false,
      activitySelected: undefined
    };

  }

  /*
  * This function launch process after component initialisation
  */
  componentWillMount(){
    if(this.props.loadActivitiesFromServer) this.props.loadActivitiesFromServer();
  }

  getMonday() {
    if(moment().format('e') != 0) return moment().day('Monday');

    // If it's Sunday
    return moment().day(0 - 6); // Get Last Monday
  }

  getWeekActivities() {
    if(this.state.weekDate && this.props.activities){
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
    else {
      return [];
    }
  }

  getActivitiesByDay(dayIndex) {
    const dayActivities =  this.getWeekActivities().filter((activity) => {
      return (new Date(activity.date)).getDay() == dayIndex;
    });

    return dayActivities.sort( (activityA, activityB) => {
      return +activityA.hour - +activityB.hour;
    });
  }

  previousWeek = () => {
    if(this.state.weekDate){
      const newDate = moment(this.state.weekDate).subtract(7, 'd');
      this.setState({weekDate: newDate});
    }
  }

  nextWeek = () => {
    if(this.state.weekDate){
      const newDate = moment(this.state.weekDate).add(7, 'd');
      this.setState({weekDate: newDate});
    }
  }

  getDateFormated() {
    if(this.state.weekDate){
      const laDate = moment(this.state.weekDate);
      return laDate.date()+' '+(laDate.format('MMMM'))+' '+laDate.year();
    }
  }

  toggleModal = (activity) => {
    this.setState({
      openModal: !this.state.openModal,
      activitySelected : activity
    });
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
              <ActivityList name={'Lundi'} activities={this.getActivitiesByDay(1)} toggleModal={this.toggleModal}/>
            </div>
            <div className="column ui segment">
              <ActivityList name={'Mardi'} activities={this.getActivitiesByDay(2)} toggleModal={this.toggleModal}/>
            </div>
            <div className="column ui segment">
              <ActivityList name={'Mercredi'} activities={this.getActivitiesByDay(3)} toggleModal={this.toggleModal}/>
            </div>
            <div className="column ui segment">
              <ActivityList name={'Jeudi'} activities={this.getActivitiesByDay(4)} toggleModal={this.toggleModal}/>
            </div>
            <div className="column ui segment">
              <ActivityList name={'Vendredi'} activities={this.getActivitiesByDay(5)} toggleModal={this.toggleModal}/>
            </div>
            <div className="column ui segment">
              <ActivityList name={'Samedi'} activities={this.getActivitiesByDay(6)} toggleModal={this.toggleModal}/>
            </div>
            <div className="column ui segment">
              <ActivityList name={'Dimanche'} activities={this.getActivitiesByDay(0)} toggleModal={this.toggleModal}/>
            </div>
          </div>
          <ActivityModal weekDate={this.state.weekDate} open={this.state.openModal} activity={this.state.activitySelected} toggleModal={this.toggleModal}/>
        </Grid>
      </div>
    );
  }
}

WeekActivity.propTypes = {
  activities: PropTypes.array,
  loadActivitiesFromServer: PropTypes.function
};



export default WeekActivity;
