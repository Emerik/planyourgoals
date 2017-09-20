import Dashboard from '../ui/Dashboard';
import { connect } from 'react-redux';
import { fetchGoal, removeGoalFromServer } from '../../actions/actionsOut';

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
      dispatch(removeGoalFromServer(goal));
    },
    loadGoalsFromServer(){
      dispatch(fetchGoal());
    }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (Dashboard);
