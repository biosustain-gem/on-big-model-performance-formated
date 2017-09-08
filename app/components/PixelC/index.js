import React, { Component } from 'react';
import createGraph from 'ngraph.graph';
import renderGraph from 'ngraph.pixel';
import staticLayout from 'pixel.static';

const s_pixel = {
  width: "100%",
  height: "100%"
};

class PixelC extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.container.style.height = this.container.clientWidth + 'px';
    
    let data = this.props.data;
    console.log(data);
    if (!data || !data[1] || !data[1].nodes) {
      console.warn("corrupted data",data);
      return;
    }
    let {nodes,reactions} = data[1];
    function buildGraph() {
      let g = createGraph({
        uniqueLinkId:false
      });
      
      console.warn(g);
      Object.entries(nodes).forEach(function ([key, node]) {
        // node.isPinned = true;
        g.addNode(+key,node);
      });
      g.forEachNode(node => {
        node.position = {
          x: node.data.x,
          y: node.data.y,
          z: 0,
        };
        node.isPinned = node.data.node_is_primary ? Math.round(Math.random()*0.5) : false;
      });
      Object.values(reactions).forEach(reaction => {
        Object.values(reaction.segments).forEach((segment) => {
          g.addLink(+segment.from_node_id,+segment.to_node_id,reaction);
        });
      });
      
      return g;
    }
    let graph = buildGraph();
    let container = this.container;
    let renderer_options = {
      container: container,
      clearColor: 0xFAFAFA,
      // first, set a custom layout:
      initPosition: getNodePosition,
      autoFit: true,
      node: createNodeUI,
      link: createLinkUI
    };
    
    if (!this.props.force) {
      renderer_options.createLayout = staticLayout;
      renderer_options.is3d = false;
    };
    
    console.log(container.clientWidth, container.clientHeight);
    let renderer = this.renderer = renderGraph(graph,renderer_options);
    
    function createNodeUI(node) {
      let color;
      switch(node.data.node_type) {
        case "midmarker":
          color = 0x90EE90;
          break;
        case "multimarker":
          color = 0xF0F8FF;
          break;
        case "segment":
          color = 0xD3D3D3;
          break;
        case "metabolite":
          color = 0xFFA500;
          break;
        default:
          console.warn(node);
      }
      return {
        color: color,
        size: 30 //30+30*(+node.data.node_is_primary)
      };
    };
    
    function createLinkUI(link) {
      return {
        fromColor: 0x334E75,
        toColor: 0x334E75
      };
    }
    
    function getNodePosition(node) {
      // node is a regular ngraph.graph node
      // we can have access to its `data` or `id`, so if position is known:
      return {
        x: node.data.x,
        y: node.data.y,
        z: 0
      };
    }
    
    let camera = renderer.camera();
    Object.assign(camera.position, {x:18000,y:15000,z:-19000});
    Object.assign(camera.rotation, {x:Math.PI,y:0,z:0});
    camera.matrixWorldNeedsUpdate = true;
    console.log(renderer,camera);
  };
  
  render() {
    return (
      <div ref={(container) => this.container = container} style={ this.props.style } />
    );
  }
}

export default PixelC;
