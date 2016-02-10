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
  knightPosition: [1,7]
};
gameState.placedUnits = getPlacedUnitsArrayInitialized();

let observer = null;


function getPlacedUnitsArrayInitialized() {
  let placedUnits = new Array( gameState.squaresToPow2 );
  for( let i=0; i < gameState.squaresToPow2; i++ ) {
    placedUnits[i] = new Array( gameState.squaresToPow2 );
  }
  console.log( "placedUnits" );
  console.log( placedUnits );
  return placedUnits;
}


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

export function canMoveUnit( posTo, posFrom ) {
  let canMove = true;

  // const toBoardIndex = toY * gameState.squaresToPow2 + toX
  // const toAndSurroundingBoardIndices = [toBoardIndex];
  // toAndSurroundingBoardIndices.push(
  //   toBoardIndex - 1, toBoardIndex + 1,
  //   toBoardIndex - gameState.squaresToPow2,
  //     toBoardIndex - gameState.squaresToPow2 - 1,
  //     toBoardIndex - gameState.squaresToPow2 + 1,
  //   toBoardIndex + gameState.squaresToPow2,
  //     toBoardIndex + gameState.squaresToPow2 - 1,
  //     toBoardIndex + gameState.squaresToPow2 + 1
  // );
  //
  // toAndSurroundingBoardIndices.some( function(oneBoardIndex){
  //   if( gameState.placedUnits[oneBoardIndex] ) {
  //     // a unit is placed on one of the squares that should be empty
  //     canMove = false;
  //     return true;
  //   }
  // });

  if( posFrom !== undefined && posFrom.x == posTo.x && posFrom.y == posTo.y ) {
    canMove = false;
  } else {
    xloop:
    for( let i=-1; i <= 1; i++ ) {
      for( let j=-1; j <= 1; j++ ) {
        let isTestSameAsFrom = false;
        if( posFrom !== undefined ) {
          isTestSameAsFrom = posFrom.x == posTo.x+i && posFrom.y == posTo.y+j;
        }

        if( !isTestSameAsFrom
          &&
          gameState.placedUnits[posTo.x+i] && gameState.placedUnits[posTo.x+i][posTo.y+j]
             ) {
          canMove = false;
          break xloop;
        }
      }
    }
  }

  console.log( "canMove" );
  console.log( canMove );
  return canMove;
}

// export function moveKnight( toX, toY ) {
//   gameState.knightPosition = [toX, toY];
//   emitChange();
// }

export function placeUnit( name, type, posTo, posFrom ) {
  for( let oneUnit of gameState.units ) {
    if( oneUnit.name == name && !posFrom ) oneUnit.qty--;
  }
  // add to placed units
  gameState.placedUnits[posTo.x][posTo.y] = {
    name: name, type: type
  };
  if( posFrom ) {
    // we were moving the unit from another square on the board
    delete gameState.placedUnits[posFrom.x][posFrom.y];
  }
  emitChange();
}
