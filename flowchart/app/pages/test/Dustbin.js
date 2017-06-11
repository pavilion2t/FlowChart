import React, {Component} from 'react';
import { DropTarget } from 'react-dnd';
import SubBox from './SubBox';
import MyCanvas from './myCanvas';

const boxTarget = {
  drop(props,monitor) {
    var ClientOffset=monitor.getClientOffset();
      {/*放置的图片的坐标：X屏幕的宽度减去左边侧边栏宽度，间距，边距*/}
    ClientOffset.x=ClientOffset.x-230;
    ClientOffset.y=ClientOffset.y-70-35-30;
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
      ds = ds.map((value,index)=>{
        {/*cursor属性定义了鼠标指针放在一个元素边界范围内时所用的光标形状*/}
            return <div key={index}
                    style={{
                     position:"absolute",
                     top:value.offset.y+30,
                     left:value.offset.x+30,
                     cursor:'pointer'}}>
                 <SubBox name={value.item.name}/>
               </div>
      })
      return ds
    }else{
      return null
    }
  }


  render() {
    const { canDrop, isOver, connectDropTarget,getItem,getResult} = this.props;
    var listItems=this.renderList(getResult)
    return connectDropTarget(
      <div style={{backgroundColor:"#f0ffff"}}>
        {/*画图容器*/}
        <MyCanvas ref={(ref)=>this.MyCanvas=ref} data={this.state.dataSource}/>
       {listItems}
      </div>,
    );
  }
}
export default DropTarget("box", boxTarget, collect)(Dustbin);
