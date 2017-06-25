import React from 'react';
import PropTypes from 'prop-types';
import SignButton from './SignButton';



class Welcome extends React.Component {
  constructor(props){
    super(props);

  }

  componentDidMount(){
    /*Timer, listener, Ajax*/

  }

  componentWillUnmount(){/*Timer, listener, Ajax*/

  }

  render () {
    return (
      <div className="Welcome">
        <h1 className="title">Plan Your Goals</h1>

        <p>
          Bienvenue sur Plan your Goals
          Arretez de souhaiter, commencez à faire !
        </p>

        <SignButton text={'Sign In'} history={this.props.history}/>
        <SignButton text={'Sign Up'}/>
      </div>
    );
  }

}

Welcome.propTypes = {
  history: PropTypes.object

};

export default Welcome;
