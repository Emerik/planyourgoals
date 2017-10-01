import Sign from '../ui/Sign';
import { connect } from 'react-redux';
import { signIn, signUp } from '../../actions/actionsOut';


const mapDispatchToProps = (dispatch) => {
  return {
    signInUser(email, password){
      dispatch(signIn(email, password, null));
    },
    signUpUser(name, email, password){
      dispatch(signUp(name, email, password, null));
    }
  };
};

export default connect (null, mapDispatchToProps) (Sign);
