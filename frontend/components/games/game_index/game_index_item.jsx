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
        return (
            <div className='item-container'>
                <li><p>{this.centralUsername}</p></li>
                <li><p>{this.foreignUsername}</p></li>
                <li><p>{this.winner}</p></li>
                <li><p>{this.props.game.moves_list}</p></li>
            </div>
        )
    }
}

export default GameIndexItem;