import React, { Component } from 'react';
import {createNewUser} from '../../actions/securityActions'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import classnames from 'classnames'

class Register extends Component {
    state = {  }
    constructor(){
        super()
        this.state = {
            username:"",
            fullName: "",
            password: "",
            confirmPassword: "",
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    } 
    handleSubmit=(event)=>{
        event.preventDefault()
        const newUser = {
            username: this.state.username,
            fullName: this.state.fullName,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }
        console.log(newUser, this.props.history)
        this.props.createNewUser(newUser, this.props.history)
    }   
    componentDidMount(){
        if(this.props.security.validToken){
            this.props.history.push("/dashboard")
        }
    }
    render() { 
        const errors = this.props.errors
        console.log(errors)
        return ( 
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>
                            <form >
                                <div className="form-group">
                                    <input type="text"
                                        className={
                                            classnames("form-control form-control-lg",{
                                                'is-invalid': errors.fullName
                                                }
                                            )
                                        } 
                                        onChange = {this.handleChange}
                                        placeholder="Name" 
                                        name="fullName"
                                        required 
                                    />
                                    {
                                       errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="email" 
                                        onChange = {this.handleChange}
                                        className={classnames("form-control form-control-lg",{
                                            "is-invalid": errors.username
                                        })} 
                                        placeholder="Email Address" 
                                        name="username" 
                                    />
                                    {
                                        errors.username &&
                                    <div className="invalid-feedback">{errors.username}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        onChange = {this.handleChange}
                                        className={classnames("form-control form-control-lg",{
                                            "is-invalid": errors.password
                                        })} 
                                        placeholder="Password" 
                                        name="password"
                                    />
                                    {
                                        errors.password &&
                                    <div className="invalid-feedback">{errors.password}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="password"
                                        onChange = {this.handleChange}
                                        className={classnames("form-control form-control-lg",{
                                            "is-invalid": errors.confirmPassword
                                        })} 
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                    />
                                    {
                                        errors.confirmPassword &&
                                            <div className="invalid-feedback">{errors.confirmPassword}</div>
                                    }
                                </div>
                                <input 
                                    type= "submit"
                                    onClick= {this.handleSubmit}
                                    className= "btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

         );
    }
}

Register.propTypes = {
    createNewUser : PropTypes.func.isRequired,
    errors : PropTypes.object.isRequired,
    security : PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    errors : state.errors,
    security: state.security
})
export default connect(mapStateToProps, {createNewUser})(Register);
