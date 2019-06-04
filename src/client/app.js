import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
// import { hot } from 'react-hot-loader/root';
import CDManager from './views/CdManager.jsx';
import './styles/mainStyle.scss';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={CDManager}/>
    </div>
  </BrowserRouter>
);

ReactDOM.render((<App />), document.querySelector('#app') || document.createElement('div'));
