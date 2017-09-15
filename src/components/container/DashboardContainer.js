import Dashboard from '../ui/Dashboard';
import { connect } from 'react-redux';
import { removeGoal } from '../../actions/actions';

const mapStateToProps = state => {
  return {
    activities: state.activities,
    goals: state.goals,
    goaltypes: state.goaltypes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveGoal(goal){
      dispatch(removeGoal(goal));
    }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (Dashboard);
