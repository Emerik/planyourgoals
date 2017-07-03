import React,{ Component } from 'react';
import { List, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import TaskNormal from './TaskNormal';

/**
* Respresentation of a list of Tasks
**/
class TaskList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="TaskList">
        <Header size='large'>{this.props.name}</Header>
        <List divided relaxed>
          {
            // Map task Comp
            this.props.tasks.map( (task, index) => {
              return (
                <List.Item key={index}>
                  <TaskNormal task={task}/>
                </List.Item>
              );
            })
          }
        </List>
      </div>
    );
  }
}

TaskList.propTypes = {
  name: PropTypes.string,
  tasks: PropTypes.array
};

export default TaskList;
