import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

export default class myCanvas extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <canvas width="640" height="800" id="myCanvas"/>
        );
    }
}
