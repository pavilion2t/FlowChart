import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom'
export default class myCanvas extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    renderLine(data){

    }

    draw(x,y,c,t){

    }



    render() {
      this.renderLine(this.props.data);
        return (
            <canvas width="640" height="400" id="myCanvas"/>
        );
    }
}
