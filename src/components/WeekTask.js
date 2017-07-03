import React,{ Component } from 'react';
import { Grid, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskList from './TaskList';
import TaskModal from './TaskModal';

/**
* Representation of tasks lists for a week (week-end excluded)
**/
class WeekTask extends Component {

// Get tasks from props ?

  constructor(props) {
    super(props);
  }

  getTasksByDay(dayIndex) {
    return this.props.tasks.filter((task) => {
      return task.day ==dayIndex;
    });
  }

  handleAddTask(){

  }

  render() {
    return (
      <Grid className="Dailytasks" padded>
        <Divider className="title" inverted horizontal>Daily Tasks</Divider>
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
        <TaskModal />
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
