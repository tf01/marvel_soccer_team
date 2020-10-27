import {useEffect, useState} from 'react'
import Character_Browser from './character_browser'


export default function Chosen_Characters(props){
    const [goalkeeper, setGK] = useState(props.goa);
    const [striker, setST] = useState(props.str);
    const [midfielder, setMD] = useState(props.mid);
    const [defender, setDF] = useState(props.def);
    const [flex, setFlex] = useState(props.flexible);

    const [list, setList] = useState(props.full_list);

    const selected = [goalkeeper, striker, midfielder, defender, flex];

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
    

    const positions = {'GK': goalkeeper,
                        'ST': striker,
                        'MD': midfielder,
                        'DF': defender,
                        '??': flex
    }

    function Character_Button(pc){
        //Customise button to have some of the characteristics of the character
        //that it is representing
        console.log(pc)
        console.log(positions[`key${pc['pc']}`])
        if(positions[pc['pc']] == null){
            return(
                <button className="char-button" name={pc['pc']}>
                    {pc['pc']}
                </button>
            )
        }
        else{
            return(
                <button className="char-button" name={pc['pc']}>
                    <img src={positions[pc['pc']].thumbnail.path+'.'+positions[pc['pc']].thumbnail.extension} width='75' height='75'/>
                    {pc['pc']}
                </button>
            )
        }
    }

    function char_buttons(item, index){
        console.log(item)
        if(item == null){
            return(
                <button className="char-button" key={index}>
                    {index}
                </button>
            )
        }
        else{
            return(
                <button className="char-button" name={item.name} key={index}>
                    <img src={item.thumbnail.path+'.'+item.thumbnail.extension} width='75' height='75'/>
                </button>
            )
        }
    }

    function names(item, index){
        console.log(item)
        return(
            <div key={index}>
                {item.name}
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
                {/* {selected.map(char_buttons)}
                {goalkeeper} */}
                {list.map(names)}
            </div>
        </div>
    )
}