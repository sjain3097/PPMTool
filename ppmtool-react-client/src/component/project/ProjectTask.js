import React, { Component } from 'react';
import {connect} from 'react-redux'
import {deleteProjectTask} from '../../actions/backlogActions'
import PropTypes from 'prop-types';
class ProjectTask extends Component {
    state = {  }
    onDeleteClick = (backlog_id, pt_id) => {
        this.props.deleteProjectTask(backlog_id, pt_id);
    }
    render() { 
        const {projectTask} = this.props
        let priorityString;
        let priorityClass;

        if(projectTask.priority===1){
            priorityClass = "bg-danger text-light"
            priorityString = "HIGH"
        }
        if(projectTask.priority===2){
            priorityClass = "bg-warning text-light"
            priorityString = "MEDIUM"
        }
        if(projectTask.priority===3){
            priorityClass = "bg-info text-light"
            priorityString = "LOW"
        }

        return ( 
            <div className="card mb-1 bg-light">
                <div className={`card-header text-primary ${priorityClass}`}>
                    ID: {projectTask.projectSequence} -- Priority: {priorityString}
                </div>
                <div className="card-body bg-light">
                    <h5 className="card-title">{projectTask.summary}</h5>
                    <p className="card-text text-truncate ">
                        {projectTask.acceptanceCriteria}
                    </p>
                    <a href={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`} className="btn btn-primary">
                        View / Update
                    </a>

                    <button onClick={this.onDeleteClick.bind(this, projectTask.projectIdentifier, projectTask.projectSequence)} className="btn btn-danger ml-4">
                        Delete
                    </button>
                </div>
            </div>

         );
    }
}

ProjectTask.propTypes={
    deleteProjectTask: PropTypes.func.isRequired
}
export default connect(null, {deleteProjectTask}) (ProjectTask);