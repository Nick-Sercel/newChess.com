import React from 'react';
import EditGoalContainer from './edit_goal_container';


class GoalIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { renderEdit: false };
    }

    toggleEdit(val) {
        // this.props.history.push(`/users/${this.props.goal.user_id}/goals/${this.props.goal.id}/edit`);
        // this.renderEdit = !this.renderEdit;
        this.setState({ renderEdit: val })
    }

    render() {
        let renderedContent;
        if (this.state.renderEdit) {
            renderedContent = <div className='item-container'>
                                <EditGoalContainer goal={this.props.goal} />
                                <li><button onClick={() => this.toggleEdit(false)}>Close Edit</button></li>
                              </div>
        } else {
            renderedContent = <div className='item-container'>
                                <li><p className='goal-title'>{this.props.goal.title}</p></li>
                                <li><p className='goal-body'>{this.props.goal.body}</p></li>
                                <li><button onClick={() => this.toggleEdit(true)}>Edit Goal</button></li>
                                <li><button onClick={() => this.props.deleteGoal(this.props.goal.id)}>Delete Goal</button></li>
                              </div>
        }
        return (
           <div>{renderedContent}</div>
        )
    }
}

export default GoalIndexItem;