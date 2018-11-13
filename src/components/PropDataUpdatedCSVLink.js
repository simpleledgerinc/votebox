import { CSVLink } from 'react-csv'

export default class PropDataUpdatedCSVLink extends CSVLink {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		const { data, headers, separator, uFEFF } = nextProps;
		this.setState({ href: this.buildURI(data, uFEFF, headers, separator) });
	}
}