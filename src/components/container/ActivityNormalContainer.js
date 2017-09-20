import ActivityNormal from '../ui/ActivityNormal';
import { connect } from 'react-redux';
import { removeActivityFromServer, updateActivityServer } from '../../actions/actionsOut';

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteActivity(activity){
      dispatch(removeActivityFromServer(activity));
    },
    onCheckActivity(activity){
      dispatch(updateActivityServer(activity));
    },
    onUncheckActivity(activity){
      dispatch(updateActivityServer(activity));
    }
  };
};


export default connect (null, mapDispatchToProps) (ActivityNormal);
