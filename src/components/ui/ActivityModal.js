import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Input, Dropdown, Icon } from 'semantic-ui-react';
import moment from 'moment';





class ActivityModal extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open ? this.props.open : false,
      weekDate: this.props.weekDate,
      durationError: false,
      modActivity: this.props.activity ? true : false
    };
    this.initializeState(this.props.activity);
  }

  initializeState = (activity) => {
    if(activity){
      this.setState({
        id: activity.id,
        name: activity.name,
        date: activity.date,
        hour: activity.hour,
        duration: activity.duration,
        distance: activity.distance,
        description: activity.description,
        sport: activity.sport,
        activityType: activity.activityType,
        status: activity.status,
        resultat: activity.resulat
      });
    }
    else{
      this.setState({
        id: null,
        name: '',
        date: '',
        hour: '',
        duration: '',
        distance: 0,
        description: '',
        sport: '',
        activityType: '',
        status: false,
        resultat: ''
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      weekDate: nextProps.weekDate,
      open: nextProps.open,
      modActivity: nextProps.activity ? true : false
    });

    this.initializeState(nextProps.activity);
  }

  /*
  * This function launch process after component initialisation
  */
  componentWillMount(){
    if(this.props.getFreshSports) this.props.getFreshSports();
  }

  openModal = () => {
    this.setState({open: true});
    this.props.toggleModal();
  }

  closeModal = () => {
    this.setState({
      open: false

    });
    this.initializeState();
    this.props.toggleModal();
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


  // Handle input changes -----------------------------------------------
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

  handleDistanceChange = (e) => {
    this.setState({distance: e.target.value});
  }

  handleDayChange = (e, data) => {

    const activityDate = moment(this.state.weekDate).day(data.value);
    this.setState({date: activityDate});
  }

  handleHourChange = (e, data) => {
    this.setState({hour: data.value});
  }

  handleDurationChange = (e, data) => {
    this.setState({duration: data.value});
  }

  handleAdd = () => {

    if( !this.state.name || !this.state.date
      || !this.state.sport || !this.state.activityType ){
      console.log('Field must be filled');
      //TODO Notice user of his mistake
      return;
    }
    // console.log(this.state.date);
    // this.setState({date: moment(this.state.date)});
    // console.log(this.state.date);
    let dateActivityFormated;
    this.state.date ?  dateActivityFormated = moment(this.state.date).format('YYYY-MM-DD') : dateActivityFormated = undefined;

    // Dispatch Action
    this.props.onAddActivity({
      id: this.state.id,
      name: this.state.name,
      date:  dateActivityFormated,
      hour: this.state.hour,
      duration: this.state.duration,
      distance: this.state.distance,
      description:  this.state.description,
      sport:  this.state.sport,
      activityType: this.state.activityType,
      status: this.state.status,
      resultat: (this.state.resultat ? this.state.resultat : '')
    }, this.state.modActivity);



    return this.closeModal();
  }

  getDateFormated(laDate) {
    if( !laDate ) return null;
    return laDate.date()+'/'+(laDate.month()+1)+'/'+laDate.year();
  }

  getDateActivityFormated(laDate) {
    return laDate.year()+'-'+(laDate.month()+1)+'-'+laDate.date();
  }

  displayDistance = (activityType) => {
    if ( activityType == 'distance' ) {
      return ( <Input className='inputModal' fluid placeholder='distance' label={{ basic: true, content: 'Distance' }}
        labelPosition='left' value={this.state.distance} onChange={this.handleDistanceChange}/>
      );
    }
  }

  generateForm = () => {
    return (
      <div className='ModalInputGroup'>

        <Input className='inputModal' fluid placeholder='Name...' label={{ basic: true, content: 'Name' }}
          labelPosition='left' value={this.state.name} onChange={this.handleNameChange}/>

        <Input className='inputModal' fluid placeholder='Description...' label={{ basic: true, content: 'Description' }}
          labelPosition='left' value={this.state.description} onChange={this.handleDescriptionChange}/>

        <Dropdown className='inputModal' placeholder='Select Sport'fluid search
          selection options={this.getSportOptions()} defaultValue={this.state.sport} onChange={this.handleSportChange}/>

        <Dropdown className='inputModal' placeholder='Select Sport Type'
          fluid search selection options={this.getTypeOptions()}
          defaultValue={this.state.activityType} onChange={this.handleTypeChange}/>
        {
          this.displayDistance(this.state.activityType)
        }
        <Dropdown className='inputModal' placeholder='Select Day'
          fluid search selection options={dayOptions}
          defaultValue={moment(this.state.date).format('e')} onChange={this.handleDayChange}/>

        <Dropdown className='icon inputModal' placeholder='Select Hour'
          fluid search selection labeled floating button icon='calendar' options={hourOptions}
          defaultValue={this.state.hour} onChange={this.handleHourChange}/>

        <Dropdown className='icon inputModal' placeholder='Select Duration'
          fluid search selection labeled floating button icon='time' options={durationOptions}
          defaultValue={this.state.duration} onChange={this.handleDurationChange}/>
      </div>
    );
  }

  render (){
    return (
      <div className='ActivityModal'>
        <Button inverted circular={true} onClick={this.openModal}>Add Activity</Button>
        <Modal size='small' dimmer='blurring' open={this.state.open} >
          <Modal.Header>Add an Activity on {this.getDateFormated(this.state.weekDate)} week </Modal.Header>
          {
            this.generateForm()
          }
          <Modal.Actions>
            <Button basic color='red' onClick={this.closeModal}>
              <Icon name='remove' /> Cancel
            </Button>
            <Button color='green' onClick={this.handleAdd}>
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
  open: PropTypes.boolean,
  toggleModal: PropTypes.func,
  onAddActivity: PropTypes.func,
  getFreshSports: PropTypes.func,
  sports: PropTypes.array,
  activity: PropTypes.object,
};


const dayOptions = [ { key: '1', value: '1', text: 'Lundi' },
  { key: '2', value: '2', text: 'Mardi' },
  { key: '3', value: '3', text: 'Mercredi' },
  { key: '4', value: '4', text: 'Jeudi' },
  { key: '5', value: '5', text: 'Vendredi' },
  { key: '6', value: '6', text: 'Samedi' },
  { key: '7', value: '7 ', text: 'Dimanche' }];

const hourOptions = [ { key: '1', value: '0', text: '00:00' },
  { key: '2', value: '1', text: '01:00' },
  { key: '3', value: '2', text: '02:00' },
  { key: '4', value: '3', text: '03:00' },
  { key: '5', value: '4', text: '04:00' },
  { key: '6', value: '5', text: '05:00' },
  { key: '7', value: '6', text: '06:00' },
  { key: '8', value: '7', text: '07:00' },
  { key: '9', value: '8', text: '08:00' },
  { key: '10', value: '9', text: '09:00' },
  { key: '11', value: '10', text: '10:00' },
  { key: '12', value: '11', text: '11:00' },
  { key: '13', value: '12', text: '12:00' },
  { key: '14', value: '13', text: '13:00' },
  { key: '15', value: '14', text: '14:00' },
  { key: '16', value: '15', text: '15:00' },
  { key: '17', value: '16', text: '16:00' },
  { key: '18', value: '17', text: '17:00' },
  { key: '19', value: '18', text: '18:00' },
  { key: '20', value: '19', text: '19:00' },
  { key: '21', value: '20', text: '20:00' },
  { key: '22', value: '21', text: '21:00' },
  { key: '23', value: '22', text: '22:00' },
  { key: '24', value: '23', text: '23:00' }];

const durationOptions = [ { key: '0', value: '0', text: '00:30' },
  { key: '1', value: '1', text: '01:00' },
  { key: '2', value: '1.5', text: '01:30' },
  { key: '3', value: '2', text: '02:00' },
  { key: '4', value: '2.5', text: '02:30' },
  { key: '5', value: '3', text: '03:00' },
  { key: '6', value: '3.5', text: '03:30' },
  { key: '7', value: '4', text: '04:00' },
  { key: '8', value: '4.5', text: '04:30' },
  { key: '9', value: '5', text: '05:00' },
  { key: '10', value: '5.5', text: '05:30' },
  { key: '11', value: '6', text: '06:00' }];

export default ActivityModal;
