import Dashboard from '../ui/Dashboard';
import { connect } from 'react-redux';
import { fetchGoal, removeGoalFromServer, fetchActivity } from '../../actions/actionsOut';

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
    },
    loadActivitiesFromServer(){
      dispatch(fetchActivity());
    }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (Dashboard);
