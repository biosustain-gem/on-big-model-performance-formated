import React, { Component } from 'react';
import * as sigma from 'sigma';

class SigmajsC extends Component {
  
  componentDidMount () {
    this.container.style.height = this.container.clientWidth + 'px';
    
    
    let data = this.props.data;
    console.log(data);
    if (!data || !data[1] || !data[1].nodes) {
      console.warn("corrupted data",data);
      return;
    }
    
    var s = new sigma({
      renderers: [
        {
          container: this.container,
          type: 'webGL' // sigma.renderers.canvas works as well
        }
      ]
    });
    s.settings({
      // autoRescale: false,
      nodesPowRatio: 0.8,
      // minNodeSize: 30,
      maxNodeSize: 10,
      batchEdgesDrawing:  true,
      hideEdgesOnMove:  true,
      zoomMax: 1,
      autoResize: false,
      rescaleIgnoreSize: true,
      nodesPowRatio: 0.5,
      maxNodeSize:  1,
      labelThreshold: 4,
      defaultEdgeColor: '#334E75',
      edgeColor: 'default'
    });
    
    // Then, let's add some data to display:
    Object.entries(data[1].nodes).forEach(function ([id,node]) {
      let color;
      switch(node.node_type) {
        case "midmarker":
          color = '#90EE90';
          break;
        case "multimarker":
          color = '#F0F8FF';
          break;
        case "segment":
          color = '#D3D3D3';
          break;
        case "metabolite":
          color = '#FFA500';
          break;
        default:
          console.warn(node);
          color = 'black';
      }
      s.graph.addNode({
        id: +id,
        color: color,
        label: node.bigg_id,
        size: 30+30*(+node.node_is_primary),
        data: node,
        x: node.x,
        y: node.y,
      });
    });
    
    Object.values(data[1].reactions).forEach(function(reaction) {
      Object.entries(reaction.segments).forEach(function ([id,segment]) {
        s.graph.addEdge({
          id: +id,
          source: segment.from_node_id,
          target: segment.to_node_id
        });
      })
    });
    
    
    // Finally, let's ask our sigma instance to refresh:
    s.refresh();
    
    console.log(s);
  }
  
  render() {
    return (
      <div ref={(container) => { this.container = container; }} style={ this.props.style } />
    );
  }
}

export default SigmajsC;
