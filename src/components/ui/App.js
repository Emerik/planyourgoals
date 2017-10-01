import React from 'react';
import { Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import WelcomeContainer from '../container/WelcomeContainer';
import WeekActivity from '../container/WeekActivityContainer';
import MenuBar from './MenuBar';
import Dashboard from '../container/DashboardContainer';
import Sign from '../container/SignContainer';
import { connect } from 'react-redux';

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
      return (  <WelcomeContainer history={this.props.history}/> );
    }

  }



  isAuthenticated = () => {
    if(this.props.user.token){
      console.log('User signed in');
      return (
        <div>
          {this.onRoot()}
          <Switch>
            <Route path="/week-activity" component={WeekActivity}/>
            <Route path="/dashboard" component={Dashboard}/>
          </Switch>
        </div>
      );
    }
    else{
      console.log('User not sign in');
      return (
        <Sign/>
      );
    }
  }

  render () {
    return (
      <div className="App">
        <MenuBar history={this.props.history}/>
        { this.isAuthenticated() }
      </div>
    );
  }

}

App.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  user: PropTypes.object
};


const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect (mapStateToProps) (App);
