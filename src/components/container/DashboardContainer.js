import Dashboard from '../ui/Dashboard';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    activities: state.activities,
    goals: state.goals,
    goaltypes: state.goaltypes
  };
};

export default connect (mapStateToProps, null) (Dashboard);
