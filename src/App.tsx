import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'antd/dist/antd.css'
import './App.css'

import MyLayout from './Layout'
import { NetBoxPage, TestPage } from './Pages'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyLayout>
          <Switch>
            <Route exact path="/test-path" component={TestPage} />
            <Route exact path="/box" component={NetBoxPage} />
            <Route exact path="/" component={NetBoxPage} />
          </Switch>
        </MyLayout>
      </BrowserRouter>
    </div>
  );
}

export default App
