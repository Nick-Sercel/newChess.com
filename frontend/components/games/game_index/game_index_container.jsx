import {connect} from 'react-redux';
import GameIndex from './game_index';
import { fetchGames } from '../../../actions/game_actions';
import { fetchUserSessionless } from '../../../actions/user_actions';

const mSTP = state => ({
    games: Object.values(state.entities.games),
})

const mDTP = dispatch => ({
    fetchGames: () => dispatch(fetchGames()),
    fetchUser: (userId) => dispatch(fetchUserSessionless(userId)),
})

export default connect(mSTP, mDTP)(GameIndex)