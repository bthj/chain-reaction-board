import React, { Component, PropTypes } from 'react';
import Square from './Square';
import { /*canMoveKnight, moveKnight,*/ canMoveUnit, placeUnit } from './Game';
import { ItemTypes } from './Constants';
import UnitTypes from './UnitTypes';
import { DropTarget} from 'react-dnd';

const squareTarget = {
  canDrop( props ) {
    return canMoveUnit( props.x, props.y );
  },

  drop( props, monitor ) {
    // moveKnight( props.x, props.y );
    let unitName = monitor.getItem().name;
    let unitType = monitor.getItemType();
    let posTo = {x:props.x, y:props.y};
    let posFrom = {x:monitor.getItem().x, y:monitor.getItem().y};
    placeUnit( unitName, unitType, posTo, posFrom );

    // console.log("DROP")
    // console.log( props );
    // console.log( monitor.getItem() ); // returned in unitSource.beginDrag of Unit
    // console.log( monitor.getItemType() );
    // canDrop()
    // didDrop()
    // getClientOffset()
    // getDifferenceFromInitialOffset()
    // getDropResult()
    // getInitialClientOffset()
    // getInitialSourceClientOffset()
    // getItem()
    // getItemType()
    // getSourceClientOffset()
    // isOver(options)
    // receiveHandlerId(targetId)

    // TODO: change the (Container) state:
    // Game emits change that item of type X was dropped
    // ...handleChange in container updates the state accordingly....
    // ...Unit component should then get updated props?
  }
};

function collect( connect, monitor ) {
  return{
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class BoardSquare extends Component {
  renderOverlay( color ) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color
      }} />
    );
  }

  render() {
    const { x, y, connectDropTarget, isOver, canDrop } = this.props;
    const black = (x + y) % 2 === 1;

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Square black={black}>
          {this.props.children}
        </Square>
        {isOver && !canDrop && this.renderOverlay('red')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}
      </div>
    );
  }
}

BoardSquare.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
}

export default DropTarget(
  [UnitTypes.FIXTURE, UnitTypes.CREATURE, ItemTypes.KNIGHT], squareTarget, collect)(BoardSquare);
