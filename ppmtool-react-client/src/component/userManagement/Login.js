import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {login} from "../../actions/securityActions"
class Login extends Component {
    state = { 
        username: "",
        password: "",
        errors: {}
     }
     componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
        if(nextProps.security.validToken){
            this.props.history.push("/dashboard")
        }
     }
     handleOnChange=(event)=>{
         this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }
    handleOnSubmit=(event)=>{
        event.preventDefault();
        const LoginRequest = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.login(LoginRequest)
    }
    componentDidMount(){
        if(this.props.security.validToken){
            this.props.history.push("/dashboard")
        }
    }
    render() { 
        const {errors} = this.props
        return ( 
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form action="dashboard.html">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.username
                                        })}
                                        onChange= {this.handleOnChange}
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
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.password
                                        })} 
                                        onChange= {this.handleOnChange}
                                        placeholder="Password" 
                                        name="password" 
                                    />
                                    {
                                        errors.password &&
                                            <div className="invalid-feedback">{errors.password}</div>
                                    }
                                </div>
                                <input 
                                    type="submit" 
                                    className="btn btn-info btn-block mt-4" 
                                    onClick={this.handleOnSubmit}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

         );
    }
}
Login.propTypes = {
    login: PropTypes.func.isRequired, 
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security
})
export default connect(mapStateToProps, {login})(Login);