import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd'
import Third from './third'

@connect(
    (state, props) => ({
      config: state.config,
    })
)

export default class sub extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }




  render() {
    return (
      <div  className="page">
        <h1>选择图标开始画流程图</h1>
        <Third />
      </div>
    )
  }
}
