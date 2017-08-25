import React,{ Component } from 'react';
import { Checkbox, Card, Icon } from 'semantic-ui-react';
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
      description:  this.props.activity.description,
      sport:  this.props.activity.sport,
      activityType: this.props.activity.activityType,
      resultat: this.props.activity.reusltat
    });
  }

  render() {
    return (
      <Card className="ActivityNormal">
        <Card.Content>
          <Card.Content>
            <Checkbox label={this.props.activity.name} defaultChecked={this.props.activity.status} onClick={this.handleCheckChange}/>
          </Card.Content>
          <Card.Description>
            {this.props.activity.description}
          </Card.Description>
          <Card.Meta>
            {this.props.activity.sport}
            <Icon name='delete' size='small' color='red' link onClick={ this.handleDelete}/>
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
