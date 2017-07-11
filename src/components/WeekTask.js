import React,{ Component } from 'react';
import { Grid, Divider, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskList from './TaskList';
import TaskModal from './TaskModal';
import moment from 'moment';

/**
* Representation of tasks lists for a week (week-end excluded)
**/
class WeekTask extends Component {

// Get tasks from props ?

  constructor(props) {
    super(props);
    this.state = {weekDate: this.getMonday()};

  }

  getMonday() {
    return moment().day('Monday');
  }

  getWeekTasks() {
    const endWeek = moment(this.state.weekDate).add(7,'d');
    return this.props.tasks.filter( (task) => {
      const taskDate = moment(task.date, 'YYYY-MM-DD');
      if(
        ( taskDate.isAfter(this.state.weekDate, 'day') && taskDate.isBefore(endWeek, 'day') )
        ||
        (taskDate.isSame(this.state.weekDate, 'day'))
      ){
        return true;
      }
    });
  }

  getTasksByDay(dayIndex) {
    return this.getWeekTasks().filter((task) => {
      return (new Date(task.date)).getDay() == dayIndex;
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
      <Grid className="Dailytasks" padded>
        <div style={{textAlign:'center'}}>
          <Divider className="title" inverted horizontal>Week Tasks</Divider>
          <Icon name='arrow left' inverted link size='large' onClick={this.previousWeek}/>
          <div className='StateDate'> {this.getDateFormated()} </div>
          <Icon name='arrow right' inverted link size='large' onClick={this.nextWeek}/>
        </div>
        <div className="five column row">
          <div className="column ui segment">
            <TaskList name={'Lundi'} tasks={this.getTasksByDay(1)}/>
          </div>
          <div className="column ui segment">
            <TaskList name={'Mardi'} tasks={this.getTasksByDay(2)}/>
          </div>
          <div className="column ui segment">
            <TaskList name={'Mercredi'} tasks={this.getTasksByDay(3)}/>
          </div>
          <div className="column ui segment">
            <TaskList name={'Jeudi'} tasks={this.getTasksByDay(4)}/>
          </div>
          <div className="column ui segment">
            <TaskList name={'Vendredi'} tasks={this.getTasksByDay(5)}/>
          </div>
        </div>
        <TaskModal weekDate={this.state.weekDate}/>
      </Grid>
    );
  }
}

WeekTask.propTypes = {
  tasks: PropTypes.array,
};


const mapStateToProps = state => {
  return {
    tasks: state.tasks
  };
};

export default connect (mapStateToProps) (WeekTask);
