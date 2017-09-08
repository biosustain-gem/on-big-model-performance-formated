import React, {Component} from "react";

const {Promise} = global;

class CytoscapeL extends Component {
	constructor(props) {
		super(props);
		this.state = {
			CytoscapeC: undefined
		}
	}
	
	componentWillMount() {
		new Promise(resolve => {
			require.ensure([], () => {
				resolve({
					CytoscapeC: require('../components/CytoscapeC')
				});
			});
		})
			.then(({ CytoscapeC }) => {
	      this.setState({ CytoscapeC: CytoscapeC.default });
			})
			.catch(function(e) {
				console.log("handled the error");
			});
	}
	
	render() {
		return this.state && this.state.CytoscapeC ? <this.state.CytoscapeC {...this.props} /> : null;
	}
}

export default CytoscapeL;
