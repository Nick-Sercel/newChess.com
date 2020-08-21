import React from 'react';

class GoalIndexItem extends React.Component {

    render() {
        return (
            <div>
                <p>{this.props.goal.title}</p>
                <p>{this.props.goal.body}</p>
                <button onClick={() => this.props.deleteGoal(this.props.goal.id)}>Delete Goal</button>
            </div>
        )
    }
}

export default GoalIndexItem;