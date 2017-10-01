import GoalModal from '../ui/GoalModal';
import { connect } from 'react-redux';
import { addGoalToServer, fetchSport, fetchGoaltype } from '../../actions/actionsOut';

const mapStateToProps = (state) => {
  return {
    sports: state.sports,
    goaltypes: state.goaltypes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddGoal(goal){
      dispatch(addGoalToServer(goal));
    },
    getFreshSports(){
      dispatch(fetchSport());
    },
    getFreshGoaltypes(){
      dispatch(fetchGoaltype());
    }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (GoalModal);
