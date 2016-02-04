import UnitTypes from './UnitTypes';

// export function observe( receive ) {
//   setInterval( () => receive([
//     Math.floor( Math.random() * 8 ),
//     Math.floor( Math.random() * 8 )
//   ]), 500 );
// }


// let knightPosition = [1, 7];
let gameState = {
  squaresToPow2: 8,
  units: [
    { name: 'Infantry', type: UnitTypes.FIXTURE, qty: 10 },
    { name: 'Dwarf', type: UnitTypes.CREATURE, qty: 10 },
    { name: 'Elf', type: UnitTypes.CREATURE, qty: 5 },
    { name: 'Avatar', type: UnitTypes.CREATURE, qty: 1 }
  ],
  placedUnits: {},
  knightPosition: [1,7]
};

let observer = null;

function emitChange() {
  // observer( knightPosition );
  observer( gameState );
}

export function observe( o ) {
  if( observer ) {
    throw new Error( 'Multiple observers not implemented' );
  }

  observer = o;
  emitChange();
}

// export function canMoveKnight( toX, toY ) {
//   const [x, y] = gameState.knightPosition;
//   const dx = toX - x;
//   const dy = toY - y;
//
//   return ( Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
//           (Math.abs(dx) === 1 && Math.abs(dy) === 2);
// }

export function canMoveUnit( toX, toY ) {
  const toBoardIndex = toY * gameState.squaresToPow2 + toX
  const toAndSurroundingBoardIndices = [toBoardIndex];
  toAndSurroundingBoardIndices.push(
    toBoardIndex - 1, toBoardIndex + 1,
    toBoardIndex - gameState.squaresToPow2,
      toBoardIndex - gameState.squaresToPow2 - 1,
      toBoardIndex - gameState.squaresToPow2 + 1,
    toBoardIndex + gameState.squaresToPow2,
      toBoardIndex + gameState.squaresToPow2 - 1,
      toBoardIndex + gameState.squaresToPow2 + 1
  );
  let canMove = true;
  toAndSurroundingBoardIndices.some( function(oneBoardIndex){
    if( gameState.placedUnits[oneBoardIndex] ) {
      // a unit is placed on one of the squares that should be empty
      canMove = false;
      return true;
    }
  });
  return canMove;
}

export function moveKnight( toX, toY ) {
  gameState.knightPosition = [toX, toY];
  emitChange();
}

export function placeUnit( name, type, posTo, posFrom ) {
  for( let oneUnit of gameState.units ) {
    if( oneUnit.name == name && !posFrom.x && !posFrom.y ) oneUnit.qty--;
  }
  // add to placed units
  gameState.placedUnits[ posTo.y * gameState.squaresToPow2 + posTo.x ] = {
    name: name, type: type
  };
  if( posFrom.x && posFrom.y ) {
    // we were moving the unit from another square on the board
    delete gameState.placedUnits[ posFrom.y * gameState.squaresToPow2 + posFrom.x ];
  }
  emitChange();
}
