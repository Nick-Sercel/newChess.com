import { connect } from 'react-redux';
import UserShow from './user_show';
import { fetchUser, fetchUserSessionless } from '../../actions/user_actions';

const mSTP = (state, ownProps) => {
    let currentUserId;
    if (state.session) {
        currentUserId = state.session.id;
    }
    return ({
        user: state.entities.users[ownProps.match.params.userId],
        currentUserId: currentUserId,
    })
}

const mDTP = (dispatch) => ({
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    fetchUserSessionless: (userId) => dispatch(fetchUserSessionless(userId)),
})

export default connect(mSTP, mDTP)(UserShow);