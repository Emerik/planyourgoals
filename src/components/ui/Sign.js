import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'semantic-ui-react';



class Sign extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      signin: false,
      signup: false
    };
  }

  componentDidMount(){
    /*Timer, listener, Ajax*/

  }

  componentWillUnmount(){/*Timer, listener, Ajax*/

  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value});
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

  handleSignIn = () => {
    this.props.signInUser(this.state.email, this.state.password);
  }

  handleSignUp = () => {
    alert('This feature is unavailable for the moment');
    //this.props.signUpUser(this.state.name, this.state.email, this.state.password);
  }

  displaySignIn = () => {
    return (
      <div>
        <Input className='inputModal' fluid placeholder='Email...' label={{ basic: true, content: 'Email' }}
          labelPosition='left' onChange={this.handleEmailChange}/>

        <Input className='inputModal' fluid placeholder='Password...' label={{ basic: true, content: 'Password' }}
          labelPosition='left' type='password'  onChange={this.handlePasswordChange}/>

        <Button inverted content='Retour' onClick={() => {this.setState({signin:false})}}/>
        <Button inverted content='Sign In' onClick={this.handleSignIn}/>
      </div>
    );
  }

  displaySignUp = () => {
    return (
      <div>

        <Input className='inputModal' fluid placeholder='Name...' label={{ basic: true, content: 'Name' }}
          labelPosition='left' onChange={this.handleNameChange}/>

        <Input className='inputModal' fluid placeholder='Email...' label={{ basic: true, content: 'Email' }}
          labelPosition='left' onChange={this.handleEmailChange}/>

        <Input className='inputModal' fluid placeholder='Password...' label={{ basic: true, content: 'Password' }}
          labelPosition='left' type='password'  onChange={this.handlePasswordChange}/>

        <Button inverted content='Retour' onClick={() => {this.setState({signup:false})}}/>
        <Button inverted content='Sign Up' onClick={this.handleSignUp}/>
      </div>
    );
  }

  displayOptions = () => {
    if(this.state.signin) return this.displaySignIn();
    if(this.state.signup) return this.displaySignUp();
    else return (
      <div>
        <Button inverted content='Sign In' onClick={ () => {this.setState({signin:true});} }/>
        <Button inverted content='Sign Up' onClick={ () => {this.setState({signup:true}); }}/>
      </div>
    );
  }

  render () {
    return (
      <div className="Sign" style= {SignStyle}>
        <h1 className="title">Plan Your Goals</h1>

        <p>
          Bienvenue sur Plan your Goals
          Arretez de souhaiter, commencez à faire !
        </p>

        {
          this.displayOptions()
        }

      </div>
    );
  }

}

const SignStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '5%',
  padding: '5%',
  width: '75%',
  textAalign: 'center',
  color: '#ffffff'
};

Sign.propTypes = {
  signInUser: PropTypes.func,
  signUpUser: PropTypes.func
};

export default Sign;
