import React, { Component, PropTypes } from 'react';
import Square from './Square';
import Knight from './Knight';
// import { canMoveKnight, moveKnight } from './Game';
import BoardSquare from './BoardSquare';
import Unit from './Unit';

// import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';

export default class Board extends Component {
  // onClick={() => this.handleSquareClick(x, y)}
  renderSquare( i ) {
    const x = i % this.props.squaresToPow2;
    const y = Math.floor( i / this.props.squaresToPow2 );
    const whPercntage = 1 / this.props.squaresToPow2 * 100;
    return (
      <div key={i}
            style={{ width: whPercntage+'%', height: whPercntage+'%' }}>
        <BoardSquare x={x}
                      y={y}>
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    );
  }

  renderPiece( x, y ) {
    // const [knightX, knightY] = this.props.knightPosition;
    // if (x === knightX && y === knightY) {
    //   return <Knight />;
    // }
    let placedUnit = this.props.placedUnits[x] ? this.props.placedUnits[x][y] : undefined;
    if( placedUnit ) {
      console.log( "placed unit at x: " + x + ", y: " + y + ", named: " + placedUnit.name + ", type: " + placedUnit.type);
      return <Unit
        name={placedUnit.name}
        type={placedUnit.type}
        x={x}
        y={y} />
      // return <Knight />
    }
  }

  // handleSquareClick( toX, toY ) {
  //   if( canMoveKnight(toX, toY) ) {
  //     moveKnight( toX, toY );
  //   }
  // }

  render() {
    const squares = [];
    for( let i = 0; i < Math.pow(this.props.squaresToPow2, 2); i++ ) {

      squares.push( this.renderSquare(i) );
    }

    return(
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
    );
  }
}

// export default DragDropContext(HTML5Backend)(Board);

Board.propTypes = {
  knightPosition: PropTypes.arrayOf(
    PropTypes.number.isRequired
  ).isRequired
};
