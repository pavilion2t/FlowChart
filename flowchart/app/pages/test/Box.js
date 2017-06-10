import React, { Component} from 'react';
import { DragSource } from 'react-dnd';

//拖放源的内容，名字显示
const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
    };
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview:connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

class Box extends Component{
  componentDidMount () {
      const img = new Image();
      img.onload = () => this.props.connectDragPreview(img);
      /* 拖动时候显示的图片 */
      img.src = require("./images/end.png")
  }

  render() {
    const { isDragging, connectDragSource } = this.props;
    const { name } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      connectDragSource(
        <p style={{backgroundColor: 'pink',color:'#666'}}>
         {this.props.name}
        </p>,
      )
    );
  }
}
export default DragSource("box", boxSource, collect)(Box);
