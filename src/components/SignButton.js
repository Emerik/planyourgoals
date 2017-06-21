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

  render () {
    return (
      <Button inverted>{this.props.text}</Button>
    );
  }

}

SignButton.propTypes = {
  text: PropTypes.string
};

export default SignButton;
