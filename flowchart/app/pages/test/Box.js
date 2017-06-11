import React, { Component} from 'react';
import { DragSource } from 'react-dnd';

//拖放源的内容，名字显示
const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
      imguri:props.imguri,
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
    const { connectDragSource } = this.props;
    const { imguri } = this.props;
      const img = new Image();
      img.onload = () => this.props.connectDragPreview(img);
      /* 拖动时候显示的图片 */
      img.src = require(this.props.imguri)
  }

  render() {
    const { isDragging, connectDragSource } = this.props;
    const { name,imguri } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    return (
      connectDragSource(
        <div>
        <p style={{backgroundColor: 'pink',color:'#666'}}>
         {this.props.name}
        </p>
        <span>
          <img src={require(this.props.imguri)} style={{width:50,height:50}}/>
        </span>
        </div>,
      )
    );
  }
}
export default DragSource("box", boxSource, collect)(Box);
