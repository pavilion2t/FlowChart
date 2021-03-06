import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd'
import Dustbin from './Dustbin';
import MenuTree from "./MenuTree";

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
@connect(
    (state, props) => ({
      config: state.config,
    })
)

export default class sub extends Component {
  constructor(props) {
    super(props)
  }

  render() {
     return (
       <DragDropContextProvider backend={HTML5Backend}>
         <div>
           <Row>
             <Col span={20}> <h1>拖动图标开始画流程图</h1> <Dustbin/></Col>
             <Col span={4}><MenuTree/></Col>
           </Row>
         </div>
       </DragDropContextProvider>
     )
   }
 }
