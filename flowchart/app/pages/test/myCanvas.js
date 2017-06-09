import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom'
export default class myCanvas extends Component {

    constructor(props) {
        super(props);
        this.start_x=0;
        this.start_y=0;

    }

    componentDidMount() {


    }

    renderLine(data){
      let self=this;

      if(data.length>0){
         var c = document.getElementById("myCanvas");
         var cxt = c.getContext('2d');
         cxt.clearRect(0,0,c.width,c.height);
        for(var i=0;i<data.length;i++){
          self.draw(data[i].offset.x,data[i].offset.y,c,cxt)
        }
      }else{
        return
      }
    }

    draw(x,y,c,t){
       t.beginPath();
       t.moveTo(this.start_x,this.start_y);
       t.quadraticCurveTo(300,80,x,y);
       t.strokeStyle="blue";
       t.lineWidth=0.5;
       t.stroke();
    }



    render() {
      this.renderLine(this.props.data);
        return (
            <canvas width="640" height="400" id="myCanvas"/>
        );
    }
}
