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
        resultat: this.props.activity.reusltat
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
        resultat: this.props.activity.reusltat
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
    case 'bicycle':
      return 'images/bycicle.png';
    case 'running':
      return 'images/running.png';
    case 'swim':
      return 'images/swim.png';
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

  render() {
    return (
      <Card className="ActivityNormal" centered>
        <Card.Content>
          <Grid centered>
            <Grid.Row columns={3}>
              <Grid.Column width={3}>
                <Image src={this.getSportIcon(this.props.activity.sport)} size='mini' />
              </Grid.Column>
              <Grid.Column width={10}>
                {this.props.activity.name}
              </Grid.Column>
              <Grid.Column width={3}>
                <Checkbox defaultChecked={this.props.activity.status} onClick={this.handleCheckChange}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row divided columns={2}>
              <Grid.Column width={3}>
                {this.props.activity.hour}H
              </Grid.Column>
              <Grid.Column width={13}>
                {this.props.activity.description}
              </Grid.Column>
            </Grid.Row>
            {this.displayDistance(this.props.activity.distance)}
          </Grid>
          <Card.Meta>
            <Icon name='delete' size='medium' color='red' link fitted onClick={this.handleDelete}/>
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
  onUncheckActivity: PropTypes.func
};



export default ActivityNormal;
