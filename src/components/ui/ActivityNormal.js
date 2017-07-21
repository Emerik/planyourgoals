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
        name: this.props.activity.name,
        description:  this.props.activity.description,
        goal:  this.props.activity.goal,
        status: false,
        date:  this.props.activity.date,
        duration: this.props.activity.duration
      });
    }
    else{
      // Dispatch Action
      return this.props.onCheckActivity({
        name: this.props.activity.name,
        description:  this.props.activity.description,
        goal:  this.props.activity.goal,
        status: true,
        date:  this.props.activity.date,
        duration: this.props.activity.duration
      });
    }
  }

  handleDelete = () => {

    // Dispatch Action
    return this.props.onDeleteActivity({
      name: this.props.activity.name,
      description:  this.props.activity.description,
      goal:  this.props.activity.goal,
      status: this.props.activity.status,
      date:  this.props.activity.date,
      duration: this.props.activity.duration
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
            {this.props.activity.goal}
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
