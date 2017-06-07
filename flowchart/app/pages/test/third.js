import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd'

import start from './images/start.png';
import value from './images/value.png';
import send from './images/send.png';
import recycle from './images/recycle.png';
import stop from './images/stop.png';
import end from './images/end.png';

@connect(
    (state, props) => ({
      config: state.config,
    })
)

export default class popCheck extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }


  handleClick() {

  }

  render() {
    return (
      <div class="page">
        <img src={start} style={{width:50,height:50,marginRight:10}} alt="logo" />
        <img src={value} style={{width:60,height:60,marginRight:10}} alt="logo" />
        <img src={send} style={{width:70,height:70,marginRight:10}} alt="logo" />
        <img src={recycle} style={{width:70,height:70,marginRight:10}} alt="logo" />
        <img src={stop} style={{width:60,height:60,marginRight:10}} alt="logo" />
        <img src={end} style={{width:50,height:50}} alt="logo" />
      </div>
    )
  }
}
