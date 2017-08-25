import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Input, Icon, Segment, Label, Dropdown } from 'semantic-ui-react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

// TODO replace with real data (fetch or from store)
const goalType = [
  { key: 0,
    value: 'temps',
    text: 'temps'
  },
  { key: 1,
    value: 'distance',
    text: 'distance'
  },
  { key: 2,
    value: 'fréquence',
    text: 'fréquence'
  }];

class GoalModal extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      open: false,
      startingdate: moment(),
      deadline: moment(),
      sport: '',
      name: '',
      goalType: '',
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


  getSportOptions = () => {
    if(this.props.sports){
      return this.props.sports.map( (sport, index) => {
        return (
          { key: index,
            value: sport.name,
            text: sport.name
          }
        );
      });
    }

    return [];
  }

  getTypeOptions = () => {

    return goalType; // TODO put goal types into store or fetch from server
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value});
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

  handleStartingDateChange = ( date ) => {

    this.setState({startingdate: date});
  }

  handleDeadlineChange = ( date ) => {

    this.setState({deadline: date});
  }

  handleSportChange = (e, data) => {
    this.setState({sport: data.value});
  }

  handleTypeChange = (e, data) => {
    this.setState({goalType: data.value});
  }

  handleAdd = () => {

    if( !this.state.name || !this.state.deadline || this.state.target == 0){
      console.log('Field must be filled');
      return;
    }

    const startingdateFormated = this.state.startingdate.format('YYYY-MM-DD');
    const deadlineFormated = this.state.deadline.format('YYYY-MM-DD');


    // Close and reuthe modal
    this.setState({open: false});

    // Dispatch Action
    return this.props.onAddGoal({
      startingdate: startingdateFormated,
      deadline: deadlineFormated,
      sport: this.state.sport,
      name: this.state.name,
      goalType: this.state.goalType,
      target: this.state.target,
    });

  }

  render (){
    return (
      <div className='GoalModal'>

        <Button color='black' circular={true} onClick={this.openModal}>Add Goal</Button>

        <Modal size='small' dimmer='blurring' open={this.state.open} >
          <Modal.Header>Add a Goal </Modal.Header>
          <div className='ModalInputGroup'>

            <Input className='inputModal' fluid label={{ basic: true, content: 'Name' }}
              labelPosition='left' placeholder='Name...' onChange={this.handleNameChange}/>

            <DateRangePicker
              startDate={this.state.startingdate} // momentPropTypes.momentObj or null,
              endDate={this.state.deadline} // momentPropTypes.momentObj or null,
              onDatesChange={({ startDate, endDate }) => this.setState({ startingdate: startDate, deadline: endDate })} // PropTypes.func.isRequired,
              focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            />

            <Dropdown className='inputModal' placeholder='Select Sport'
              fluid search selection options={this.getSportOptions()} onChange={this.handleSportChange}/>

            <Dropdown className='inputModal' placeholder='Select Goal Type'
              fluid search selection options={this.getTypeOptions()} onChange={this.handleTypeChange}/>

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
  sports: PropTypes.array,
  onAddGoal: PropTypes.func
};


export default GoalModal;
