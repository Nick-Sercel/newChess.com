import React from 'react';
import GoalIndexItem from './goal_index_item';
import CreateGoalContainer from './create_goal_container';

class GoalIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { extraRender: false };
    }

    componentDidMount() {
        this.props.fetchGoals();
    }

    click(val) {
        this.setState({ extraRender: val })
        console.log(`state was set to: ${this.state.extraRender}`)
        // this.extraRender = !this.extraRender;
    }

    render() {
        let extraRenders;
        if (this.state.extraRender) {
            extraRenders = <div className='goal-top-item'>
                            <CreateGoalContainer />
                            <li className='move-right'><button onClick={() => this.click(false)}>Close</button></li>
                           </div>;
        } else {
            extraRenders = <div className='goal-top-item'>
                                <li className='create-goal-button'><button onClick={() => this.click(true)}>Create new Goal</button></li>
                            </div>;
        }
        return (
            <div className='index-container'>
                <li><p className='goals-text'>Goals</p></li>
                {extraRenders}
                {this.props.goals.map(goal => <GoalIndexItem key={goal.id} goal={goal} deleteGoal={this.props.deleteGoal} />)}
            </div>
        )
    }
}

export default GoalIndex;