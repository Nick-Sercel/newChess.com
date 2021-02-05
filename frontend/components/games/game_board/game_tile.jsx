import React from 'react';
// const something = require("/chess-piece-sprites.png");
// console.log(something);

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
        let style;
        if (piece) {
            symbol = piece.symbol;
            color = piece.color;
            style = {
                background: `lightblue url(${window.images.chessSprites}) ${-piece.spriteRules[0]}px ${-piece.spriteRules[1]}px / 570px 190px`,
                width: "90px",
                height: "90px",
                zIndex: "100"
            };
        }
        return (
            <div className={`board-element ${this.props.tile.color} ${this.props.green}`} onClick={this.handleClick} >
                {/* <p className={`piece-type ${color}`}> */}
                    <div style={style}></div>
                {/* </p> */}
            </div>
        )
    }
}

export default Tile;