import GoalModal from '../ui/GoalModal';
import { connect } from 'react-redux';
import { addGoalToServer } from '../../actions/actionsOut';

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
    }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (GoalModal);
