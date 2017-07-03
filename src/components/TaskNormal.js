import React,{ Component } from 'react';
import { Checkbox, Card, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { removeTask, checkTask, uncheckTask } from '../actions/actions';
import { connect } from 'react-redux';

/**
* Representation of a Task
**/
class TaskNormal extends Component {

  constructor(props) {
    super(props);
  }

  handleCheckChange = () => {
    if(this.props.task.status == true){
      // Dispatch Action
      return this.props.onUncheckTask({
        name: this.props.task.name,
        description:  this.props.task.description,
        type:  this.props.task.type,
        status: false,
        day:  this.props.task.day
      });
    }
    else{
      // Dispatch Action
      return this.props.onCheckTask({
        name: this.props.task.name,
        description:  this.props.task.description,
        type:  this.props.task.type,
        status: true,
        day:  this.props.task.day
      });
    }
  }

  handleDelete = () => {

    // Dispatch Action
    return this.props.onDeleteTask({
      name: this.props.task.name,
      description:  this.props.task.description,
      type:  this.props.task.type,
      status: this.props.task.status,
      day:  this.props.task.day
    });
  }

  render() {
    return (
      <Card className="TaskNormal">
        <Card.Content>
          <Card.Content>
            <Checkbox label={this.props.task.name} defaultChecked={this.props.task.status} onClick={this.handleCheckChange}/>
          </Card.Content>
          <Card.Description>
            {this.props.task.description}
          </Card.Description>
          <Card.Meta>
            {this.props.task.type}
            <Icon name='delete' size='small' color='red' link onClick={ this.handleDelete}/>
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }

}

TaskNormal.propTypes = {
  task: PropTypes.object,
  onDeleteTask: PropTypes.func,
  onCheckTask: PropTypes.func,
  onUncheckTask: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteTask(task){
      dispatch(removeTask(task));
    },
    onCheckTask(task){
      dispatch(checkTask(task));
    },
    onUncheckTask(task){
      dispatch(uncheckTask(task));
    }
  };
};


export default connect (null, mapDispatchToProps) (TaskNormal);
