import Welcome from '../ui/Welcome';
import { connect } from 'react-redux';
// import { addActivity } from '../../actions/actions';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    activities: state.activities,
    goals: state.goals
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onAddActivity(activity){
//       dispatch(addActivity(activity));
//     }
//   };
// };

export default connect (mapStateToProps, null) (Welcome);
