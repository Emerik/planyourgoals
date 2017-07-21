import React from 'react';
import { Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import Welcome from './Welcome';
import WeekActivity from '../container/WeekActivityContainer';
import MenuBar from './MenuBar';
import Dashboard from '../container/DashboardContainer';

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
          <Route path="/week-activity" component={WeekActivity}/>
          <Route path="/dashboard" component={Dashboard}/>
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
