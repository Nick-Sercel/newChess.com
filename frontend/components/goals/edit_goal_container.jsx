import React from 'react';
import { connect } from 'react-redux';
import GoalForm from './goal_form';
import { fetchGoal, updateGoal } from '../../actions/goal_actions';

class EditGoalForm extends React.Component {
    componentDidMount() {
        this.props.fetchGoal(this.props.match.params.goalId);
    }

    render() {
        const { action, formType, goal } = this.props;
        if (!goal) return null;
        return (
            <GoalForm action={action} formType={formType} goal={goal} />
        );
    }
}

const mSTP = (state, ownProps) => ({
    goal: state.entities.goals[ownProps.match.params.goalId],
    formType: 'Update Goal',
    formClassName: 'update',
})

const mDTP = dispatch => ({
    fetchGoal: (goalId) => dispatch(fetchGoal(goalId)),
    action: (goal) => dispatch(updateGoal(goal)),
})

export default connect(mSTP, mDTP)(EditGoalForm);