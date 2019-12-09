import React, { Component } from 'react';
import Backlog from './Backlog';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {getProjectTasks} from '../../actions/backlogActions'
class ProjectBoard extends Component {
    state = {  }
    componentDidMount(){
        const id = this.props.match.params.projectIdentifier
        this.props.getProjectTasks(id)
    }
    render() { 
        console.log(this.props.projectTasks)
        const id = this.props.match.params.projectIdentifier;
        return ( 
            <div className="container">
                <a href={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </a>
                <br />
                <hr />
                {/* <!-- Backlog STARTS HERE --> */}
                <Backlog projectTasks={this.props.projectTasks}/>
                {/* <!-- Backlog ENDS HERE --> */}
            </div>
         );
    }
}
 
ProjectBoard.propTypes ={
    backlog: PropTypes.object.isRequired,
    getProjectTasks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    projectTasks: state.backlog.projectTasks
})

export default connect(mapStateToProps, {getProjectTasks})(ProjectBoard);