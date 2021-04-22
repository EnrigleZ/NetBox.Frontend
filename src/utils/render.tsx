import React from 'react';
import { render } from 'react-dom';
import MyLayout from '../Layout';

import '../style.css';
import 'antd/dist/antd.min.css'

export default function renderPage(elem: JSX.Element) {
    const page = (<div className="App">
        <MyLayout>{elem}</MyLayout>
    </div>);

    render(page, document.getElementById('root'));
}
