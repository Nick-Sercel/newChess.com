import React from 'react';
import GoalIndexItem from './goal_index_item';

class GoalIndex extends React.Component {

    render() {
        return (
            <div>
                {
                    this.props.goals.map(goal => <GoalIndexItem goal={goal} />)
                }
            </div>
        )
    }
}

export default GoalIndex;