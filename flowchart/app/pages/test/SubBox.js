import React, { Component,propTypes} from 'react';
import ReactDOM from 'react-dom';
import { DragSource } from 'react-dnd';

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
class SubBox extends Component{
  constructor(props){
    super(props);
    this.state = {
      show:false
    };
  }
  componentDidMount () {

  }


  render() {

    let { isDragging, connectDragSource, } = this.props;
     if (isDragging) {
      return null;
    }
    return (
        connectDragSource(
          <div>
            {/*阻止事件冒泡*/}
            <div
                onMouseOut={(e)=>{this.setState({show:false});e.stopPropagation()}}
                onMouseMove={(e)=>{this.setState({show:true});e.stopPropagation()}}
                ref="target">
                {/*放下的时候显示的图片*/}
                <img
                src={require("./images/recycle.png")}
                style={{width:50,height:50}}/>
                <p style={{marginTop:2}}>
                {this.props.name}
                </p>
            </div>
          </div>
        )
      );
  }
}
export default DragSource("box", boxSource, collect)(SubBox);
