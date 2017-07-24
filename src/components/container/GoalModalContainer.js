import GoalModal from '../ui/GoalModal';
import { connect } from 'react-redux';
import { addGoal } from '../../actions/actions';

const mapDispatchToProps = (dispatch) => {
  return {
    onAddGoal(goal){
      dispatch(addGoal(goal));
    }
  };
};

export default connect (null, mapDispatchToProps) (GoalModal);
