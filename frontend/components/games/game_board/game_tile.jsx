import React from 'react';

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.updateGame(this.props.tile);
    }

    render () {
        const piece = this.props.tile.piece;
        let symbol = null;
        if (piece) {
            symbol = piece.symbol;
        }
        return (
            <div className={`board-element ${this.props.tile.color}`} onClick={this.handleClick} >
                <p className='piece-type'>
                    {symbol}
                </p>
            </div>
        )
    }
}

export default Tile;