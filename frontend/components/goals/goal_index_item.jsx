import React from 'react';

class GoalIndexItem extends React.Component {

    render() {
        return (
            <div>
                <p>{this.props.goal.title}</p>
                <p>{this.props.goal.body}</p>
            </div>
        )
    }
}

export default GoalIndexItem;