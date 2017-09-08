/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from "react";
import Helmet from "react-helmet";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import { Table, Grid, Row, Col } from "react-bootstrap";
import styled from 'styled-components';

import {makeSelectError, makeSelectLoading, makeSelectRepos} from "containers/App/selectors";
import H2 from "components/H2";
import ReposList from "components/ReposList";
import Element from "components/Element";
import Video from "components/Video";
import Overlay from "components/Overlay";

import DataProvider from "containers/DataProvider";

import CytoscapeL from "loader/CytoscapeL";
import EscherL from "loader/EscherL";
import PixelL from "loader/PixelL";
import SVGL from "loader/SVGL";
import SigmajsL from "loader/SigmajsL";

import AtPrefix from "./AtPrefix";
import CenteredSection from "./CenteredSection";
import Form from "./Form";
import Input from "./Input";
import Section from "./Section";
import messages from "./messages";
import {loadRepos} from "../App/actions";
import {changeUsername} from "./actions";
import {makeSelectUsername} from "./selectors";
import data from "data/E coli core.Core metabolism.json";

const view_s = {
	position: 'relative',
  width: '100%',
};

let Cols = styled(Col)`
  background-color: red;
  
  // &:focus .overlay {
  //   opacity: 0 !important;
  //   pointerEvents: none;
  // }
`;

let padding = {
  padding: '2em'
};

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
    };
    this.onFocusHandler = (event) => {
      console.dir(event.currentTarget.children[1],arguments);
      const style = event.currentTarget.children[1].style;
      style.opacity = 0;
      style.pointerEvents = 'none';
      event.currentTarget.children[0].children[0].focus();
    };
    this.onBlurHandler = (event) => {
      console.dir(event.currentTarget.children[1],arguments);
      const style = event.currentTarget.children[1].style;
      style.opacity = 1;
      style.pointerEvents = 'all';
    };
  };
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
          <Element name="Overview" className="element">
            {/*<DataProvider />*/}
              <Grid fluid>
                <Row className="show-grid">
                  <Cols sm={6} md={4} tabIndex="-1" onFocus={this.onFocusHandler} onBlur={this.onBlurHandler}>
                    <EscherL data={data} style={ view_s } />
                    <Overlay>
                      <h1>Escher</h1>
                      Click to interact.
                      Scroll to zoom, click and drag to pan.
                    </Overlay>
                  </Cols>
                  <Cols sm={6} md={4} tabIndex="-1" onFocus={this.onFocusHandler} onBlur={this.onBlurHandler}>
                    <SVGL data={data} style={ view_s } />
                    <Overlay>
                      <h1>SVG + React</h1>
                      Click to interact.
                      Scroll to zoom, click and drag to pan.</Overlay>
                  </Cols>
                  <Cols sm={6} md={4} tabIndex="-1" onFocus={this.onFocusHandler} onBlur={this.onBlurHandler}>
                    <CytoscapeL data={data} style={ view_s }/>
                    <Overlay>
                      <h1>Cytoscape</h1>
                      Click to interact.
                      Scroll to zoom, click and drag to pan.
                    </Overlay>
                  </Cols>
                  <Cols sm={6} md={4} tabIndex="-1" onFocus={this.onFocusHandler} onBlur={this.onBlurHandler}>
                    <PixelL data={data} style={ view_s } force={false} />
                    <Overlay>
                      <h1>Ngraph.Pixel <small>static layout</small></h1>
                      Use <b>RFSD</b> to pan, <b>QE</b> to rotate view and <b>WS</b> to zoom. <br />
                      You can also use arrows or drag with mouse to look around.
                    </Overlay>
                  </Cols>
                  <Cols sm={6} md={4} tabIndex="-1" onFocus={this.onFocusHandler} onBlur={this.onBlurHandler}>
                    <PixelL data={data} style={ view_s } force={true} />
                    <Overlay>
                      <h1>Ngraph.Pixel <small>force layout</small></h1>
                      Use <b>RFSD</b> to pan, <b>QE</b> to rotate view and <b>WS</b> to zoom. <br />
                      You can also use arrows or drag with mouse to look around.
                    </Overlay>
                  </Cols>
                  <Cols sm={6} md={4} tabIndex="-1" onFocus={this.onFocusHandler} onBlur={this.onBlurHandler}>
                    <SigmajsL data={data} style={ view_s } />
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
            <Table striped bordered condensed hover>
              <thead>
              <tr>
                <td></td>
                <th><a href="escher-visualization/build/">Escher.js</a></th>
                <th><a href="escher-visualization/build/">React on SVG</a></th>
                <th><a href="react_ngraph_pixel/build/">Ngraph</a> <a href="react_ngraph_pixel/build/#/force">(force)</a>
                </th>
                <th><a href="cytoscape-react/build/">Cytoscape</a></th>
                <th><a href="sigmajs-react/build/">Sigmajs</a></th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>Description</th>
                <td>Current solution - baseline for improvements.</td>
                <td>The most simple approach data is parsed and added to DOM by react.</td>
                <td>High performance 3d graph library.</td>
                <td>Comprehensive library based on Canvas.</td>
                <td>Failed approach of using webgl as charting library.</td>
              </tr>
              <tr>
                <th>Advantages</th>
                <td>Comprehensive, working solution.</td>
                <td>Does not crash for <s>big models</s> models with faulty values.</td>
                <td>
                  <ul>
                    <li>The performance is good even for really big models.</li>
                    <li>No longer maintained.</li>
                  </ul>
                </td>
                <td>
                  <ul>
                    <li>Implements folding algorithm (for predefined groups).</li>
                    <li>Well maintained, in active development.</li>
                  </ul>
                </td>
                <td>-</td>
              </tr>
              <tr>
                <th>Disadvantages</th>
                <td>
                  <ul>
                    <li>Does crash for <s>big models</s> models with even small flaws (ex. wrong defined curve shape).</li>
                    <li>Worst performance - not usable on testing model.</li>
                  </ul>
                </td>
                <td>DOM structure is slow and there is noticeable drop in performance with increasing numbers of elements.
                </td>
                <td>
                  <ul>
                    <li>Questionable usability of 3d graphs.</li>
                    <li>More challenging to render additional elements - render in webgl.</li>
                  </ul>
                </td>
                <td>
                  <ul>
                    <li>Performance problems - tends to lag on test model.</li>
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
            <Video />
          </Element>
          <Element name="Summary" className="element">
            Summary
          </Element>
          <Element name="Sandbox" className="element">
            Sandbox
          </Element>
          {/*<CenteredSection>*/}
            {/*<H2>*/}
              {/*<FormattedMessage {...messages.startProjectHeader} />*/}
            {/*</H2>*/}
            {/*<p>*/}
              {/*<FormattedMessage {...messages.startProjectMessage} />*/}
            {/*</p>*/}
          {/*</CenteredSection>*/}
          {/*<Section>*/}
            {/**/}
          {/*</Section>*/}
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
