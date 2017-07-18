import React,{ Component } from 'react';
import { Segment, Grid, Icon, Header, Divider, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgressbar from 'react-circular-progressbar';
import moment from 'moment';
import GoalModal from './GoalModal';

/**
* Dashboard with metrics ands stats
**/
class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weekDate: moment().day('Monday'),
      typeSelected: {
        name: this.props.goals[0].type,
        index: 0
      },
    };
  }

  /*
  * This function return the number of tasks done
  */
  getTaskDonePerc() {

    if( !this.props.tasks || this.props.tasks.length == 0 ) return 0;

    let nbDone = this.props.tasks.reduce( (nbDone, task) => {
      if(task.status == true) return nbDone + 1;
      return nbDone;
    }, 0);

    return Math.round(nbDone*100/this.props.tasks.length);
  }

  /*
  * This function return the number of tasks done
  */
  getTaskDonePercByWeek() {
    // If tasks is empty
    if( !this.props.tasks || this.props.tasks.length == 0 ) return 0;

    const endWeek = moment(this.state.weekDate).add(7,'d');
    const weekTask = this.props.tasks.filter( (task) => {
      const taskDate = moment(task.date, 'YYYY-MM-DD');
      if(
        ( taskDate.isAfter(this.state.weekDate, 'day') && taskDate.isBefore(endWeek, 'day') )
        ||
        (taskDate.isSame(this.state.weekDate, 'day'))
      ){
        return true;
      }
    });

    let nbDone = weekTask.reduce( (nbDone, task) => {
      if(task.status == true) return nbDone + 1;
      return nbDone;
    }, 0);

    if(nbDone === 0) return 0;

    return Math.round(nbDone*100/weekTask.length);
  }


  /*
  * This function return the percentage of tasks done by the type selected
  */
  getTaskDoneByTypePerc(alltasks, type) {

    const taskDone = this.getTaskDoneByType(alltasks, type);

    const taskNumber = this.getTaskNumberByType(alltasks, type);
    
    if(taskNumber === 0) return 0;

    return Math.round(taskDone*100/taskNumber);
  }

  getTaskDoneByType(alltasks, type) {
    return alltasks.reduce((nbDone, task) => {
      if(task.type == type && task.status == true) return nbDone + 1;
      return nbDone;
    }, 0);
  }

  /*
  * This function return the number of tasks by the type
  */
  getTaskNumberByType(tasks, type){
    return tasks.reduce((nbr, task) => {
      if(task.type == type) return nbr + 1;
      return nbr;
    }, 0);
  }

  /*
  * This function change the type selected (decrement)
  */
  previousType = () => {

    const indexPrevious = this.state.typeSelected.index == 0 ?
      (this.props.goals.length-1)
      : this.state.typeSelected.index-1;

    this.setState({
      typeSelected: {
        name: this.props.goals[indexPrevious].type,
        index: indexPrevious
      }
    });
  }

  /*
  * This function change the type selected (increment)
  */
  nextType = () => {

    const indexNext = this.state.typeSelected.index == (this.props.goals.length-1)  ?
      0
      : this.state.typeSelected.index+1;

    this.setState({
      typeSelected: {
        name: this.props.goals[indexNext].type,
        index: indexNext
      }
    });
  }

  /**
  * This function return the color for goal depending on deadline
  **/
  getGoalColor = (deadline) => {
    if(moment().unix() > moment(deadline, 'YYYY-MM-DD').unix()){
      return 'red';
    }
    else if ( moment(deadline, 'YYYY-MM-DD').diff(moment(), 'days') < 8  ){
      return 'violet';
    }
    else {
      return 'green';
    }
  }

  /**
  * This function return the icon to set for a goal according to his progress
  **/
  getGoalProgressIcon = (goal) => {
    const taskDone = this.getTaskDoneByType(this.props.tasks, goal.type);

    if(goal.target == taskDone){
      return 'checkmark';
    }
    else if (taskDone == 0){
      return 'wait';
    }
    else {
      return 'wrench';
    }
  }

  render() {
    return (
      <div className='Dashboard'>
        <Header textAlign='center' size='huge' inverted>
            Dashboard
        </Header>
        <Segment style={{textAlign:'center'}}>
          <Grid>
            <div className="three column row">
              <div className="column ui">
                <div style={{width:'70%', display:'inline-block'}}>
                  <Header> Goals </Header>
                  <Divider/>
                  {
                    this.props.goals.map( (goal, index) => {
                      return (
                        <Popup key={index}
                          trigger={
                            <Segment  color={this.getGoalColor(goal.deadline)}>
                              <Header size='small'>
                                <Icon name={this.getGoalProgressIcon(goal)} />
                                <Header.Content>
                                  {goal.type}
                                </Header.Content>
                              </Header>
                            </Segment>
                          }
                          hoverable
                          position='right center'
                          inverted
                          flowing
                        >
                          <Grid centered columns={2}>
                            <Grid.Column textAlign='center'>
                              <Header as='h3'>Deadline</Header>
                              <p><b>{goal.deadline}</b></p>
                            </Grid.Column>
                            <Grid.Column textAlign='center'>
                              <Header as='h3'>Target</Header>
                              <p><b>{goal.target}</b></p>
                            </Grid.Column>
                          </Grid>
                        </Popup>
                      );
                    })
                  }
                </div>
              </div>
              <div className="column ui">
                <Header size='medium'>Week</Header>
                <Divider/>
                <div className='CirProgBarLarge'>
                  <CircularProgressbar percentage={this.getTaskDonePercByWeek()}/>
                </div>
              </div>
              <div className="column ui">
                <Header size='medium'>Goal</Header>
                <Divider/>
                <div className='CirProgBarMedium'>
                  <CircularProgressbar className='CirProgBarMedium' percentage={this.getTaskDoneByTypePerc(this.props.tasks, this.state.typeSelected.name)} />
                </div>
                <div className='TitleWithIcon'>
                  <Icon name='arrow left' link fitted onClick={this.previousType}/>
                  <div className='progressTitle'>
                    {this.state.typeSelected.name}
                  </div>
                  <Icon name='arrow right' link fitted onClick={this.nextType}/>
                </div>
              </div>
            </div>
            {/*Second ROW*/}
            <div className="three column row">
              <div className="column ui">
              </div>
              <div className="column ui">
                <p>
                  What a journey! Look at all the tasks you accomplished this week!
                </p>
              </div>
              <div className="column ui">
                <p>
                  <strong>{this.state.typeSelected.name}</strong> tasks is on the road to success
                </p>
              </div>
            </div>
          </Grid>
          <Divider/>
          <GoalModal/>
        </Segment>
      </div>
    );
  }

}

Dashboard.propTypes = {
  tasks: PropTypes.array,
  goals: PropTypes.array
};

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    goals: state.goals
  };
};

export default connect (mapStateToProps, null) (Dashboard);
