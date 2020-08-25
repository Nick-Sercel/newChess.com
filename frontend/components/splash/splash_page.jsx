import React from 'react';
import { Link } from 'react-router-dom';
import GoalIndexContainer from '../goals/goal_index_container';
import GameIndexContainer from '../games/game_index/game_index_container';
import FriendIndexContainer from '../friends/friends_list_container';

class SplashPage extends React.Component {

    render () {
        let loggedInContent = null;
        if (this.props.currentUser) {
            loggedInContent = <div className='splash-indexes-container'>
                                <GameIndexContainer />
                                <GoalIndexContainer />
                                <FriendIndexContainer />
                              </div>;
        }
        return (
            <div>
                {loggedInContent}
                <li><Link to='/games/new'>Play a Game</Link></li>
            </div>
        )
    }
}

export default SplashPage;