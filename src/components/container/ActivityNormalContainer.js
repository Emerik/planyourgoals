import ActivityNormal from '../ui/ActivityNormal';
import { connect } from 'react-redux';
import { removeActivity, checkActivity, uncheckActivity } from '../../actions/actions';

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteActivity(activity){
      dispatch(removeActivity(activity));
    },
    onCheckActivity(activity){
      dispatch(checkActivity(activity));
    },
    onUncheckActivity(activity){
      dispatch(uncheckActivity(activity));
    }
  };
};


export default connect (null, mapDispatchToProps) (ActivityNormal);
