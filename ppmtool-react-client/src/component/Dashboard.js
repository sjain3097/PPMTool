import React, { Component } from 'react';
import ProjectItem from './project/ProjectItem';
import '../App.css';
import CreateProjectButton from './project/CreateProjectButton';
import {connect} from 'react-redux';
import {getProjects} from '../actions/ProjectActions'
import PropTypes from 'prop-types'
class Dashboard extends Component {
    state = {  }

    componentDidMount(){
        this.props.getProjects();
    }

    render() { 
        return ( 
            <div className="projects">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Projects</h1>
                            <br />
                            <CreateProjectButton/>
                            <br />
                            <hr />

                            {/* <!-- Project Item Component --> */}
                            <ProjectItem />
                            {/* <!-- End of Project Item Component --> */}

                        </div>
                    </div>
                </div>
            </div>
         );
    }
}

Dashboard.propType= {
    project: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    project: state.project
})

export default connect(mapStateToProps, {getProjects})(Dashboard);