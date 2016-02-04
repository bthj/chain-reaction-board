import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';

const style = {
  // border: '1px dashed gray',
  // backgroundColor: 'white',
  // padding: '0.5rem 1rem',
  // marginRight: '1.5rem',
  // marginBottom: '1.5rem',
  cursor: 'move'
  // float: 'left'
};

const unitSource = {
  beginDrag(props) {
    // console.log( "Unit render" );
    // console.log( props.name );
    // console.log( props.qty );
    // console.log( props.type );
    return { // will be available in monitor.getItem() in drop(...) (in BoardSquare.squareTarget)
      name: props.name,
      qty: props.qty,
      // TODO: return x y pos here?  shoud I know?
        //...to indicate if moving from another square pos
      x: props.x,
      y: props.y
    };
  },
  endDrag( props, monitor, component ) {
    // console.log( monitor );
  }
};

function collect( connect, monitor ) {
  // console.log( "Unit collect" );
  // console.log( connect.dragSource() );
  // console.log( monitor.isDragging() );
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Unit extends Component {

  render() {
    const { connectDragSource, isDragging } = this.props;
    const { name, qty } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(
      <div style={{ ...style, opacity }}>
        {name} {qty ? "("+qty+")" : ""}
      </div>
    );
  }
}

Unit.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(props => props.type, unitSource, collect)(Unit);
