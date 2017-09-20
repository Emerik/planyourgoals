import Welcome from '../ui/Welcome';
import { connect } from 'react-redux';
import { fetchActivity, fetchGoal } from '../../actions/actionsOut';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    activities: state.activities,
    goals: state.goals
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getActivity(){
      dispatch(fetchActivity());
    },
    getGoal(){
      dispatch(fetchGoal());
    },
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (Welcome);
