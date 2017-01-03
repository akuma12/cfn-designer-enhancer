var React = require('react');
var ReactDOM = require('react-dom');

var Resource = require('./components/Resource.jsx');

class Definition extends React.Component {
    constructor() {
        super();
        this.state = {
            resources: {},
            downloaded: false
        };
    }

    componentDidMount() {
        fetch("https://s3.amazonaws.com/cfn-doc-scraper/cfn.json", {
            size: 0,
            method: 'get',
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
            this.setState({
                resources: json,
                downloaded: true
            });
        }).catch(err => console.log("There was an error: ", err));
    }

    render() {
        if (this.state.downloaded === true) {
            return (
                <Resource className="foo" resource={JSON.stringify(this.state.resources["AWS::ApiGateway::Account"])} />
            );
        } else {
            return (
                <Resource className="bar" />
            );
        }

    }
}

ReactDOM.render(<Definition />, document.body);


