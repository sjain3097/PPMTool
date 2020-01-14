import React, { Component } from 'react';
import ProjectTask from './ProjectTask';
// import PropTypes from 'prop-types';
// import {connect} from 'react-redux'
// import {getProjectTasks} from '../../actions/backlogActions'
class Backlog extends Component {
    state = {  }
    

    render() { 
        const projectTasks = this.props.projectTasks
        const tasks = projectTasks.map(projectTask => (
            <ProjectTask key={projectTask.id} projectTask={projectTask}/>
        ));
        let todoItems=[];
        let inProgressItems=[];
        let doneItems=[];

        for(let i=0; i<tasks.length; i++){
            let status = tasks[i].props.projectTask.status
            if(status === 'TO_DO'){
                todoItems.push(tasks[i]);
            }
            else if(status === 'IN_PROGRESS'){
                inProgressItems.push(tasks[i]);
            }
            else{
                doneItems.push(tasks[i]);
            }
        }
        console.log(todoItems)
        
        return ( 
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-secondary text-white">
                                <h3>TO DO</h3>
                            </div>
                        </div>
                        {todoItems}                    
                    </div>

                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-primary text-white">
                                <h3>In Progress</h3>
                            </div>
                        </div>
                        {inProgressItems}
                    </div>
                    
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-success text-white">
                                <h3>Done</h3>
                            </div>
                        </div>
                        {doneItems}
                    </div>
                </div>
            </div>
         );
    }
}

// Backlog.proptype = {
//     projectTasks : PropTypes.object.isRequired,
//     getProjectTasks : PropTypes.func.isRequired
// }

// const mapStateToProps = state => ({
//     projectTasks : state.projectTasks
// })

//export default connect(mapStateToProps,{getProjectTasks})(Backlog);
export default Backlog;