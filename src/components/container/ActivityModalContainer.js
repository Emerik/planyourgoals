import ActivityModal from '../ui/ActivityModal';
import { connect } from 'react-redux';
import { addActivity } from '../../actions/actions';

const mapStateToProps = (state) => {
  return {
    goals: state.goals,
    sports: state.sports
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddActivity(activity){
      dispatch(addActivity(activity));
    }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (ActivityModal);
