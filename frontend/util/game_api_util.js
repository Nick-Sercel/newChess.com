export const fetchGames = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/games',
    })
}

export const fetchGame = (gameId) => {
    return $.ajax({
        method: 'GET',
        url: `/api/games/${gameId}`,
    })
}

export const createGame = (game) => {
    return $.ajax({
        method: 'POST',
        url: '/api/games',
        data: { game },
    })
}

export const updateGame = ( game) => {
    return $.ajax({
        method: 'PATCH',
        url: `/api/ games/${ game.id}`,
        data: {  game },
    })
}