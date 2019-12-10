import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {getProjectTask, updateProjectTask} from '../../actions/backlogActions'
import PropTypes from 'prop-types'
class UpdateProjectTask extends Component {
    state = {  }

    constructor(props){
        super(props)
        const {id} = this.props.match.params;
        this.state ={
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: 0,
            dueDate: "",
            projectIdentifier: id,
            errors:{}
        }
    }
    componentDidMount(){
        console.log(this.props.match.params)
        const {backlog_id} = this.props.match.params
        const {pt_id} = this.props.match.params
        this.props.getProjectTask(backlog_id, pt_id)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }
        console.log(nextProps.projectTask)
        const {
            id,
            acceptanceCriteria,
            dueDate,
            priority,
            projectIdentifier,
            status,
            summary
        }=nextProps.projectTask

        this.setState({id,
            acceptanceCriteria,
            dueDate,
            priority,
            projectIdentifier,
            status,
            summary
        })
    }


    handleOnChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    handleOnSubmit=(e)=>{
        e.preventDefault();
        const {backlog_id} = this.props.match.params
        const {pt_id} = this.props.match.params
        const projectTask = {
            id: this.state.id,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
            projectIdentifier: this.state.projectIdentifier
        }
        console.log(projectTask)
        this.props.updateProjectTask(backlog_id, pt_id, projectTask, this.props.history)
    }
    render() { 
        const {backlog_id} = this.props.match.params
        const errors = this.props.errors
        return ( 
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projectBoard/${backlog_id}`} className="btn btn-light">
                                Back to Project Board
                            </Link>
                            <h4 className="display-4 text-center">Add Project Task</h4>
                            <p className="lead text-center">Project Name + Project Code</p>
                            <form onSubmit={this.handleOnSubmit}>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className={classnames("form-control form-control-lg",{
                                            "is-invalid": errors.summary
                                        })} 
                                        name="summary" 
                                        placeholder="Project Task summary" 
                                        value={this.state.summary}
                                        onChange={this.handleOnChange}
                                    />
                                    {
                                        errors.summary && <div className="invalid-feedback">{errors.summary}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <textarea 
                                        className="form-control form-control-lg" 
                                        placeholder="Acceptance Criteria" 
                                        name="acceptanceCriteria" 
                                        value={this.state.acceptanceCriteria}
                                        onChange={this.handleOnChange}
                                    >
                                    </textarea>
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input 
                                        type="date" 
                                        className="form-control form-control-lg" 
                                        name="dueDate"
                                        value={this.state.dueDate}  
                                        onChange={this.handleOnChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <select className="form-control form-control-lg" name="priority"  
                                        value={this.state.priority}
                                        onChange={this.handleOnChange}>
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>
        
                                <div className="form-group">
                                    <select className="form-control form-control-lg" name="status" 
                                        value={this.state.status} 
                                        onChange={this.handleOnChange}>
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
        
                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
UpdateProjectTask.propTypes={
    updateProjectTask: PropTypes.func.isRequired,
    getProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    projectTask: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    projectTask: state.backlog.projectTask
})

export default connect(mapStateToProps, {updateProjectTask, getProjectTask})(UpdateProjectTask);