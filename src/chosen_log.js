import {useEffect, useState} from 'react'

export default function Chosen_Log(props){

    //Scrolling stuff from here:
    //https://dev.to/dalalrohit/sticky-navbar-from-scratch-using-react-37d5
    const [scrolled,setScrolled] = useState(false);

    const handleScroll=()=>{
        const scroll_d = window.scrollY;
        if(scroll_d > 200){
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
      if(props.list.length == 0){
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

    //Make modal menu that appear when you click, showing more info like position,
    //description of character, etc
    function buttons(item, index){
      return(
        <div key={index}>
          <button className="char-button" value={index}>
            {item.name}
            <img src={item.thumbnail.path+'.'+item.thumbnail.extension}/>
            {item.position}
          </button>
          
        </div>
        
      )
    }

    let x=['chosen']
    if(scrolled){
        x.push('scrolled');
    }
    return(
        <div className={x.join(" ")}>
            <div className="chosen-characters-element">
              <WelcomeTutorial/>
              {props.list.map(buttons)}
            </div>
        </div>
    )
}