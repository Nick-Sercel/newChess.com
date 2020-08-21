import { connect } from 'react-redux';
import UserAuthBanner from './user_auth_banner';
import {login, logout} from '../../../actions/session_actions';

const mSTP = state => {
    let currentUser;
    if (state.session.id) {
        if (state.entities.users[state.session.id]) {
            currentUser = state.entities.users[state.session.id];
        }
    }
    return ({
        currentSession: state.session,
        currentUser: currentUser,

    })
}

const mDTP = dispatch => ({
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout()),
})

export default connect(mSTP, mDTP)(UserAuthBanner);