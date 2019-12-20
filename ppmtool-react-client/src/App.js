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
import Landing from './component/layout/Landing'
import Login from './component/userManagement/Login'
import Register from './component/userManagement/Register'
class App extends Component {
  state = {  }
  render() {  
    return ( 
      
        <Router>
          <div className="app">
          <Header />
          {
            //private routes
          }
          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/login" component={Login}></Route>
          {/* <Route exact path="/register" component={Register}></Route>
           */}
          {
            //public routes
          }
            <Provider store={store}>
              <Route exact path="/register" component={Register}></Route>
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
