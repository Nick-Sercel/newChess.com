import React from 'react';
import GameIndexItem from './game_index_item';

class GameIndex extends React.Component {
    componentDidMount() {
        this.props.fetchGames();
    }

    render() {
        return (
            <div className='index-container'>
                <li><p>Games</p></li>
                {
                    this.props.games.map(game => <GameIndexItem key={game.id} game={game} fetchUser={this.props.fetchUser} />)
                }
            </div>
        )
    }
}

export default GameIndex;