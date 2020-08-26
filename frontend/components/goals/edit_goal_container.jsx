import React from 'react';
import { connect } from 'react-redux';
import GoalForm from './goal_form';
import { updateGoal } from '../../actions/goal_actions';

class EditGoalForm extends React.Component {

    render() {
        const { action, formType, goal } = this.props;
        if (!goal) { console.log('goal specified does not exist'); return null; }
        return (
            <GoalForm action={action} formType={formType} goal={this.props.goal} />
        );
    }
}

const mSTP = (state, ownProps) => ({
    formType: 'Update Goal',
    formClassName: 'update',
})

const mDTP = dispatch => ({
    action: (goal) => dispatch(updateGoal(goal)),
})

export default connect(mSTP, mDTP)(EditGoalForm);