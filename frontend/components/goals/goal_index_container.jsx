import { connect } from 'react-redux';
import GoalIndex from './goal_index';
import { fetchGoals, deleteGoal } from '../../actions/goal_actions';

const mSTP = state => ({
    goals: Object.values(state.entities.goals),
})

const mDTP = dispatch => ({
    fetchGoals: () => dispatch(fetchGoals()),
    deleteGoal: (goalId) => dispatch(deleteGoal(goalId)),
})

export default connect(mSTP, mDTP)(GoalIndex);