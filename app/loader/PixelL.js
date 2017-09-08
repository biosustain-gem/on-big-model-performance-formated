import React, { Component } from 'react';

const {Promise} = global;

class PixelL extends Component {
	constructor(props) {
		super(props);
		this.state = {
			PixelC: undefined
		}
	}
	
	componentWillMount() {
		new Promise(resolve => {
			require.ensure([], () => {
				resolve({
					PixelC: require('../components/PixelC')
				});
			});
		})
			.then(({ PixelC }) => {
	      this.setState({ PixelC: PixelC.default });
			})
			.catch(function(e) {
				console.log("handled the error");
			});
	}
	
	render() {
		return this.state && this.state.PixelC ? <this.state.PixelC {...this.props} /> : null;
	};
}

export default PixelL;
