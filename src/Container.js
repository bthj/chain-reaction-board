import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Board from './Board';
import Unit from './Unit';
import UnitTypes from './UnitTypes';
import { observe } from './Game';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [
        { name: 'Infantry', type: UnitTypes.FIXTURE, qty: 10 },
        { name: 'Dwarf', type: UnitTypes.CREATURE, qty: 10 },
        { name: 'Elf', type: UnitTypes.CREATURE, qty: 5 },
        { name: 'Avatar', type: UnitTypes.CREATURE, qty: 1 }
      ],
      knightPosition: [1,7]
    };
  }

  componentDidMount() {
    // see: https://github.com/gaearon/react-dnd/blob/master/examples/00%20Chessboard/Tutorial%20App/index.js
    this.unobserver = observe( this.handleChange.bind(this) );
  }

  // see: https://github.com/gaearon/react-dnd/blob/master/examples/00%20Chessboard/Tutorial%20App/index.js
  handleChange( gameState /*knightPosition*/) {
    // const nextState = { knightPosition };
    // if (this.state) {
    //   this.setState(nextState);
    // } else { // TODO: should never be called now...
    //   this.state = nextState;
    // }
    if( this.state ) {
      this.setState( gameState );
    } else {
      this.state = gameState;
    }
  }

  handleUnitPlaced( name, position ) {
    let unplacedUnits = decrementUnitQty( name );
    if( ! unplacedUnits ) {
      // TODO: no units left to place, let's start the game
    }
  }

  // decrementUnitQty( name ){
  //   let unitsLeftToPlace = 0;
  //   for( let oneUnit of this.state.units ) {
  //     if( oneUnit.name == name ) oneUnit.qty--;
  //     unitsLeftToPlace += oneUnit.qty;
  //   }
  //   if( this.state ) {
  //     this.setState( this.state.units );
  //   }
  //   return unitsLeftToPlace;
  // }

  isDropped( name, index ) { // TODO: change method signature
    return false;
  }

  // renderBoard( knightPosition ) {
  //   console.log("renderBoard");
  //   return (
  //     <Board knightPosition={knightPosition} />
  //   );
  // }

  render() {
    const { units } = this.state;
    const { knightPosition } = this.state;

    return (
      <div>
        <div style={{ overflow: 'hidden', clears: 'both' }}>
          <Board knightPosition={knightPosition} />
        </div>
        <div style={{ overflow: 'hidden', clears: 'both' }}>
          {units.map( ({name, type, qty}, index ) =>
            <Unit name={name}
                  type={type}
                  isDropped={ this.isDropped(name, index) }  // vantar uppá; hringa yfir units, og nested qty
                  qty={qty}
                  key={index} />
          )}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Container);
