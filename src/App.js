import logo from './logo.svg';
import './stylesheets/main.css';
import { Component } from 'react';

import Character_Browser from './character_browser'
import { useGetCharacters_JSON_only } from './marvel_api';
import Chosen_Characters from './chosen_characters';
//import Chosen_Characters from './chosen_characters'

const MarvelURL = "http://marvel.com";
const githubURL = "https://github.com/tf01/marvel_soccer_team";

function AttributionHTML(){
  //Make dummy request, to get the attribution message
  //Should ensure that attribution message stays up to date, 2020, 2021, etc
  const none_starts_with = 'hdfljkasdfjsahdflkjhsadflh';
  let page = 0;
  const {loading, result, error} = useGetCharacters_JSON_only(none_starts_with, page)

  if(error){
    //page++;
    return(
      <div>
        Error from Marvel API.
      </div>
    )
  }
  if(loading){
    return(
      <div>
        Loading...
      </div>
    )
  }
  return(
    <div>
      <a href={MarvelURL}>
        {result.attributionText}
      </a>
      {/* &emsp;
      <a href={githubURL}>
      Developed by Thomas Flint
      </a> */}
    </div>
  )
}

class App extends Component{
  //Main component that the page is built from
   
  constructor(props){
    super(props);
    //Main state for the entire app
    this.state = {
      goalkeeper: null,
      striker: null,
      midfielder: null,
      defender: null,
      other: null,

      results: null,
      attribution: '',

      search_string: '',
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
            <Chosen_Characters GK={this.state['goalkeeper']}
                                ST={this.state['striker']}
                                MD={this.state['midfielder']}
                                DF={this.state['defender']}
                                flexible={this.state['other']}
            
            />
          </div>

          <div className="selection-pane">
            {/* 
            may put search bar out here, and pass through its results as props 
            that way, it's available all of the time
            */}
            <Character_Browser/>
          </div>
        </div>

        <footer className="footer-attr">
          <AttributionHTML/>
        </footer>
      </div>
    )
  }
}

export default App;
