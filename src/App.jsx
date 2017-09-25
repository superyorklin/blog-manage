import React from 'react';
import { Router, Route ,hashHistory,IndexRedirect } from 'react-router';
import Login from './component/Login';
import Home from './component/Home';
import Artical from './component/Artical';
import Recommend from './component/Recommend';
import Change from './component/Change';

export default function App() {
  return (
    <Router history={hashHistory}>
      <Route path='/' component={Login} />
      <Route path='/home' component={Home}>
        <IndexRedirect to='/home/artical' />
        <Route path='artical' component={Artical} />
        <Route path='recommend' component={Recommend} />
        <Route path='change' component={Change} />
      </Route>
    </Router>
  );
}
