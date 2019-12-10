import React, { Component } from 'react';
import Dashboard from './component/Dashboard';
import Header from './component/layout/Header';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from 'react-router-dom'
import AddProject from './component/project/AddProject';
import ProjectBoard from './component/project/ProjectBoard';
import {Provider} from 'react-redux'
import store from './store';
import UpdateProject from './component/project/UpdateProject';
import AddProjectTask from './component/project/AddProjectTask';
import UpdateProjectTask from './component/project/UpdateProjectTask';
class App extends Component {
  state = {  }
  render() {  
    return ( 
      
        <Router>
          <div className="app">
          <Header />
            <Provider store={store}>
              <Route exact path="/dashboard" component={Dashboard}/>
              <Route exact path="/addProject" component={AddProject}/>
              <Route exact path="/projectBoard/:projectIdentifier" component={ProjectBoard}/>
              <Route path="/updateProject/:id" component={UpdateProject} />
              <Route path="/addProjectTask/:id" component={AddProjectTask}/>
              <Route path="/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask}/>
              {/* <Route path="/deleteProject/:id"/>     */}   
            </Provider>
            
          </div>
        </Router>
     );
  }
}
 
export default App;
