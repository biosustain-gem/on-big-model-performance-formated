import React, { Component } from 'react';
import * as escher from 'escher-vis';
import '!style-loader!css-loader!styles/builder.css';

class EscherC extends Component {
  componentDidMount() {
    this.container.style.height = this.container.clientWidth + 'px';
    
    let data = this.props.data;
    console.log(data);
    if (!data || !data[1] || !data[1].nodes) {
      console.warn("corrupted data",data);
      return;
    }
    
    this.container.style.width = this.container.clientWidth+'px';
    this.container.style.height = this.container.clientHeight+'px';
    
    console.log(escher.Builder(data,null,null,this.container,{
      menu:'zoom',
      scroll_behavior: 'zoom',
      use_3d_transform: true,
      never_ask_before_quit:  true,
      canvas_size_and_loc: {
        width: this.container.clientWidth,
        height: this.container.clientHeight,
        x: 0,
        y: 0
      }
    }).zoom_container.get_size());
    
    // let lastTime;
    // function animate(timestamp){
    //  requestAnimationFrame(animate);
    //  if(!lastTime){lastTime=timestamp;}
    //  let elapsed=timestamp-lastTime;
    //
    //  if (elapsed>34) {
    //   console.count("Dropped frames (less than 30 fps)");
    //   console.log(elapsed);
    //  } else if (elapsed>17) {
    //   console.count("Dropped frames (less than 60 fps)");
    //   console.log(elapsed);
    //  };
    //  lastTime=timestamp;
    // }
    // animate();
  }
  
  render() {
    return (
      <div ref={(container) => { this.container = container; }} style={ this.props.style } className="escher-container" />
    );
  }
}

export default EscherC;
