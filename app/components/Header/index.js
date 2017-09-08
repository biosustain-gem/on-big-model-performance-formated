import React from 'react';

import { Jumbotron } from "react-bootstrap";

let jumbotron_s = {
  padding: '2em',
  margin: '0',
};

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Jumbotron style={jumbotron_s}>
        <h1>On big model performance.</h1>
        <p>JavaScript graph libraries comparision in measurable metrics</p>
      </Jumbotron>
    );
  }
}

export default Header;
