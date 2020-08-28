import {connect} from 'react-redux';
import TheBigBoard from './game_board_container';
import { createGame } from '../../../actions/game_actions';

const mSTP = state => ({
    sessionId: state.session.id,
})

const mDTP = dispatch => ({
    createGame: (game) => dispatch(createGame(game)),
})

export default connect(mSTP, mDTP)(TheBigBoard);