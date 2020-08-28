import React from 'react';

class GameIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.centralUsername = this.props.game.central_username;
        this.foreignUsername = this.props.game.foreign_username;
        this.winner;
        if (this.props.game.central_user_id === this.props.game.winner_id) {
            this.winner = this.centralUsername;
        } else {
            this.winner = this.foreignUsername;
        }
    }

    render() {
        let centralClass = 'game-central';
        let foreignClass = 'game-foreign';
        let winner = this.winner;
        let loser;
        if (this.winner === this.centralUsername) {
            loser = this.foreignUsername;
        } else {
            loser = this.centralUsername;
            centralClass = 'game-foreign';
            foreignClass = 'game-central';
        }

        return (
            <div className='item-container'>
                <div className='game-item-container'>
                    <div>
                        <li className='game-winner'><p className={`${centralClass}`}>{winner}</p></li>
                        <li className='game-loser'><p className={`${foreignClass}`}>{loser}</p></li>
                    </div>
                    <div>
                        <li className='game-moves-header'><p>Moves</p></li>
                        <li className='game-moves'><p>{this.props.game.moves_list}</p></li>
                    </div>
                </div>
            </div>
        )
    }
}

export default GameIndexItem;