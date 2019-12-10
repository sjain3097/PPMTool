import React, { Component } from 'react';
import Backlog from './Backlog';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {getProjectTasks, deleteProjectTask} from '../../actions/backlogActions'
class ProjectBoard extends Component {
    state = {  }
    constructor(){
        super()
        this.state = {
            errors: {} 
        }
    }
    componentDidMount(){
        const id = this.props.match.params.projectIdentifier
        this.props.getProjectTasks(id)
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    render() { 
        
        const errors = this.state.errors;
        const projectTasks = this.props.projectTasks;
        console.log(errors);
        const id = this.props.match.params.projectIdentifier;
        const backlogs =
            <div>
                <a href={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </a>
                
                <br />
                <hr />
                
                <Backlog projectTasks={projectTasks}/>
            </div>
            if(projectTasks.length < 1  && errors.projectNotFound){
                return (
                    <div className="alert alert-danger text-center" role="alert">
                        {errors.projectNotFound}
                    </div>
                );
            } 
            else if (projectTasks.length < 1 ){
                return(
                    <div className="alert alert-primary text-center" role="alert">
                        No Project tasks on this board
                    </div>
                ) 

            }
            else{
                return backlogs
            }
        
    }
}
 
ProjectBoard.propTypes ={
    backlog: PropTypes.object.isRequired,
    getProjectTasks: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    projectTasks: state.backlog.projectTasks,
    errors: state.errors
})

export default connect(mapStateToProps, {getProjectTasks, deleteProjectTask})(ProjectBoard);