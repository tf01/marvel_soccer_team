import './stylesheets/main.css';
import { Component } from 'react';

import Character_Browser from './components/character_browser'
import { useGetCharacters_JSON_only } from './marvel_api';
import Chosen_Log from './components/chosen_log';
import {legal_to_include} from './team_management';

import {TwitterShareButton} from 'react-twitter-embed';


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

      list: [],
      modalIsOpen: false,

      results: null,
      attribution: '',

      search_string: '',

      tweetOptions: {},
      tweetText: ''
    }

    this.add_character_to_team = this.add_character_to_team.bind(this);
    this.remove_character_from_team = this.remove_character_from_team.bind(this);
  }

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  add_character_to_team(position, character){
    character.position = position;

    const legality_object = legal_to_include(this.state.list, character);
    if(legality_object.legal){
      this.setState(prevState => ({
        list: [...prevState.list, character]
      }));
    }
    else{
      alert("Could not add "+character.name+" to team. Reason: "+legality_object.reason);
    }

    //this.updateTweet();
  }

  remove_character_from_team(character){
    //remove selected character from the team list
    const index = this.state.list.indexOf(character);
    let copy_of_array = [...this.state.list];
    copy_of_array.splice(index, 1);

    this.setState(prevState => ({
      list: copy_of_array
    }));

    //this.updateTweet();
  }

  gotAttribution(attr){
    this.setState({attribution: attr});
  }

  gotGK(gk){
    this.setState({goalkeeper: gk});
  }

  render() {
    function tester(item, index){
      return(
        <div key={index}>
          {item.name}
        </div>
        
      )
    }
    
    //Update tweet string thing user may want to send with share button
    //May not get correct state if called too early?
    //This does not work, need to figure out how to generate a string when the button is pressed
    function updateTweet(state_list){
      let tweet = 'My Team: ';
      let index = 0;
      for(index in state_list){
        tweet = tweet + state_list[index].name ;
        if(index < state_list){
          tweet = tweet + ", ";
        }
        else{
          tweet = tweet + ".";
        }
      }
      

      return tweet;
    }
    return(
      <div className="App">
        <div className="border">
        {/* stole this from the Marvel website. Turn out the logo isn't an image link, but an SVG
            Not sure if I want to keek it.
        */}
        {/* 
        <div className="title-bar">
          <div className="logo">
            <svg width="130" height="52" xmlns="http://www.w3.org/2000/svg"><rect fill="#EC1D24" width="100%" height="100%"></rect><path fill="#FEFEFE" d="M126.222 40.059v7.906H111.58V4h7.885v36.059h6.757zm-62.564-14.5c-.61.294-1.248.44-1.87.442v-14.14h.04c.622-.005 5.264.184 5.264 6.993 0 3.559-1.58 5.804-3.434 6.705zM40.55 34.24l2.183-18.799 2.265 18.799H40.55zm69.655-22.215V4.007H87.879l-3.675 26.779-3.63-26.78h-8.052l.901 7.15c-.928-1.832-4.224-7.15-11.48-7.15-.047-.002-8.06 0-8.06 0l-.031 39.032-5.868-39.031-10.545-.005-6.072 40.44.002-40.435H21.278L17.64 26.724 14.096 4.006H4v43.966h7.95V26.78l3.618 21.192h4.226l3.565-21.192v21.192h15.327l.928-6.762h6.17l.927 6.762 15.047.008h.01v-.008h.02V33.702l1.845-.27 3.817 14.55h7.784l-.002-.01h.022l-5.011-17.048c2.538-1.88 5.406-6.644 4.643-11.203v-.002C74.894 19.777 79.615 48 79.615 48l9.256-.027 6.327-39.85v39.85h15.007v-7.908h-7.124v-10.08h7.124v-8.03h-7.124v-9.931h7.124z"></path><path fill="#EC1D24" d="M0 0h30v52H0z"></path><path fill="#FEFEFE" d="M31.5 48V4H21.291l-3.64 22.735L14.102 4H4v44h8V26.792L15.577 48h4.229l3.568-21.208V48z"></path></svg>
          </div>
            &nbsp;
          <div className="title">

          </div>
        Soccer Team Selector
        </div> 
        */}
        <div className="title">
          Marvel Character 5-side Soccer Team Selector
        </div>
          <div className="chosen-characters">
            <Chosen_Log list={this.state.list}
            remove_character_from_team={this.remove_character_from_team}
            />
          </div>

          <div className="selection-pane">
            <Character_Browser add_character_to_team={this.add_character_to_team}/>
          </div>
        </div>

        <footer className='footer-attr'>
          <AttributionHTML/>
          &nbsp;
          <TwitterShareButton url={githubURL} options={{
            text: updateTweet(this.state.list),
            }}/>
        </footer>

      </div>
    )
  }
}

export default App;
