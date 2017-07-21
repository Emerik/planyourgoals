import React,{ Component } from 'react';
import { List, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ActivityNormal from '../container/ActivityNormalContainer';

/**
* Respresentation of a list of Activity
**/
class ActivityList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ActivityList">
        <Header size='large'>{this.props.name}</Header>
        <List divided relaxed>
          {
            // Map activity Comp
            this.props.activities.map( (activity, index) => {
              return (
                <List.Item key={index}>
                  <ActivityNormal activity={activity}/>
                </List.Item>
              );
            })
          }
        </List>
      </div>
    );
  }
}

ActivityList.propTypes = {
  name: PropTypes.string,
  activities: PropTypes.array
};

export default ActivityList;
