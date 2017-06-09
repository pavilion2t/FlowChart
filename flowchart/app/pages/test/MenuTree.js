import React,{Component} from 'react';
import {Collapse} from "react-bootstrap";
import Box from "./Box"

export default class MenuTree extends Component {
	constructor(props){
		super(props);
		this.state={
			 tree:[
			   {
			    title: "过程",
          flag:true,
			    nodes: [
						   	{name: "开始",data:{}},
						   	{name: "循环开始",data:{}},
				       	{name: "TCP发往短信平台",data:{}},
			       		{name: "赋值",data:{}},
			    ]
			  },
			  {
          flag:true,
			    title: "结束",
			    nodes: [
						{name: "循环结束", data:{}},
            {name:  "结束",data:{}}
			    ]
			  },
			]
		}
	}

	setFlag(index){
		//这个方法循环去重
		var tempArr=this.state.tree;
		for(var i=0;i<tempArr.length;i++){
			if(i==index){
				tempArr[i].flag=!tempArr[i].flag;
			}
		}
		this.setState({
			tree:tempArr
		});
	}

//这里对拖放源进行处理，tempArr是一个对象数组，有title／flag／nodes三个属性
	mapTree(){
		var tempArr=this.state.tree;
		if(tempArr == undefined || tempArr.length<1){
			return null;
		}else{
			//判断tempArr不为空，就遍历键值对
			tempArr=tempArr.map((value,index)=>{
				if(value.nodes){
          //如果value.nodes存在，再遍历键值对
					var sub_nav=value.nodes.map((v,i)=>{
						return(
							//返回渲染一个有序列表
							<li key={i}>
                <Box name={v.name}/>
							</li>
						)
					})
					return(
						<li key={index} style={{color:"#4285f4"}}>

							<span onClick={()=>this.setFlag(index)}>

								<span style={{marginRight:5}}>
								  <i className={value.flag?"iconfont icon-slide-up":"icon iconfont icon-slide-down"}></i>
                </span>
                {value.title}
							</span>
							<Collapse in={value.flag}>
								<ul className="nav-sidebar">
									{sub_nav}
								</ul>
							</Collapse>
						</li>
					)
				}else{
					return(
						<li  key={index}>
                <Box name={value.name}/>
						</li>
					)
				}

			});
			return tempArr
		}
	}

	//这是右边的拖放源，任务调度中心／业务系统／自动化编译部署／新增用户／向导
	render(){
		var treeList=this.mapTree();
		return(
			<div>
          <ul className="nav-sidebar">
            {treeList}
          </ul>
			</div>
		)
	}


}
