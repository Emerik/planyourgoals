import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Input, Dropdown, Icon } from 'semantic-ui-react';
import moment from 'moment';


const dayOptions = [ { key: '1', value: '1', text: 'Lundi' },
  { key: '2', value: '2', text: 'Mardi' },
  { key: '3', value: '3', text: 'Mercredi' },
  { key: '4', value: '4', text: 'Jeudi' },
  { key: '5', value: '5', text: 'Vendredi' }];


class ActivityModal extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      open: false,
      weekDate: this.props.weekDate,
      name: '',
      date: '',
      description: '',
      sport: '',
      activityType: '',
      target: -1,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ weekDate: nextProps.weekDate });
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
    if(this.props.sports){

      const sport =  this.props.sports.find( (sport) => {
        if(sport.name === this.state.sport) return true;
      });

      if(sport == undefined || sport.activityTypes == undefined) return {};
      return sport.activityTypes.map( (type, index) => {
        return (
          { key: index,
            value: type,
            text: type
          }
        );
      });
    }

    return [];
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value});
  }

  handleDescriptionChange = (e) => {
    this.setState({description: e.target.value});
  }

  handleSportChange = (e, data) => {
    this.setState({sport: data.value});
  }

  handleTypeChange = (e, data) => {
    this.setState({activityType: data.value});
  }

  handleTargetChange = (e) => {
    this.setState({target: e.target.value});
  }


  handleDayChange = (e, data) => {

    const activityDate = moment(this.state.weekDate).day(data.value);
    this.setState({date: activityDate});
  }

  handleAdd = () => {

    if( !this.state.name || !this.state.date){
      console.log('Field must be filled');
      return;
    }

    const dateActivityFormated = this.state.date.format('YYYY-MM-DD');

    // CLose the modal
    this.setState({open: false});

    // Dispatch Action
    return this.props.onAddActivity({
      name: this.state.name,
      date:  dateActivityFormated,
      description:  this.state.description,
      sport:  this.state.sport,
      activityType: this.state.activityType,
      status: false,
      target: this.state.target,
      resultat:''
    });
  }

  getDateFormated(laDate) {
    if( !laDate ) return null;
    return laDate.date()+'/'+(laDate.month()+1)+'/'+laDate.year();
  }

  getDateActivityFormated(laDate) {
    return laDate.year()+'-'+(laDate.month()+1)+'-'+laDate.date();
  }

  render (){
    return (
      <div className='ActivityModal'>

        <Button inverted circular={true} onClick={this.openModal}>Add Activity</Button>

        <Modal size='small' dimmer='blurring' open={this.state.open} >
          <Modal.Header>Add an Activity on {this.getDateFormated(this.state.weekDate)} week </Modal.Header>
          <div className='ModalInputGroup'>

            <Input className='inputModal' fluid placeholder='Name...' label={{ basic: true, content: 'Name' }}
              labelPosition='left' value={this.state.name} onChange={this.handleNameChange}/>

            <Input className='inputModal' fluid placeholder='Description...' label={{ basic: true, content: 'Description' }}
              labelPosition='left' value={this.state.description} onChange={this.handleDescriptionChange}/>

            <Dropdown className='inputModal' placeholder='Select Sport'
              fluid search selection options={this.getSportOptions()} onChange={this.handleSportChange}/>

            <Dropdown className='inputModal' placeholder='Select Sport Type'
              fluid search selection options={this.getTypeOptions()} onChange={this.handleTypeChange}/>

            <Input className='inputModal' fluid placeholder='objectif' label={{ basic: true, content: 'Objectif' }}
              labelPosition='left' value={this.state.target} onChange={this.handleTargetChange}/>

            <Dropdown className='inputModal' placeholder='Select Day'
              fluid search selection options={dayOptions} onChange={this.handleDayChange}/>
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

ActivityModal.propTypes = {
  weekDate: PropTypes.object.isRequired,
  onAddActivity: PropTypes.func,
  sports: PropTypes.array
};

export default ActivityModal;
