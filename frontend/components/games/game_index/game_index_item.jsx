import React from 'react';

class GameIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.centralUser;
        this.foreignUser;
        this.winner;
    }

    componentDidMount() {
        this.centralUser = this.props.fetchUser(this.props.game.central_user_id);
        this.foreignUser = this.props.fetchUser(this.props.game.foreign_user_id);
        if (this.props.game.winner_id === this.props.game.central_user_id) {
            this.winner = this.centralUser;
        } else {
            this.winner = this.foreignUser;
        }
    }

    render() {
        return (
            <div className='game-item-container'>
                <li><p>{this.centralUser.username}</p></li>
                <li><p>{this.foreignUser.username}</p></li>
                <li><p>{this.winner.username}</p></li>
                <li><p>{this.props.game.moves_list}</p></li>
            </div>
        )
    }
}

export default GameIndexItem;