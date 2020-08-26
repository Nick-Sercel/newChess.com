import { connect } from 'react-redux';
import GoalIndex from './goal_index';
import { fetchGoals, deleteGoal, createGoal } from '../../actions/goal_actions';

const mSTP = state => ({
    goals: Object.values(state.entities.goals),
})

const mDTP = dispatch => ({
    fetchGoals: () => dispatch(fetchGoals()),
    deleteGoal: (goalId) => dispatch(deleteGoal(goalId)),
    createGoal: (goal) => dispatch(createGoal(goal)),
})

export default connect(mSTP, mDTP)(GoalIndex);