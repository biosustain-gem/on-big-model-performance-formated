/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from "react";
import Helmet from "react-helmet";
// import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {Col, Grid, Row, Table, Panel} from "react-bootstrap";
import styled from "styled-components";

import {makeSelectError, makeSelectLoading, makeSelectRepos} from "containers/App/selectors";
// import H2 from "components/H2";
// import ReposList from "components/ReposList";
import Element from "components/Element";
import Video from "components/Video";
import Overlay from "components/Overlay";
import CytoscapeL from "loader/CytoscapeL";
import EscherL from "loader/EscherL";
import PixelL from "loader/PixelL";
import SVGL from "loader/SVGL";
import SigmajsL from "loader/SigmajsL";

import data from "data/E coli core.Core metabolism.json";
// import AtPrefix from "./AtPrefix";
// import CenteredSection from "./CenteredSection";
// import Form from "./Form";
// import Input from "./Input";
// import Section from "./Section";
// import messages from "./messages";
import {loadRepos} from "../App/actions";
import {changeUsername} from "./actions";
import {makeSelectUsername} from "./selectors";

// import DataProvider from "containers/DataProvider";

const viewS = {
  position: 'relative',
  width: '100%',
};

const Cols = styled(Col)`
  background-color: red;
  
  // &:focus .overlay {
  //   opacity: 0 !important;
  //   pointerEvents: none;
  // }
`;

