import React from 'react';

class GoalIndexItem extends React.Component {

    render() {
        return (
            <div className='goal-item-container'>
                <li><p className='goal-title'>{this.props.goal.title}</p></li>
                <li><p className='goal-body'>{this.props.goal.body}</p></li>
                <li><button onClick={() => this.props.deleteGoal(this.props.goal.id)}>Delete Goal</button></li >
            </div>
        )
    }
}

export default GoalIndexItem;