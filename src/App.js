import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LeadGeneration from './container/LeadGeneration/LeadGeneration'
import Agents from './container/Agents/Agents';
import Leads from './container/Leads/Leads';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <LeadGeneration {...props} />} />
          <Route path="/agent/:id" render={(props) => <Agents {...props} />}/>
          <Route path="/leads" render={(props) => <Leads {...props} />}/>
          <Route path='*' render={(props) => <LeadGeneration {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
