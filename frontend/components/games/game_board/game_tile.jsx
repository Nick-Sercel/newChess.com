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
        let color = 'missing';
        if (piece) {
            symbol = piece.symbol;
            color = piece.color;
        }
        return (
            <div className={`board-element ${this.props.tile.color} ${this.props.green}`} onClick={this.handleClick} >
                <p className={`piece-type ${color}`}>
                    {symbol}
                </p>
            </div>
        )
    }
}

export default Tile;