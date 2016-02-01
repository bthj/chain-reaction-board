import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left'
};

const unitSource = {
  beginDrag(props) {
    return {
      name: props.name,
      qty: props.qty
    };
  },
  endDrag( props, monitor, component ) {
    console.log( monitor );
  }
};

function collect( connect, monitor ) {
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
        {name} ({qty})
      </div>
    );
  }
}

Unit.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(props => props.type, unitSource, collect)(Unit);
