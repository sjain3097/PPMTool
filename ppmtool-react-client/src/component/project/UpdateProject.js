import React, { Component } from 'react'
import {getProject, updateProject} from '../../actions/ProjectActions'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import classnames from 'classnames'

class UpdateProject extends Component {

    constructor(props){
        super(props)
        this.state = {
            projectName: "",
            projectIdentifier: "",
            description: "",
            startDate: "",
            endDate: "" ,
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        const {
            projectName,
            projectIdentifier,
            description,
            startDate,
            endDate } = nextProps.project

        this.setState({
            projectName,
            projectIdentifier,
            description,
            startDate,
            endDate
        })
    }
    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.getProject(id, this.props.history)
    }

    handleOnChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
        console.log(event.target.name)
    }
    handleOnSubmit=(event)=>{
        event.preventDefault()
        console.log(this.state)
        const updateProject = {
            projectName:this.state.projectName,
            projectIdentifier:this.state.projectIdentifier,
            description: this.state.description,
            startDate: this.state.startDate,
            endDate:this.state.endDate
        }
        this.props.updateProject(this.state.projectIdentifier, updateProject ,this.props.history)
    }
    render() {
        const errors = this.props.errors
        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create / Edit Project form</h5>
                            <hr />
                            <form>
                                <div className="form-group">
                                    <input 
                                        type="text"
                                        className={classnames("form-control form-control-lg",{
                                            "is-invalid":errors.projectName
                                        })}
                                        placeholder="Project Name" 
                                        defaultValue={this.state.projectName}
                                        name="projectName"
                                        onChange={this.handleOnChange}
                                    />
                                    {
                                        errors.projectName && 
                                    <div className="invalid-feedback">{errors.projectName}</div> 
                                    }
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        placeholder="Unique Project ID"
                                        defaultValue={this.state.projectIdentifier}
                                        name="projectIdentifier"
                                        disabled 
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea 
                                        className={classnames("form-control form-control-lg",{
                                            "is-invalid":errors.description
                                        })} 
                                        placeholder="Project Description"
                                        defaultValue={this.state.description}
                                        onChange={this.handleOnChange}
                                        name="description"
                                    >
                                    </textarea>
                                    {
                                        errors.description && 
                                        <div className="invalid-feedback">{errors.description}</div>
                                    }
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input 
                                        type="date" 
                                        className="form-control form-control-lg" 
                                        name="startDate" 
                                        defaultValue={this.state.startDate}
                                        onChange={this.handleOnChange}
                                    />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input 
                                        type="date" 
                                        className="form-control form-control-lg" 
                                        name="endDate" 
                                        defaultValue={this.state.endDate}
                                        onChange={this.handleOnChange}
                                    />
                                </div>

                                <input type="submit" onClick={this.handleOnSubmit} className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UpdateProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

 const mapStateToProps = state => ({
    project: state.project.project,
    errors: state.errors
})

export default connect(
    mapStateToProps, {getProject, updateProject}
)(UpdateProject)
