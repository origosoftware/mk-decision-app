import React, {Component} from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import logo from './logo.svg';
import './App.css';

class App extends Component {

	constructor(props)
	{
		super(props);

		this.state = {
		"TableName" : "msg_svc_tbl_1",
		"Item" : {
			"partitionKey1" : new Date(),
			"email" : "",
			"name" : "",
			"message" : ""
			},
			message : ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.sendData = this.sendData.bind(this);
	}
	sendData()
	{

		const url="https://vs62jy0vkk.execute-api.us-west-2.amazonaws.com/default/messaging-service";
		var msg = "";
		axios.post(url, this.state).then(function (response2)  {
				console.log("Results for AXIOS POST -> " + JSON.stringify(response2.data));
				msg = 'Successful';
				
			}).catch(function (error) {
				msg = 'An error occurred during post - ' + error;
				console.error(msg);		
						
			});		
			this.setState({message : msg});			
	}


	handleChange(event) {
        console.log(event);
        var target = event.target;
        console.log(target.id + " : " + target.value);
        this.setState({Item : {...this.state.Item, [target.id] :  target.value} });

        console.log(this.state);
    }

	componentDidMount() {
		this.setState({message : ""});
	}

	componentWillUnmount() {

	}

	render() {
  	return (
    <div className="App">
      	 
      	<p>Send Messages</p> 
      	<form noValidate autoComplete="off" >
  		<p>
  		<TextField id="name" required label="Name" onChange={this.handleChange}/>
  		</p>
  		<p>
  		<TextField id="email" required label="Email" onChange={this.handleChange}/>
  		</p>
  		<p>
  		<TextField id="message" required label="Message" onChange={this.handleChange}/>
		</p>
  		<p>
  		<Button variant="contained" color="primary" onClick={this.sendData}>Send Message</Button>      
		</p>
		{this.state.message}
  		</form>

    </div>
  );
}
}
export default App;
