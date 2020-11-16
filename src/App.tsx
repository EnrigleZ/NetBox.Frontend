import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'antd/dist/antd.css'
import './App.css'

import MyLayout from './Layout'
import { NetBoxPage } from './Pages'
import Layout from 'antd/lib/layout/layout'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyLayout>
          <Switch>
            <Route exact path="/box" component={NetBoxPage} />
            <Route exact path="/" component={NetBoxPage} />
          </Switch>
        </MyLayout>
      </BrowserRouter>
    </div>
  );
}

export default App
