import {
    RECEIVE_GOALS,
    RECEIVE_GOAL,
    REMOVE_GOAL,
} from '../actions/goal_actions';

const GoalsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    const newState = Object.assign({}, oldState);
    switch (action.type) {
        case RECEIVE_GOALS:
            return Object.assign({}, action.goals);
        case RECEIVE_GOAL:
            newState[action.goal.id] = action.goal;
            return newState;
        case REMOVE_GOAL:
            delete newState[action.goalId];
            return newState;
        default:
            return oldState;
    }
}

export default GoalsReducer;