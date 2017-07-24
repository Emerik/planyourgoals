import WeekActivity from '../ui/WeekActivity';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    activities: state.activities
  };
};

export default connect (mapStateToProps) (WeekActivity);
