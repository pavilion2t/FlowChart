import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import SubBox from './SubBox';
import MyCanvas from './MyCanvas';
const DATA=[];
const boxTarget = {
  drop(props,monitor) {
    var ClientOffset=monitor.getClientOffset();
    ClientOffset.x=ClientOffset.x-230-15-30;
    ClientOffset.y=ClientOffset.y-70-35-15-30;
    var item=monitor.getItem();
    var data = {item,offset:ClientOffset};
    return data;
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
     isOver: monitor.isOver(),
     canDrop: monitor.canDrop(),
     getItem:monitor.getItem(),
     getResult:monitor.getDropResult()
  };
}
class Dustbin extends Component {
  constructor(props){
    super(props);
    this.state = {
     dataSource:[]
    };
  }
  renderList(IT){
   var ds=this.state.dataSource;
    if(IT!=null){

      for(var i=0;i<ds.length;i++){
        if(IT.item.name==ds[i].item.name){
          ds.splice(i,1)
          break;
        }
      }
      ds.push(IT)
    }
    if(ds.length>0){
      ds=ds.map((value,index)=>{

        return <div key={index} style={{padding:5,position:"absolute",top:value.offset.y+30,left:value.offset.x+30,cursor:'move'}}>
                 <SubBox name={value.item.name}/>
               </div>

      })
      return ds
    }else{
      return null
    }
  }
  componentDidMount () {

  }


  render() {
    const { canDrop, isOver, connectDropTarget,getItem,getResult} = this.props;
    var listItems=this.renderList(getResult)
    return connectDropTarget(
      <div className="drag-container">
        <MyCanvas ref={(ref)=>this.MyCanvas=ref} data={this.state.dataSource}/>
       {listItems}
      </div>,
    );
  }
}
export default DropTarget("box", boxTarget, collect)(Dustbin);
