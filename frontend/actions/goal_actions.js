import * as GoalApiUtil from '../util/goal_api_util';

export const RECEIVE_GOALS = 'RECEIVE_GOALS';
export const RECEIVE_GOAL = 'RECEIVE_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';

const receiveGoals = (goals) => {
    return {
        type: RECEIVE_GOALS,
        goals,
    }
}

const receiveGoal = (goal) => {
    return {
        type: RECEIVE_GOAL,
        goal,
    }
}

const removeGoal = (goalId) => {
    return {
        type: REMOVE_GOAL,
        goalId,
    }
}

export const fetchGoals = () => dispatch => {
    return GoalApiUtil.fetchGoal(goalId)
        .then((goals) => dispatch(receiveGoals(goals)))
}

export const fetchGoal = (goalId) => dispatch => {
    return GoalApiUtil.fetchGoal(goalId)
        .then((goal) => dispatch(receiveGoal(goal)))
}

export const createGoal = (goal) => dispatch => {
    return GoalApiUtil.createGoal(goal)
        .then((goal) => dispatch(receiveGoal(goal)))
}

export const updateGoal = (goal) => dispatch => {
    return GoalApiUtil.updateGoal(goal)
        .then((goal) => dispatch(receiveGoal(goal)))
}

export const deleteGoal = goalId => dispatch => {
    return GoalApiUtil.deleteGoal(goalId)
        .then(() => dispatch(removeGoal(goalId)))
}