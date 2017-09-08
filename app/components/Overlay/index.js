/**
*
* Overlay
*
*/

import React from 'react';
// import styled from 'styled-components';

const overlay_s = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(250,250,250,0.6)',
  transitions: '2s',
  textAlign: 'center',
};

class Overlay extends React.Component {
  
  render() {
    return (
      <div style={overlay_s} className="overlay">
        {this.props.children}
      </div>
    );
  }
}

Overlay.propTypes = {

};

export default Overlay;
