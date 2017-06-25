import React,{ Component } from 'react';
import { List,Checkbox, Divider, Header, Card, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';


/**
* Representation of a Task
**/
class TaskNormal extends Component {

  render() {
    return (
      <Card className="TaskNormal">
        <Card.Content>
          <Card.Content>
            <Checkbox label={this.props.tasktitle}/>
          </Card.Content>
          <Card.Description>
            {this.props.taskdesc}
          </Card.Description>
          <Card.Meta>
            Sport
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }

}

TaskNormal.propTypes = {
  tasktitle: PropTypes.string,
  taskdesc: PropTypes.string
};


class TaskList extends Component {

  render() {
    return (
      <div className="TaskList">
        <Header size='large'>{this.props.name}</Header>
        <List divided relaxed>
          {
          // Map task Comp
          }

          <List.Item>
            <TaskNormal tasktitle={'Task Exemple'} taskdesc={'Description Exemple, pas lorem ipsum sorry'}/>
          </List.Item>
          <List.Item>
            <TaskNormal tasktitle={'Task Exemple'} taskdesc={'Description Exemple'}/>
          </List.Item>
        </List>
      </div>
    );
  }
}

TaskList.propTypes = {
  name: PropTypes.string
};

class DailyTasks extends Component {

// Get tasks from props ?


  render() {
    return (

      <Grid className="Dailytasks" padded>
        <Divider className="title" inverted horizontal>Daily Tasks</Divider>
        <div className="five column row">
          <div className="column ui segment">
            <TaskList name={'Lundi'} tasks={{}}/>
          </div>
          <div className="column ui segment">
            <TaskList name={'Mardi'} tasks={{}}/>
          </div>
          <div className="column ui segment">
            <TaskList name={'Mercredi'} tasks={{}}/>
          </div>
          <div className="column ui segment">
            <TaskList name={'Jeudi'} tasks={{}}/>
          </div>
          <div className="column ui segment">
            <TaskList name={'Vendredi'} tasks={{}}/>
          </div>
        </div>
      </Grid>
    );
  }
}

export default DailyTasks;
