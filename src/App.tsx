import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'antd/dist/antd.css'
import './App.css'

import { NetBoxPage } from './Pages'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/box" component={NetBoxPage} />
          <Route exact path="/" component={NetBoxPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App
