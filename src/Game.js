import UnitTypes from './UnitTypes';

// export function observe( receive ) {
//   setInterval( () => receive([
//     Math.floor( Math.random() * 8 ),
//     Math.floor( Math.random() * 8 )
//   ]), 500 );
// }


// let knightPosition = [1, 7];
let gameState = {
  units: [
    { name: 'Infantry', type: UnitTypes.FIXTURE, qty: 10 },
    { name: 'Dwarf', type: UnitTypes.CREATURE, qty: 10 },
    { name: 'Elf', type: UnitTypes.CREATURE, qty: 5 },
    { name: 'Avatar', type: UnitTypes.CREATURE, qty: 1 }
  ],
  placedUnits: [

  ],
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

export function canMoveKnight( toX, toY ) {
  const [x, y] = gameState.knightPosition;
  const dx = toX - x;
  const dy = toY - y;

  return ( Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
          (Math.abs(dx) === 1 && Math.abs(dy) === 2);
}

export function moveKnight( toX, toY ) {
  gameState.knightPosition = [toX, toY];
  emitChange();
}

export function placeUnit( name, toX, toY ) {
  for( let oneUnit of gameState.units ) {
    if( oneUnit.name == name ) oneUnit.qty--;
  }
  // TODO: add to placed units
  emitChange();
}
