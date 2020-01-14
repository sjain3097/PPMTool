import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {logout} from '../../actions/securityActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

class Header extends Component {
    state = {  }
    logout=()=>{
        this.props.logout();
        window.location.href = "/"
    }
    render() { 
        const {validToken, user} = this.props.security

        const userIsAuthenticated = (
            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">
                            Dashboard
                        </Link>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link " to="/dashboard">
                            <i className="fa fa-user-circle-o mr-1"/>{user.fullName}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/logout" onClick={this.logout.bind(this)}>
                            logout
                        </Link>
                    </li>
                </ul>
            </div>
        )

        const userIsNotAuthenticated = (
            <div className="collapse navbar-collapse" id="mobile-nav">
                

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link " to="/register">
                            Sign up
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            login
                        </Link>
                    </li>
                </ul>
            </div>
        )
        
        let headerLinks;

        if(validToken && user){
            headerLinks = userIsAuthenticated
        }
        else {
            headerLinks = userIsNotAuthenticated
        }

        return ( 
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            Personal Project Management Tool
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                            <span className="navbar-toggler-icon" />
                        </button>
                        {headerLinks}
                        
                    </div>
                </nav>
            </div>
         );
    }
}
Header.propTypes = {
    logout: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired
}
const mapStateToProps = state =>({
    security: state.security
})
export default connect(mapStateToProps, {logout})(Header);