import React from 'react';
import { withRouter } from 'react-router-dom';

class GoalIndexItem extends React.Component {
    editGoal() {
        this.props.history.push(`/users/${this.props.goal.user_id}/goals/${this.props.goal.id}/edit`);
    }

    render() {
        return (
            <div className='goal-item-container'>
                <li><p className='goal-title'>{this.props.goal.title}</p></li>
                <li><p className='goal-body'>{this.props.goal.body}</p></li>
                <li><button onClick={() => this.editGoal()}>Edit Goal</button></li >
                <li><button onClick={() => this.props.deleteGoal(this.props.goal.id)}>Delete Goal</button></li >
            </div>
        )
    }
}

export default withRouter(GoalIndexItem);