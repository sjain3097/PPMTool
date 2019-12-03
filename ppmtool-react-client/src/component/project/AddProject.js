import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createProject} from '../../actions/ProjectActions' 
class AddProject extends Component {
    state = {  }
    constructor(){
        super()
        this.state= {
            projectName: "",
            projectIdentifier: "",
            description: "",
            startDate: "",
            endDate: "" 
        }
    }

    handleOnChange=(e)=>{
        let name = e.target.name
        let value = e.target.value
        this.setState({[name]:value})
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        const newProject = {
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            startDate: this.state.startDate,
            endDate: this.state.endDate 
        };
        console.log(this.props.createProject)
        this.props.createProject(newProject, this.props.history)
    }

    render() { 
        return ( 
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create / Edit Project form</h5>
                            <hr />
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input name="projectName" onChange={this.handleOnChange} type="text" className="form-control form-control-lg " 
                                        defaultValue={this.state.projectName} placeholder="Project Name" />
                                </div>
                                <div className="form-group">
                                    <input name="projectIdentifier" type="text" className="form-control form-control-lg"
                                        defaultValue={this.state.projectIdentifier} placeholder="Unique Project ID"
                                        // disabled 
                                        onChange={this.handleOnChange}/>
                                </div>
                                {/* <!-- disabled for Edit Only!! remove "disabled" for the Create operation --> */}
                                <div className="form-group">
                                    <textarea name="description" className="form-control form-control-lg"
                                        defaultValue={this.state.description} placeholder="Project Description"
                                        onChange={this.handleOnChange}></textarea>
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input name="startDate" type="date" className="form-control form-control-lg"
                                        defaultValue={this.state.startDate} 
                                        onChange={this.handleOnChange}/>
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input name="endDate" type="date" className="form-control form-control-lg"
                                        defaultValue={this.state.endDate} 
                                        onChange={this.handleOnChange}/>
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
 
AddProject.propTypes = {
    createProject : PropTypes.func.isRequired
};
export default connect(null, {createProject}) (AddProject);