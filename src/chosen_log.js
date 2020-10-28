import {useEffect, useState} from 'react'
import Detailed_Character_View from './detailed_character_view'

import {remove_constant} from './shared_constants'

export default function Chosen_Log(props){
    //Scrolling stuff from here:
    //https://dev.to/dalalrohit/sticky-navbar-from-scratch-using-react-37d5
    const [scrolled,setScrolled] = useState(false);

    //Setting up detailed view like in browser
    const [char, setChar] = useState(null);

    const handleScroll=()=>{
        const scroll_d = window.scrollY;
        if(scroll_d > 50){
            setScrolled(true);
        }
        else{
            setScrolled(false);
        }
    }

    useEffect(()=>{
        window.addEventListener('scroll',handleScroll)
    })

    function WelcomeTutorial(){
      if(props.list.length === 0){
        return(
          <div className="welcome">
            Welcome to this Marvel 5-side Soccer Team Selector! Select your favourite Marvel characters by name below, and add them to your team!
            Once you click on a character, their portrait will appear at the top of the screen. Click on them again to view more info, or remove them from your team.
          </div>
        )
      }
      else{
        return(
          <div className="nothing">

          </div>
        )
      }
    }

    //copied from browser, should probably be in a different file
    function findCharacter(event){
      if(char != null){
        if(char.id == event.target.dataset.item){
          setChar(null);
          return;
        }
      }
      let result_index = null;
      for (result_index in props.list){

          if(props.list[result_index].id == event.target.dataset.item){
              setChar(props.list[result_index]);
              break;
          }
      }
    }

    function setViewingChar(event){
      setChar(event.target.dataset.character);
    }

    //Make modal menu that appear when you click, showing more info like position,
    //description of character, etc
    function buttons(item, index){
      return(
        <div key={index}>
          {/* <button className="char-button" value={index}>
            {item.name} */}
            <div className="char-button">
              <img onClick={findCharacter} data-item={item.id} src={item.thumbnail.path+'.'+item.thumbnail.extension} alt={item.name}/>
            </div>
            {/* {item.position}
          </button> */}
          
        </div>
        
      )
    }

    let x=['chosen']
    if(scrolled){
        x.push('scrolled');
    }

    //consider adding functionality to swap to an open position on the team
    function handleRemove(character, option){
      if(option === remove_constant){
        props.remove_character_from_team(character)
      }
      setChar(null);
    }

    //
    if(char!=null){
      return(
        <div>
          <div className={x.join(" ")}>
            <div className="chosen-characters-element">
              <WelcomeTutorial/>
              {props.list.map(buttons)}
            </div>
          </div>
          <Detailed_Character_View    option_list={[remove_constant]} 
                                      list_action={handleRemove}
                                      character={char}/>
        </div>

      )
    }
    else {
      return(
        <div className={x.join(" ")}>
            <div className="chosen-characters-element">
              <WelcomeTutorial/>
              {props.list.map(buttons)}
            </div>
        </div>
      )
    }

}