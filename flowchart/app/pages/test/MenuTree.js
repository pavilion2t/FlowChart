import React,{Component} from 'react';
import {Collapse} from "react-bootstrap";
import Box from "./Box"

export default class MenuTree extends Component {
	constructor(props){
		super(props);
		this.state={
			 tree:[
			   {flag:true,nodes: [
						   	{name: "开始",data:{}},
						   	{name: "循环开始",data:{}},
				       	{name: "TCP发往短信平台",data:{}},
			       		{name: "赋值",data:{}},
			    ]
			  },{flag:true,nodes: [
								{name: "循环结束", data:{}},
		            {name:  "结束",data:{}}
			    ]
			  },
			 ]
		}
	}


//这里对拖放源进行处理，tempArr是一个对象数组，有flag／nodes属性
//如果value.nodes存在，再遍历键值对
	mapTree(){
		var tempArr=this.state.tree;

			tempArr=tempArr.map((value,index)=>{

					var sub_nav=value.nodes.map((v,i)=>{
						return(<li key={i}><Box name={v.name}/></li>)
					})
					//这里显示
					return(<span key={index}><span>{sub_nav}</span></span>)
			    });
			return tempArr

	}

	//这是拖放源，任务调度中心／业务系统／自动化编译部署／新增用户／向导
	render(){
		var treeList=this.mapTree();
		return(
			<div>
          <ul>
            {treeList}

          </ul>
			</div>
		)
	}


}
