import React, {Component} from "react";
import Dimensions from "react-dimensions";

class Video extends Component {
  render() {
    let width = this.props.containerWidth || 1000;
    return (
      <iframe type="text/html" width={ width } height={ width*293/720 }
              src="https://www.youtube.com/embed/aAGH9yDWM_8?rel=0&showinfo=0"
              frameBorder="0" allowFullScreen />
    )
  }
}

export default Dimensions()(Video);
