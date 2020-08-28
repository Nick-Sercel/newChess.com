export const fetchFriends = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/friends',
    })
}

export const fetchFriend = (friendId) => {
    return $.ajax({
        method: 'GET',
        url: `/api/friends/${friendId}`,
    })
}

export const createFriend = (friend) => {
    return $.ajax({
        method: 'POST',
        url: '/api/friends',
        data: { friend },
    })
}

export const updateFriend = (friend) => {
    return $.ajax({
        method: 'PATCH',
        url: `/api/friends/${friend.id}`,
        data: { friend },
    })
}

export const deleteFriend = (friendId) => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/friends/${friendId}`
    })
}