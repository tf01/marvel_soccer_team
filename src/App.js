import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

function App_default() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function long_list(){
  return(
    <table>

    </table>
  )
}

class App extends Component{
  //Main component that the page is built from
   
  constructor(props){
    super(props);
    //Main state for the entire app
    this.state = {
      
    }
  }

  //No need for routing in this project, 
  render() {
    return(
      <div className="App">


        <footer>
          Data provided by Marvel. © 2014 Marvel
        </footer>
      </div>
    )
  }
}

export default App;
