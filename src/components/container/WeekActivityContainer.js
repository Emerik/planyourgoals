import WeekActivity from '../ui/WeekActivity';
import { connect } from 'react-redux';
import { fetchActivity } from '../../actions/actionsOut';

const mapStateToProps = state => {
  return {
    activities: state.activities
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadActivitiesFromServer(){
      dispatch(fetchActivity());
    }
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (WeekActivity);
