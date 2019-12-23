import React, { Component } from 'react';
import Dashboard from './component/Dashboard';
import Header from './component/layout/Header';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
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
import jwt_decode from 'jwt-decode'
import setJWTToken from './securityUtils/setJWTToken'
import { SET_CURRENT_USER } from './actions/types';
import {logout} from './actions/securityActions'
import SecureRoute from './securityUtils/secureRoute'
const jwtToken = localStorage.getItem('jwtToken')
if(jwtToken){
  setJWTToken(jwtToken)
  const decoded = jwt_decode(jwtToken)
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  })
  const currentTime = Date.now()/1000
  if(decoded.exp < currentTime){
    //window.location.href="/";
    store.dispatch(logout())
    window.location.href = "/"
  }
}
class App extends Component {
  state = {  }
  render() {  
    return ( 
      <Provider store={store}>
        <Router>
          <div className="app">
            <Header />
            {
              // public routes
            }
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/" component={Landing}></Route>

            {
              // private routes
            }

            <Switch>
              <SecureRoute exact path="/dashboard" component={Dashboard}/>
              <SecureRoute exact path="/addProject" component={AddProject}/>
              <SecureRoute exact path="/projectBoard/:projectIdentifier" component={ProjectBoard}/>
              <SecureRoute path="/updateProject/:id" component={UpdateProject} />
              <SecureRoute path="/addProjectTask/:id" component={AddProjectTask}/>
              <SecureRoute path="/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask}/>
            </Switch>
            {/* <Route path="/deleteProject/:id"/>     */}   
          
            
          </div>
        </Router>
      </Provider>
     );
  }
}
 
export default App;
