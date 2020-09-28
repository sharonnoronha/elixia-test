import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import MainApp from './components/MainApp';

class App extends Component{
    render(){
        return(
            <div>
                    <MainApp/>
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.querySelector('#root'));
