import React from 'react';
import SignButton from './SignButton';
import { Header } from 'semantic-ui-react';


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

        <SignButton text={'Sign In'}/>
        <SignButton text={'Sign Up'}/>
      </div>
    );
  }

}


export default Welcome;
