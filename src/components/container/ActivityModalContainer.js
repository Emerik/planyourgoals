import ActivityModal from '../ui/ActivityModal';
import { connect } from 'react-redux';
import { addActivity, changeActivity } from '../../actions/actions';

const mapStateToProps = (state) => {
  return {
    goals: state.goals,
    sports: state.sports
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddActivity(activity, mod){
      if( mod && mod == true) dispatch(changeActivity(activity));
      else dispatch(addActivity(activity));
    }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (ActivityModal);
