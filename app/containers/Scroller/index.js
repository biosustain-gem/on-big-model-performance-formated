/*
 *
 * Scroller
 *
 */

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import {createStructuredSelector} from "reselect";
import Scroll from "react-scroll"; // Imports all Mixins
import makeSelectScroller from "./selectors";
import messages from "./messages";
import styled from 'styled-components';

var Link       = Scroll.Link;
var Element    = Scroll.Element;
var Events     = Scroll.Events;
var scroll     = Scroll.animateScroll;
var scrollSpy  = Scroll.scrollSpy;


// var Link = styled(Scroll.Link)`
//   display: inline-flex;
//   padding: 0.25em 2em;
//   margin: 1em;
//   text-decoration: none;
//   border-radius: 4px;
//   -webkit-font-smoothing: antialiased;
//   -webkit-touch-callout: none;
//   user-select: none;
//   cursor: pointer;
//   outline: 0;
//   font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
//   font-weight: bold;
//   font-size: 16px;
//   border: 2px solid #41ADDD;
//   color: #41ADDD;
//
//   &:active {
//     background: #41ADDD;
//     color: #FFF;
//   }
// `;
//
// var Element = styled(Scroll.Element)`
//   min-height: 100vh;
//   border: 1px solid black;
// `;


var durationFn = function(deltaTop) {
  return deltaTop;
};

export class Scroller extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
  constructor (props){
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
  
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} >Test 1</Link></li>
                <li><Link activeClass="active" className="test2" to="test2" spy={true} smooth={true} duration={500}>Test 2</Link></li>
                <li><Link activeClass="active" className="test3" to="test3" spy={true} smooth={true} duration={500} >Test 3</Link></li>
                <li><Link activeClass="active" className="test4" to="test4" spy={true} smooth={true} duration={500}>Test 4</Link></li>
                <li><Link activeClass="active" className="test5" to="test5" spy={true} smooth={true} duration={500} delay={1000}>Test 5 ( delay )</Link></li>
                <li><Link activeClass="active" className="test6" to="anchor" spy={true} smooth={true} duration={500}>Test 6 (anchor)</Link></li>
                <li><Link activeClass="active" className="test7" to="test7" spy={true} smooth={true} duration={durationFn}>Test 7 (duration and container)</Link></li>
                <li> <a onClick={() => scroll.scrollTo(100)}>Scroll To 100!</a></li>
                <li> <a onClick={() => scroll.scrollToBottom()}>Scroll To Bottom</a></li>
                <li> <a onClick={() => scroll.scrollMore(500)}>Scroll 500 More!</a></li>
                <li> <a onClick={() => scroll.scrollMore(1000, { delay : 1500 })}>Scroll 1000 More! ( delay ) </a></li>
                <li><Link activeClass="active" className="test8" to="same" spy={true} smooth={true} duration={500}>Same target</Link></li>
                <li><Link activeClass="active" className="test9" to="same" spy={true} smooth={true} duration={500}>Same target</Link></li>
              </ul>
            </div>
          </div>
        </nav>
    
        <Element name="test1" className="element" >
          test 1
        </Element>
    
        <Element name="test2" className="element">
          test 2
        </Element>
    
        <Element name="test3" className="element">
          test 3
        </Element>
    
        <Element name="test4" className="element">
          test 4
        </Element>
    
        <Element name="test5" className="element">
          test 5
        </Element>
    
        <div id="anchor" className="element">
          test 6 (anchor)
        </div>
    
        <Link activeClass="active" to="firstInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" style={{display:'inline-block', margin: '20px'}}>
          Go to first element inside container
        </Link>
    
        <Link activeClass="active" to="secondInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" style={{display:'inline-block', margin: '20px'}}>
          Go to second element inside container
        </Link>
        <Element name="test7" className="element" id="containerElement" style={{
          position: 'relative',
          height:'200px',
          overflow:'scroll',
          marginBottom: '100px'
        }}>
          test 7 (duration and container)
      
          <Element name="firstInsideContainer" style={{
            marginBottom: '200px'
          }}>
            first element inside container
          </Element>
      
          <Element name="secondInsideContainer" style={{
            marginBottom: '200px'
          }}>
            second element inside container
          </Element>
        </Element>
    
    
        <Element id="same" className="element">
          Two links point to this
        </Element>
    
        <a onClick={this.scrollToTop}>To the top!</a>
  
      </div>
    );
  }
}

Scroller.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Scroller: makeSelectScroller(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Scroller);
