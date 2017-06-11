import React,{Component} from 'react';
import {Collapse} from "react-bootstrap";
import Box from "./Box"

export default class MenuTree extends Component {
	constructor(props){
		super(props);
		this.state={
			 tree:[
			   {flag:true,nodes: [
			     {name: "开始",imguri:"./images/start.png"},
			     {name: "循环开始",imguri:"./images/recycle.png"},
			     {name: "TCP发往短信平台",imguri:"./images/send.png"},
			     {name: "赋值",imguri:"./images/value.png"},
			    ]
			  },{flag:true,nodes: [
			    {name: "循环结束", imguri:"./images/stop.png"},
		            {name:  "结束",imguri:"./images/end.png"}
			    ]
			  },
			 ]
		}
	}


//这里对拖放源进行处理，tempArr是一个对象数组，有flag／nodes属性
//如果value.nodes存在，再遍历键值对
//<img src={require("./images/recycle.png")} style={{width:50,height:50}}/>

	mapTree(){
		var tempArr=this.state.tree;
		tempArr=tempArr.map((value,index)=>{
		  var sub_nav=value.nodes.map((v,i)=>{
		    return(<li key={i}>
		             <Box name={v.name} imguri={v.imguri}/>
			   </li>)
			  })
		//这里显示
		   return(<span key={index}><span>{sub_nav}</span></span>)
			 });
		  return tempArr
	}

	//这是拖放源
	render(){
	var treeList=this.mapTree();
	  return(<div>
           <ul>
            {treeList}
           </ul>
	  </div>
	)
   }
}
