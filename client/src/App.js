import React,{Fragment} from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Header from './components/header/header.component';
import Cases from './components/cases/cases.component';
import logo from './assets/flag-IN.png';
function App() {
  return (
    <Fragment>
      <Header title="Covid-19 India Tracker" logo={logo}/>
      <Router>
        <Switch>
          <Route exact to ='/' component={Cases}/>
          <Route component={Cases}/>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
