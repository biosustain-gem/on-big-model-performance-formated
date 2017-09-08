import React, {Component} from "react";
import cytoscape from "cytoscape";

class CytoscapeC extends Component {
  
  componentDidMount() {
    this.cont.style.height = this.cont.clientWidth + 'px';
    
    let data = this.props.data;
    console.log(data);
    if (!data || !data[1] || !data[1].nodes) {
      console.warn("corrupted data",data);
      return;
    }
    let nodes_f = Object.entries(data[1].nodes).map(function ([key, node]) {
      return {
        group: 'nodes',
        data: Object.assign(node,{
          id: parseInt(key)
        }),
        position: {
          x: node.x,
          y: node.y
        }
      };
    });
    let edges_f = [];
    Object.entries(data[1].reactions).forEach(function ([key, reaction]) {
      Object.entries(reaction.segments).forEach(function ([key, segment]) {
        edges_f.push({
          group: 'edges',
          data: Object.assign(segment, {
            id: parseInt(key),
            source: segment.from_node_id,
            target: segment.to_node_id
          }),
          position: {x: segment.x, y: segment.y}
        });
      });
    });
    
    cytoscape({
      container: this.cont,
      elements: nodes_f.concat(edges_f),
      layout: {
        name: 'preset'
      },
      style: cytoscape.stylesheet()
        .selector('node')
        .style({
          'background-color': function (node) {
            // return 'blue';
            switch(node.data('node_type')) {
              case "midmarker":
                return '#90EE90';
              case "multimarker":
                return '#F0F8FF';
              case "segment":
                return '#D3D3D3';
              case "metabolite":
                return '#FFA500';
              default:
                console.warn(node);
                return 'black';
            }
          },
          'border-width': '2px',
          'border-color': function (node) {
            // return 'blue';
            switch(node.data('node_type')) {
              case "metabolite":
                return '#a24510';
              default:
                return 'black';
            }
          },
          'label': 'data(bigg_id)'
          
          // which works the same as
          
          // 'background-color': 'data(bg)'
        })
        .selector('edge')
        .style({
          'line-color': '#334E75',
          'width': '10px',
          'curve-style': function(edge) {
            return edge.data().b1 ? 'bezier' : 'haystack';
          }
        })
    });
    
    
    // let lastTime;
    // function animate(timestamp){
    // 	requestAnimationFrame(animate);
    // 	if(!lastTime){lastTime=timestamp;}
    // 	let elapsed=timestamp-lastTime;
    //
    // 	if (elapsed>34) {
    // 		console.count("Dropped frames (less than 30 fps)");
    // 		console.log(elapsed);
    // 	} else if (elapsed>17) {
    // 		console.count("Dropped frames (less than 60 fps)");
    // 		console.log(elapsed);
    // 	};
    // 	lastTime=timestamp;
    // };
    // animate();
    
    console.log(this);
  }
  
  render() {
    console.log(arguments);
    return (
      <div ref={(cont) => this.cont = cont} style={ this.props.style } />
    );
  }
}

export default CytoscapeC;
