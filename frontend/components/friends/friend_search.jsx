import React from 'react';

class FriendSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            foreign_username: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // debouncer ?
    update() {
        return (e) => {
            this.setState({ foreign_username: e.currentTarget.value });     // no pre-fill for now
        };
    }

    handleSubmit() {
        console.log(`${this.state.foreign_username}`);
        // debugger;
        this.props.createFriend(this.state.foreign_username);
    }

    render() {
        return (
            <div className='friend-search'>
                {/* <label>Search Users:</label> */}
                <input type='text' value={this.state.search} onChange={this.update()} />
                <button onClick={() => this.handleSubmit()}>Add Friend</button>
            </div>
        )
    }
}

export default FriendSearch;