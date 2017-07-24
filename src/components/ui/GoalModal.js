import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Input, Icon, Segment, Label } from 'semantic-ui-react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';



class GoalModal extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      open: false,
      type: 'Sport',
      deadline: moment(),
      target: 0,
      targetError: false
    };
  }

  openModal = () => {
    this.setState({open: true});
  }

  closeModal = () => {
    this.setState({open: false});
  }


  handleTypeChange = (e) => {
    this.setState({type: e.target.value});
  }

  handleTargetChange = (e, data) => {

    if (data.value == parseInt(data.value, 10)){
      this.setState({
        target: data.value,
        targetError: false
      });

    }
    else {
      // Color input in red
      this.setState({targetError: true});
    }
  }

  handleDeadlineChange = ( date ) => {

    this.setState({deadline: date});
  }

  handleAdd = () => {

    if( !this.state.type || !this.state.deadline || this.state.target == 0){
      console.log('Field must be filled');
      return;
    }

    const dateActivityFormated = this.state.deadline.format('YYYY-MM-DD');

    // CLose the modal
    this.setState({open: false});

    // Dispatch Action
    return this.props.onAddGoal({

      type:  this.state.type,
      deadline:  dateActivityFormated,
      target: this.state.target,
      duration: 0
    });
  }

  render (){
    return (
      <div className='GoalModal'>

        <Button color='black' circular={true} onClick={this.openModal}>Add Goal</Button>

        <Modal size='small' dimmer='blurring' open={this.state.open} >
          <Modal.Header>Add a Goal </Modal.Header>
          <div className='ModalInputGroup'>

            <Segment className='inputModal'>
              <Label as='a' color='teal' ribbon>Date</Label>
              <SingleDatePicker
                date={this.state.deadline}
                onDateChange={this.handleDeadlineChange}
                focused={this.state.focused}
                onFocusChange={({ focused }) => this.setState({ focused })}
                numberOfMonths={1}
              />
            </Segment>

            <Input className='inputModal' fluid label={{ basic: true, content: 'Type' }}
              labelPosition='left' placeholder='Type...' onChange={this.handleTypeChange}/>

            <Input className='inputModal' fluid label={{ basic: true, content: 'Target' }}
              labelPosition='left' placeholder='Target...' error={this.state.targetError} onChange={this.handleTargetChange}/>


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

GoalModal.propTypes = {
  onAddGoal: PropTypes.func
};


export default GoalModal;