const padding = {
  padding: '2em',
};

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
    };
    this.onFocusHandler = (event) => {
      const style = event.currentTarget.children[1].style;
      style.opacity = 0;
      style.pointerEvents = 'none';
      event.currentTarget.children[0].children[0].focus();
    };
    this.onBlurHandler = (event) => {
      const style = event.currentTarget.children[1].style;
      style.opacity = 1;
      style.pointerEvents = 'all';
    };
  }
  
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }
  
  render() {
    const {loading, error, repos} = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };
    
    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            {name: 'description', content: 'A React.js Boilerplate application homepage'},
          ]}
        />
        <div>
          <Element name="Introduction" className="element" style={padding}>
            <h1>Introduction</h1>
            <p style={{columnCount: 2}}>
              Trying to develop the best user experience for our new project I faced not easy choice of choosing right
              approach to satisfy the requirements.
              Since I work on web based data visualisation in biochemical field the most obvious choice would be to use
              the <b>Escher</b> (JavaScript library to visualise the biochemical models).
              However, due to its design choices <b>Escher</b> performance drastically drops with increase of models
              complexity.
              Assuming there will be no needs for editing models we came up with idea of just rendering maps prepared for
              Escher by other graph libraries to see if we can gain any performance boost and/or be provided with
              additional functionality which otherwise I would need to create as an Escher extension.
              Among hundreds of libraries, I choose few which has the biggest potential and are based on different technologies. <br />
              Now a day we have 3 main web technologies available which might be used to draw graphs. First is a scalable
              vector graphic (SVG) which provides a full set of objects and control interface (positioning, mouse events etc. However, due to its overhead on each object, it does not scale well with increasing number of elements. To overcome this restriction the html <b>Canvas</b> element was introduced where the programmer needs to take care of exact elements positions,
              styling, determining the target of user interactions and updates of the view. While it makes development process harder it results in a great performance boost, especially with increasing complexity. <br />
              Last but not least technology is the <b>WebGL</b> where the programmer is provided with a direct interface to make calculations on a graphic card. Although, direct programming for <b>WebGL</b> is extremely challenging there are libraries which simplify the process providing similar object abstractions as <b>Canvas</b> element, efficiently making development process on comparable complexity level. It is also worth to mention that <b>WebGL</b> was introduced to support 3d graphic in the browser and it is only choice to render complex 3d models now a day.
            </p>
            <h3>Chosen libraries</h3>
            <ul>
              <li><b>Escher <small>&#60;SVG based&#62;</small></b> - commonly used library to visualize biological pathways</li>
              <li><b>SVG + React</b> - attempt to simply use library the website is based on to translate Escher map to SVG</li>
              <li><b>Cytoscape <small>&#60;Canvas based&#62;</small></b> - graph library, representant of Canvas based libraries</li>
              <li><b>Ngraph.pixel <small>&#60;WebGl based&#62;</small></b> - fast WebGL library tested for static layout and one based on physical force simulation (2d/3d)</li>
              <li><b>Sigmajs <small>&#60;WebGL based&#62;</small></b> - general WebGL library for drawing graphs </li>
            </ul>
          </Element>
          <Element name="Overview" className="element">
            <Grid fluid>
              <Row className="show-grid">
                <Cols sm={6} md={4} tabIndex="-1" onFocus={this.onFocusHandler} onBlur={this.onBlurHandler}>
                  <EscherL data={data} style={viewS}/>
                  <Overlay>
                    <h1>Escher</h1>
                    Click to interact.
                    Scroll to zoom, click and drag to pan.
                  </Overlay>
                </Cols>
                <Cols sm={6} md={4} tabIndex="-1" onFocus={this.onFocusHandler} onBlur={this.onBlurHandler}>
                  <SVGL data={data} style={viewS}/>
                  <Overlay>
                    <h1>SVG + React</h1>
                    Click to interact.
                    Scroll to zoom, click and drag to pan.</Overlay>
                </Cols>
                <Cols sm={6} md={4} tabIndex="-1" onFocus={this.onFocusHandler} onBlur={this.onBlurHandler}>
                  <CytoscapeL data={data} style={viewS}/>
                  <Overlay>
                    <h1>Cytoscape</h1>
                    Click to interact.
                    Scroll to zoom, click and drag to pan.
                  </Overlay>
                </Cols>
                <Cols sm={6} md={4} tabIndex="-1" onFocus={this.onFocusHandler} onBlur={this.onBlurHandler}>
                  <PixelL data={data} style={viewS} force={false}/>
                  <Overlay>
                    <h1>Ngraph.Pixel
                      <small>static layout</small>
                    </h1>
                    Use <b>RFSD</b> to pan, <b>QE</b> to rotate view and <b>WS</b> to zoom. <br />
                    You can also use arrows or drag with mouse to look around.
                  </Overlay>
                </Cols>
                <Cols sm={6} md={4} tabIndex="-1" onFocus={this.onFocusHandler} onBlur={this.onBlurHandler}>
                  <PixelL data={data} style={viewS} force/>
                  <Overlay>
                    <h1>Ngraph.Pixel
                      <small>force layout</small>
                    </h1>
                    Use <b>RFSD</b> to pan, <b>QE</b> to rotate view and <b>WS</b> to zoom. <br />
                    You can also use arrows or drag with mouse to look around.
                  </Overlay>
                </Cols>
                <Cols sm={6} md={4} tabIndex="-1" onFocus={this.onFocusHandler} onBlur={this.onBlurHandler}>
                  <SigmajsL data={data} style={viewS}/>
                  <Overlay>
                    <h1>Sigmajs</h1>
                    Click to interact.
                    Scroll to zoom, click and drag to pan.
                  </Overlay>
                </Cols>
              </Row>
            </Grid>
          </Element>
          <Element name="Table" className="element" style={padding}>
            <p style={{columnCount: 2}}>
              After writing interface to render Escher map files for each of the libraries I denoted few comments on each of them which for clarity I put into the following table.
            </p>
            <Table striped bordered condensed hover responsive>
              <thead>
              <tr>
                <td></td>
                <th><a href="escher-visualization/build/">Escher.js</a></th>
                <th><a href="escher-visualization/build/">React on SVG</a></th>
                <th><a href="cytoscape-react/build/">Cytoscape</a></th>
                <th><a href="react_ngraph_pixel/build/">Ngraph</a> <a
                  href="react_ngraph_pixel/build/#/force">(force)</a>
                </th>
                <th><a href="sigmajs-react/build/">Sigmajs</a></th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>Description</th>
                <td>Current solution - baseline for improvements.</td>
                <td>The most simple approach data is parsed and added to DOM by react.</td>
                <td>Comprehensive library based on Canvas.</td>
                <td>High performance 3d graph library.</td>
                <td>Failed approach of using WebGL as charting library.</td>
              </tr>
              <tr>
                <th>Advantages</th>
                <td>Comprehensive, working solution.</td>
                <td>Does not crash for <s>big models</s> models with faulty values.</td>
                <td>
                  <ul>
                    <li>Implements folding algorithm (for predefined groups).</li>
                    <li>Well maintained, in active development.</li>
                  </ul>
                </td>
                <td>
                  <ul>
                    <li>The performance is good even for really big models.</li>
                    <li>No longer maintained.</li>
                  </ul>
                </td>
                <td>-</td>
              </tr>
              <tr>
                <th>Disadvantages</th>
                <td>
                  <ul>
                    <li>Does crash for <s>big models</s> models with even small flaws (ex. wrong defined curve shape).
                    </li>
                    <li>Worst performance - not usable on testing model.</li>
                  </ul>
                </td>
                <td>DOM structure is slow and there is noticeable drop in performance with increasing numbers of
                  elements.
                </td>
                <td>
                  <ul>
                    <li>Performance problems - tends to lag on test model.</li>
                  </ul>
                </td>
                <td>
                  <ul>
                    <li>Questionable usability of 3d graphs.</li>
                    <li>More challenging to render additional elements - render in WebGL.</li>
                  </ul>
                </td>
                <td>
                  <ul>
                    <li>Performance even worse than in baseline.</li>
                    <li>No longer maintained.</li>
                  </ul>
                </td>
              </tr>
              </tbody>
            </Table>
          </Element>
          <Element name="Performance" className="element">
            <p style={padding}>
              <h1>Performance testing</h1>
              <p>
                After empirical testing, I was requested to describe the performance in measurable values. When it is easy to measure the library sizes, page load time, rendering time etc. this numbers would not exactly reflect the user empirical impressions. The real bottle neck for all of these libraries is responsibility under user interaction. <br />
                To measure it I came up with a script which emulates basic user interaction. The measurement consists of two steps:
              </p>
              <ol>
                <li>
                  <h5>Time to fully render graph</h5>
                  The website is refreshed simultaneous with starting timer then when graph is fully rendered the timer
                  is stopped.
                </li>
                <li>
                  <h5>Lowest FPS upon interaction</h5>
                  The graph is panned up/down, left/right and zoomed in and out. During this interactions animation frame per second (FPS) is measured, with the desired value of 60 fps it can be observed that some of the libraries are able to refresh the view only a few times per second.
                </li>
              </ol>
              In the video below you can see performance testing on each library side by side. Whereas in the top right corner of sub-view is the timer measuring time to first full render of the graph and in the bottom right corner you can observe FPS drop upon interaction.
            </p>
            <Video />
            <Panel bsStyle="warning">
              <strong>Warning!</strong> Please watch the video in the highest quality.
            </Panel>
          </Element>
          <Element name="Summary" className="element" style={padding}>
            <h1>Summary</h1>
            <Table striped bordered condensed hover responsive>
              <thead>
              <tr>
                <td></td>
                <th><a href="escher-visualization/build/">Escher.js</a></th>
                <th><a href="escher-visualization/build/">React on SVG</a></th>
                <th><a href="cytoscape-react/build/">Cytoscape</a></th>
                <th><a href="react_ngraph_pixel/build/">Ngraph</a> <a
                  href="react_ngraph_pixel/build/#/force">(force)</a>
                </th>
                <th><a href="sigmajs-react/build/">Sigmajs</a></th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>Time to fully render graph</th>
                <td>~ 21s</td>
                <td>~ 14s</td>
                <td>~ 42s</td>
                <td>~ 6-7s</td>
                <td>~ 5s</td>
              </tr>
              <tr>
                <th>FPS upon interaction</th>
                <td>1 fps</td>
                <td>2 fps</td>
                <td>1 fps</td>
                <td>27 fps (3 fps for force layout)</td>
                <td>3 fps</td>
              </tr>
              </tbody>
            </Table>
            <p>
              All the libraries can be successfully used to render graphs and it is hard to claim that one is better than the other as long we consider small graphs.
              However, when there is need for rendering complex graphs the choice is much simpler. <br />
              On our benchmark model (and just recording the video in the background) most of the libraries was not able to render graphs fast enough to provide acceptable user experience.
              Among the others only Ngraph.pixel stands out in the matter of performance being up to 27 times more responsive under interaction. <br />
              
              <small>
                Ps While expecting the WebGL based libraries to be the most performant, the Sigmajs results was really sunrising for me.
                In my belief it was not developed with performance in mind for complex graphs (12~ nodes and 12~ links).
                Although, it uses WebGL it does not use potential of this technology.
              </small>
            </p>
          </Element>
          <Element name="Sandbox" className="element" style={padding}>
            <h1>Sandbox</h1>
            <p>Under following links you can find libraries demos which the performance test was based on.</p>
            <ul>
              <li><a href="escher-visualization/build/">Escher.js</a></li>
              <li><a href="escher-visualization/build/">React on SVG</a></li>
              <li><a href="react_ngraph_pixel/build/">Ngraph</a></li>
              <li><a href="react_ngraph_pixel/build/#/force">(force)</a></li>
              <li><a href="cytoscape-react/build/">Cytoscape</a></li>
              <li><a href="sigmajs-react/build/">Sigmajs</a></li>
            </ul>
          </Element>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
