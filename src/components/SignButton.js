import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class SignButton extends React.Component {
  constructor(props){
    super(props);

  }

  componentDidMount(){
    /*Timer, listener, Ajax*/

  }

  componentWillUnmount(){/*Timer, listener, Ajax*/

  }

  handleRedirect(){
    this.props.history.push('/daily-task');
  }

  render () {
    return (
      <Button inverted onClick={this.handleRedirect.bind(this)}>{this.props.text}</Button>
    );
  }

}

SignButton.propTypes = {
  text: PropTypes.string,
  history: PropTypes.object

};

export default SignButton;
