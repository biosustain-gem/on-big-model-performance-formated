/**
*
* Navigation
*
*/

import React from 'react';
import Scroll from "react-scroll"; // Imports all Mixins
// import styled from 'styled-components';

var Link       = Scroll.Link;
var Events     = Scroll.Events;
var scroll     = Scroll.animateScroll;
var scrollSpy  = Scroll.scrollSpy;

var durationFn = function(deltaTop) {
  return deltaTop;
};

let sticky = {
  position: 'sticky',
  top: 0,
  zIndex: 2
};

class Navigation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
  }
  
  componentDidMount() {
    
    Events.scrollEvent.register('begin', function() {
      console.log("begin", arguments);
    });
    
    Events.scrollEvent.register('end', function() {
      console.log("end", arguments);
    });
    
    scrollSpy.update();
    
  }
  
  scrollToTop() {
    scroll.scrollToTop();
  }
  
  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }
  
  render() {
    return (
      <nav className="navbar navbar-default" style={sticky}>
        <div className="container-fluid">
          <div className="">
            <ul className="nav navbar-nav">
              <li><Link activeClass="active" spy={true} smooth={true} duration={500} offset={-50} className="Introduction" to="Introduction">Introduction</Link></li>
              <li><Link activeClass="active" spy={true} smooth={true} duration={500} offset={-50} className="Overview" to="Overview">Overview</Link></li>
              <li><Link activeClass="active" spy={true} smooth={true} duration={500} offset={-50} className="Table" to="Table">Table</Link></li>
              <li><Link activeClass="active" spy={true} smooth={true} duration={500} offset={-50} className="Performance" to="Performance">Performance testing</Link></li>
              <li><Link activeClass="active" spy={true} smooth={true} duration={500} offset={-50} className="Summary" to="Summary">Summary</Link></li>
              <li><Link activeClass="active" spy={true} smooth={true} duration={500} offset={-50} className="Sandbox" to="Sandbox">Sandbox</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navigation;
