import { connect } from 'react-redux';
import Splash from './splash_page';

const mSTP = state => {
    let currentUser;
    if (state.session.id) {
        if (state.entities.users[state.session.id]) {
            currentUser = state.entities.users[state.session.id];
        }
    }
    return ({
        currentUser: currentUser,
    })
}

export default connect(mSTP)(Splash);