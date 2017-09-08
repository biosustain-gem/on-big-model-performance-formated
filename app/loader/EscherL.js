import React, { Component } from 'react';

const {Promise} = global;

class EscherL extends Component {
	constructor(props) {
		super(props);
		this.state = {
			EscherC: undefined
		}
	}
	
	componentWillMount() {
		new Promise(resolve => {
			require.ensure([], () => {
				resolve({
					EscherC: require('../components/EscherC')
				});
			});
		})
			.then(({ EscherC }) => {
				this.setState({ EscherC: EscherC.default });
			})
			.catch(function(e) {
				console.log("handled the error",e);
			});
	}
  
  render() {
	  return this.state && this.state.EscherC ? <this.state.EscherC {...this.props} /> : null;
  }
}

export default EscherL;
