import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

import Character_Browser from './character_browser'
//import Chosen_Characters from './chosen_characters'

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
      attribution: '',
    }
  }

  gotAttribution(attr){
    this.setState({attribution: attr});
  }

  gotGK(gk){
    this.setState({goalkeeper: gk});
  }


  //No need for routing in this project
  /*
    Need to finalise layout and get some flexboxes up and running.
    Also, work out what state is going to be passed up here, and how 
    conflicts are going to work.

    Also, think about visuals a little bit.

    Need to rework fetches as well, I want to be able to get the entire
    list of characters at any given name, not just 100.

    A requirement is that any character is able to be selected.
   */
  render() {
    return(
      <div className="App">
        <div className="border">
          <div className="chosen-characters">
            chosen characters
          </div>

          <div className="selection-pane">
            {/* selection pane */}
            <Character_Browser/>
          </div>
        </div>

        <footer>
          test marvel attribution
        </footer>
      </div>
    )
  }
}

export default App;
