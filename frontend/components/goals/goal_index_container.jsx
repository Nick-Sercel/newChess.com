import { connect } from 'react-redux';
import GoalIndex from './goal_index';
import { fetchGoals } from '../../util/goal_api_util';

const mSTP = state => ({
    goals: state.entities.goals,
})

const mDTP = dispatch => ({
    fetchGoals: () => dispatch(fetchGoals()),
})

export default connect(mSTP, mDTP)(GoalIndex);