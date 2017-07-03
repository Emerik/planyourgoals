import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Input, Dropdown, Icon } from 'semantic-ui-react';
import { addTask } from '../actions/actions';
import { connect } from 'react-redux';


const dayOptions = [ { key: '1', value: '1', text: 'Lundi' },
  { key: '2', value: '2', text: 'Mardi' },
  { key: '3', value: '3', text: 'Mercredi' },
  { key: '4', value: '4', text: 'Jeudi' },
  { key: '5', value: '5', text: 'Vendredi' }];


class TaskModal extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: 'Naming',
      description: '',
      type: 'Normal',
      day: ''
    };
  }


  openModal = () => {
    this.setState({open: true});
  }

  closeModal = () => {
    this.setState({open: false});
  }


  handleNameChange = (e) => {
    this.setState({name: e.target.value});
  }

  handleDescriptionChange = (e) => {
    this.setState({description: e.target.value});
  }

  handleTypeChange = (e) => {
    this.setState({type: e.target.value});
  }

  handleDayChange = (e, data) => {
    this.setState({day: data.value});
  }

  handleAdd = () => {

    if( !this.state.name || !this.state.day) return;

    // CLose the modal
    this.setState({open: false});

    // Dispatch Action
    return this.props.onAddTask({
      name: this.state.name,
      description:  this.state.description,
      type:  this.state.type,
      status: false,
      day:  this.state.day
    });
  }

  render (){
    return (
      <div className='TaskModal'>

        <Button inverted circular={true} onClick={this.openModal}>Add Task</Button>

        <Modal size='small' dimmer='blurring' open={this.state.open} >
          <Modal.Header>Add a Task</Modal.Header>
          <div className='ModalInputGroup'>
            <Input className='inputModal' fluid placeholder='Name...' value={this.state.name} onChange={this.handleNameChange}/>

            <Input className='inputModal' fluid placeholder='Description...' value={this.state.description} onChange={this.handleDescriptionChange}/>

            <Input className='inputModal' fluid placeholder='Type...' value={this.state.type} onChange={this.handleTypeChange}/>

            <Dropdown placeholder='Select Day' fluid search selection options={dayOptions} onChange={this.handleDayChange}/>
          </div>
          <Modal.Actions>
            <Button basic color='red' onClick={this.closeModal}>
              <Icon name='remove' /> Cancel
            </Button>
            <Button color='green'onClick={this.handleAdd}>
              <Icon name='checkmark' /> Add
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

}

TaskModal.propTypes = {
  onAddTask: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTask(task){
      dispatch(addTask(task));
    }
  };
};

export default connect (null, mapDispatchToProps) (TaskModal);
