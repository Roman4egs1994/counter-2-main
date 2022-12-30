import React from 'react';
import './App.css';
import {Counter} from "./components/Counter";


function App() {
    return (
        <div className="App">
            <div className='wrapperApp'>
                <Counter  name={'Счетчик'}/>
            </div>

        </div>

    );
}

export default App;
