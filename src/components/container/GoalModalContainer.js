import GoalModal from '../ui/GoalModal';
import { connect } from 'react-redux';
import { addGoal } from '../../actions/actions';

const mapStateToProps = (state) => {
  return {
    sports: state.sports
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddGoal(goal){
      dispatch(addGoal(goal));
    }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (GoalModal);
