import React from 'react';
import { Link } from 'react-router-dom';
import GoalIndexContainer from '../goals/goal_index_container';
import GameIndexContainer from '../games/game_index/game_index_container';
import FriendIndexContainer from '../friends/friends_list_container';
import SplashGameContainer from '../games/splash_board/splash_board_container';

class SplashPage extends React.Component {

    render () {
        let loggedInContent = null;
        if (this.props.currentUser) {
            loggedInContent = <div>
                                    <li className='play-a-game'><Link to='/game/new'>Play a Game</Link></li>
                                    <div className='splash-indexes-container'>
                                        <GameIndexContainer />
                                        <GoalIndexContainer />
                                        <FriendIndexContainer />
                                    </div>;
                               </div>
        } else {
            loggedInContent = <div>
                                    <SplashGameContainer />
                              </div>
        }
        return (
            <div>
                {loggedInContent}
            </div>
        )
    }
}

export default SplashPage;