import ActivityModal from '../ui/ActivityModal';
import { connect } from 'react-redux';
import { addActivityToServer, updateActivityServer } from '../../actions/actionsOut';

const mapStateToProps = (state) => {
  return {
    goals: state.goals,
    sports: state.sports
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddActivity(activity, mod){
      if( mod && mod == true) dispatch(updateActivityServer(activity));
      else dispatch(addActivityToServer(activity));
    }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (ActivityModal);
