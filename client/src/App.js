import React, { Component }  from 'react';
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <h1>This is my First React Headline</h1>
      </div>
    )
  }
}
// if we do not use export then it will not be able to use in other components
export default App;
