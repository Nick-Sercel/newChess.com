export const fetchGoals = () => {
    return $.ajax ({
        method: 'GET',
        url: '/api/goals',
    })
}

export const fetchGoal = (goalId) => {
    return $.ajax({
        method: 'GET',
        url: `/api/goals/${goalId}`,
    })
}

export const createGoal = (goal) => {
    return $.ajax({
        method: 'POST',
        url: '/api/goals',
        data: { goal },
    })
}

export const updateGoal = (goal) => {
    return $.ajax({
        method: 'PATCH',
        url: `/api/goals/${goal.id}`,
        data: { goal },
    })
}

export const deleteGoal = (goalId) => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/goals/${goalId}`
    })
}