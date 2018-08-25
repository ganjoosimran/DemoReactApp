import React from "react";
import PropTypes from 'prop-types';
import {Form, Button} from "semantic-ui-react";
import Validator from "validator"
import InlineError from "../messages/InlineError"

class LoginForm extends React.Component {
	state ={
		data:{
			email: "",
			password:""
		},
		loading: false,
		errors:{}
	};
	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({errors});
		if(Object.keys(errors).length === 0){
			this.props.submit(this.state.data);
		}
	};
	onChange  = e => 
		this.setState({
			data: {  ...this.state.data, [e.target.name]:e.target.value}
		});
	validate = (data) => {
		const errors= {};
		if(!Validator.isEmail(data.email)) errors.email = "Invalid Email";
		if(!data.password) errors.password = "Can't be blank";
		return errors;
	}

	render(){
		const { data, errors } = this.state;
		return(
			<Form onSubmit={this.onSubmit}>
				<Form.Field error={!!errors.email}>
			      <label htmlFor="email">Email</label>
			      <input
			       placeholder='example@example.com' 
			       type="email" 
			       id="email" 
			       name="email" 
			       value={ data.email}
			       onChange={this.onChange}
			       />
			    </Form.Field>
			    {errors.email && <InlineError text={errors.email}/>}
			    <Form.Field error={!!errors.password}>
			      <label htmlFor="password">Password</label>
			      <input
			       placeholder="Make it secure"
			       type="password" 
			       id="password" 
			       name="password" 
			       value={ data.password}
			       onChange={this.onChange}
			       />
			    </Form.Field>
			    {errors.password && <InlineError text={errors.password}/>}
				<Button primary>Login</Button>
			</Form>
			);
	}
}

LoginForm.propTypes ={
	submit: PropTypes.func.isRequired
};

export default LoginForm;