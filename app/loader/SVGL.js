import React, {Component} from "react";

const {Promise} = global;

class SVGL extends Component {
	constructor(props) {
		super(props);
		this.state = {
			SVGC: undefined
		}
	}
	
	componentWillMount() {
		new Promise(resolve => {
			require.ensure([], () => {
				resolve({
					SVGC: require('../components/SVGC')
				});
			});
		})
			.then(({ SVGC }) => {
				this.setState({ SVGC: SVGC.default });
			})
			.catch(function(e) {
				console.log("handled the error");
			});
	}
	
	render() {
		return this.state && this.state.SVGC ? <this.state.SVGC {...this.props} /> : null;
	}
}

export default SVGL;
