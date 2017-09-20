import React,{ Component } from 'react';
import { Checkbox, Card, Icon, Image, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
* Representation of an Activity
**/
class ActivityNormal extends Component {

  constructor(props) {
    super(props);
  }

  handleCheckChange = () => {
    if(this.props.activity.status == true){
      // Dispatch Action
      return this.props.onUncheckActivity({
        id: this.props.activity.id,
        name: this.props.activity.name,
        date:  this.props.activity.date,
        hour: this.props.activity.hour,
        duration: this.props.activity.duration,
        distance: this.props.activity.distance,
        description:  this.props.activity.description,
        sport:  this.props.activity.sport,
        activityType: this.props.activity.activityType,
        status: false,
        resultat: this.props.activity.resultat
      });
    }
    else{
      // Dispatch Action
      return this.props.onCheckActivity({
        id: this.props.activity.id,
        name: this.props.activity.name,
        date:  this.props.activity.date,
        hour: this.props.activity.hour,
        duration: this.props.activity.duration,
        distance: this.props.activity.distance,
        description:  this.props.activity.description,
        sport:  this.props.activity.sport,
        activityType: this.props.activity.activityType,
        status: true,
        resultat: this.props.activity.resultat
      });
    }
  }

  handleDelete = () => {

    // Dispatch Action
    return this.props.onDeleteActivity({
      id: this.props.activity.id,
      name: this.props.activity.name,
      date:  this.props.activity.date,
      hour: this.props.activity.hour,
      duration: this.props.activity.duration,
      distance: this.props.activity.distance,
      description:  this.props.activity.description,
      sport:  this.props.activity.sport,
      activityType: this.props.activity.activityType,
      resultat: this.props.activity.reusltat
    });
  }

  getSportIcon = (sport) => {
    switch(sport){
    case 'tennis':
      return 'images/tennis.png';
    case 'cycling':
      return 'images/cycling.png';
    case 'running':
      return 'images/running.png';
    case 'swimming':
      return 'images/swimming.png';
    case 'triathlon':
      return 'images/triathlon.png';
    default:
      return '';
    }
  }

  displayDistance = (distance) => {
    if (!distance) return;

    return ( <Grid.Row columns={1}>
      {this.props.activity.distance+' Km'}
    </Grid.Row>
    );
  }

  onActivityClick = () => {
    //Launch ActivityModal
    this.props.toggleModal(this.props.activity);
  }

  render() {
    return (
      <Card className="ActivityNormal" centered>
        <Card.Content>
          <Grid centered doubling>
            <Grid.Row columns={3}>
              <Grid.Column width={4}>
                <Image src={this.getSportIcon(this.props.activity.sport)} size='mini' />
              </Grid.Column>
              <Grid.Column width={9}>
                <div onClick={this.onActivityClick} style={{cursor:'pointer'}}>{this.props.activity.name}</div>
              </Grid.Column>
              <Grid.Column width={3}>
                <Checkbox defaultChecked={this.props.activity.status} onClick={this.handleCheckChange}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row divided columns={2}>
              <Grid.Column width={4}>
                {this.props.activity.hour ? this.props.activity.hour+'H' : ''}
              </Grid.Column>
              <Grid.Column width={12}>
                {this.props.activity.description.length < 50 ? this.props.activity.description : this.props.activity.description.substring(0,8)+'...'}
              </Grid.Column>
            </Grid.Row>
            {this.displayDistance(this.props.activity.distance)}
          </Grid>
          <Card.Meta>
            <Icon name='delete' size='small' color='red' link fitted onClick={this.handleDelete}/>
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }

}

ActivityNormal.propTypes = {
  activity: PropTypes.object.required,
  onDeleteActivity: PropTypes.func,
  onCheckActivity: PropTypes.func,
  onUncheckActivity: PropTypes.func,
  toggleModal: PropTypes.func
};



export default ActivityNormal;
