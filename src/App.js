import logo from './logo.svg';
import './App.css';
import { Component } from 'react';


function long_list(){
  return(
    <table>

    </table>
  )
}

function Display_res(){
  return(
    <div className='results'>
      {this.state['results']}
    </div>
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

  recieved_char_list(response){
    this.setState({
      results: response,
    })
  }


  //No need for routing in this project, 
  render() {
    return(
      <div className="App">

        <div className="selection-pane">
          second
          <Display_res response="test"/>
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
