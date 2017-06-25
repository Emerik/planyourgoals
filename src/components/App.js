import React from 'React';
import { Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import Welcome from './Welcome';
import DailyTasks from './Task';
import MenuBar from './MenuBar';

class App extends React.Component {
  constructor(props){
    super(props);

  }

  componentDidMount(){
    /*Timer, listener, Ajax*/

  }

  componentWillUnmount(){/*Timer, listener, Ajax*/

  }

  onRoot(){
    if(!this.props.location.pathname || this.props.location.pathname === '/'){
      return (  <Welcome history={this.props.history}/> );
    }

  }

  render () {
    return (
      <div className="App">
        <MenuBar history={this.props.history}/>
        { this.onRoot() }
        <Switch>
          <Route path="/daily-task" component={DailyTasks}/>
        </Switch>
      </div>
    );
  }

}

App.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
};

export default App;
