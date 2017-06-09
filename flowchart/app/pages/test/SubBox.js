import React, { Component,propTypes} from 'react';
import ReactDOM from 'react-dom';
import {Overlay} from "react-bootstrap"
import ShowInfo from "./ShowInfo"
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
            <div onDoubleClick={()=>{alert("点击我")}}
                onMouseOut={(e)=>{this.setState({show:false});e.stopPropagation()}}
                onMouseMove={(e)=>{this.setState({show:true});e.stopPropagation()}} ref="target">
                <img src={require("./images/end.png")} style={{width:50,height:50}}/>
                <p style={{marginTop:5}}>{this.props.name}</p>
            </div>
            <Overlay
              show={this.state.show}
              animation={false}
              onHide={() => this.setState({ show: false })}
              placement="right"
              container={this}
              target={() => ReactDOM.findDOMNode(this.refs.target)}>
              <ShowInfo/>
            </Overlay>

          </div>
        )
      );
  }
}
export default DragSource("box", boxSource, collect)(SubBox);
