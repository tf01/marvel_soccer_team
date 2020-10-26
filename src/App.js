import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

import Character_Browser from './character_browser'


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
      goalkeeper: '',
      striker: '',
      midfielder: '',
      defender: '',
      other: '',

      results: '',
    }
  }


  //No need for routing in this project, 
  render() {
    return(
      <div className="App">

        <div className="selection-pane">
          <Character_Browser/>
        </div>

        <div className="chosen-characters">
          
        </div>

        <footer>
          {/* Use attributionText/HTML for this Data provided by Marvel. © 2014 Marvel */}
        </footer>
      </div>
    )
  }
}

export default App;
