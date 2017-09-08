import React, {Component} from "react";

const {Promise} = global;

class SigmajsL extends Component {
	constructor(props) {
		super(props);
		this.state = {
			SigmajsC: undefined
		}
	}
	
	componentWillMount() {
		new Promise(resolve => {
			require.ensure([], () => {
				resolve({
					SigmajsC: require('../components/SigmajsC')
				});
			});
		})
			.then(({ SigmajsC }) => {
				this.setState({ SigmajsC: SigmajsC.default });
			})
			.catch(function(e) {
				console.log("handled the error");
			});
	}
	
	render() {
		return this.state && this.state.SigmajsC ? <this.state.SigmajsC {...this.props} /> : null;
	}
}

export default SigmajsL;
