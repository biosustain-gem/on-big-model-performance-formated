import React from 'react';
import '!style-loader!css-loader!styles/escher.css';

class Reactions extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.reactions !== nextProps.reactions;
  };
  
  render () {
    console.log(this.props.reactions);
    return <g>
      {console.time("reactions")}
      {Object.entries(this.props.reactions).map(key_reaction => {
        return <Reaction key={key_reaction[0]}
                         label={key_reaction[1].bigg_id}
                         label_x={key_reaction[1].label_x}
                         label_y={key_reaction[1].label_y}
                         segments={key_reaction[1].segments}
                         nodes={this.props.nodes}/>;
      })}
      {console.timeEnd("reactions")}
    </g>
  };
}
function Reaction(props) {
  return <g>
    {Object.entries(props.segments).map(function ([key,segment]) {
      return <Segment key={key}
                      from_node={props.nodes[segment.from_node_id]}
                      b1={segment.b1}
                      b2={segment.b2}
                      to_node={props.nodes[segment.to_node_id]}/>
    })}
    {props.label && <text x={props.label_x} y={props.label_y} className="label reaction">{props.label}</text>}
  </g>
}
function Segment(props) {
  if (!(props.from_node && props.to_node)) {
    return null;
  }
  if (props.b1) {
    return <path d={"M" + props.from_node.x + "," + props.from_node.y +
    "C" + props.b1.x + "," + props.b1.y +
    " " + props.b2.x + "," + props.b2.y +
    " " + props.to_node.x + "," + props.to_node.y}
                 className="segment" />
  } else {
    return <line x1={props.from_node.x}
                 y1={props.from_node.y}
                 x2={props.to_node.x}
                 y2={props.to_node.y}
                 className="segment" />;
  }
}

class Nodes extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.nodes !== nextProps.nodes;
  };
  
  render() {
    return <g>
      {console.time("nodes")}
      {Object.entries(this.props.nodes).map(function ([key, node]) {
        if (node.node_type === "metabolite") {
          return <Metabolite key={key} node={node}/>;
        }
        return <Marker key={key} x={node.x} y={node.y} r={10} type={node.node_type}/>;
      })}
      {console.timeEnd("nodes")}
    </g>;
  };
}
function Marker(props) {
  return <circle cx={props.x}
                 cy={props.y}
                 className={props.type}
                 r={props.r} />;
}
class Metabolite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  
  click = (e) => {
    console.log(e,this);
  };
  render () {
    return <g className="metabolite"
              onClick={this.click}>
      <Marker x={this.props.node.x}
              y={this.props.node.y}
              r={10+10*(+this.props.node.node_is_primary)} />
      <text x={this.props.node.label_x}
            y={this.props.node.label_y}>
        {this.props.node.bigg_id}
      </text>
    </g>;
  }
}

class SVGC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom_init: undefined,
      matrix: [undefined, 0, 0, undefined, undefined, undefined],
    };
  }
  
  zoom(scale,x,y) {
    const m = this.state.matrix;
    const len = m.length;
    for (let i = 0; i < len; i++) {
      m[i] *= scale;
    }
    m[4] += (1 - scale) * x;
    m[5] += (1 - scale) * y;
    // console.log(m);
    this.setState({ matrix: m });
  }
  
  pan(dx,dy) {
    const m = this.state.matrix;
    m[4] += dx;
    m[5] += dy;
    this.setState({ matrix: m });
  }
  
  zoomHandler = (e) => {
    // console.log(e,this);
    
    if (this.running) return;
    this.running = true;
    // if (e.altKey) {
    this.zoom(1-e.deltaY/1000,e.nativeEvent.offsetX,e.nativeEvent.offsetY);
    //
    // } else if (e.shiftKey) {
    // 	this.pan(1-e.deltaY,1-e.deltaX);
    // 	return;
    // } else this.pan(1-e.deltaX,1-e.deltaY);
    this.running = false;
    e.preventDefault();
    
    // console.dir(Object(e));
    // console.log("altKey",e.altKey);
    // console.log("button",e.button);
    // console.log("buttons",e.buttons);
    // console.log("clientX",e.clientX);
    // console.log("clientY",e.clientY);
    // console.log("ctrlKey",e.ctrlKey);
    // console.log("metaKey",e.metaKey);
    // console.log("pageX",e.pageX);
    // console.log("pageY",e.pageY);
    // console.log("relatedTarget",e.relatedTarget);
    // console.log("screenX",e.screenX);
    // console.log("screenY",e.screenY);
    // console.log("shiftKey",e.shiftKey);
    // console.log("nativeEvent",e.nativeEvent);
    // console.log("offsetX",e.nativeEvent.offsetX);
    // console.log("offsY",e.nativeEvent.offsetY);
    // console.time("zoomHandler");
    // if (!this.state.zooming)
    // console.log(e.deltaY/1000);
    // let scale = this.state.zoom-e.deltaY/500; //arbitral value
    // if (scale < 1) scale = 1;
    // this.setState({zoom:scale});
    // console.timeEnd("zoomHandler");
  };
  
  dragStartHandler = (e) => {
    // console.log(e);
    this.prev_pos = [e.clientX, e.clientY];
  };
  
  dragHandler = (e) => {
    if (!this.prev_pos[0]) return;
    this.pan(e.clientX - this.prev_pos[0], e.clientY - this.prev_pos[1]);
    this.prev_pos = [e.clientX, e.clientY];
  };
  
  dragStopHandler = (e) => {
    // console.log(e);
    this.prev_pos = [null, null];
  };
  
  componentDidMount() {
    this.cont.style.height = this.cont.clientWidth + 'px';
    
    console.log(this.cont,this.props.data[1].canvas.width);
    let zoom_init = this.cont.clientWidth/this.props.data[1].canvas.width;
    let props = this.props;
    this.setState({
      zoom_init: zoom_init,
      matrix: [zoom_init, 0, 0, zoom_init, - zoom_init * props.data[1].canvas.x, - zoom_init * props.data[1].canvas.y]
    });
    console.log(this.state);
  };
  
  componentWillReceiveProps(nextProps) {
    // if (this.props.width !== nextProps.width || this.props.data.canvas.width !==  nextProps.data.canvas.width) {
    // 	this.setState({zoom_init:nextProps.width/nextProps.data.canvas.width});
    // }
  }
  
  render() {
    let {reactions, nodes, canvas} = this.props.data[1];
    
    return <div ref={(cont) => this.cont = cont} style={ this.props.style }>
      {(this.props.data && typeof this.state.zoom_init !== 'undefined')?
        <svg className="escher"
             onWheel={this.zoomHandler}
             onMouseDown={this.dragStartHandler}
             onMouseMove={this.dragHandler}
             onMouseUp={this.dragStopHandler}
        >
          <g transform={`matrix(${this.state.matrix.join(' ')})`}>
            <Reactions reactions={reactions} nodes={nodes} />
            <Nodes nodes={nodes} />
          </g>
          // console.timeEnd("renderescher")
        </svg> : ''
      }
    </div>
  };
}

export default SVGC;
