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

    function buttons(item, index){
      return(
        <div key={index}>
          <button className="char-button">
            {item.name}
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
              {props.list.map(buttons)}
            </div>
        </div>
    )
}