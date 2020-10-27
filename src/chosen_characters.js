import {useState} from 'react'
import Character_Browser from './character_browser'


export default function Chosen_Characters(GK, ST, MD, DF, flexible){



    function Character_Button(pc, character){
        //Customise button to have some of the characteristics of the character
        //that it is representing
        return(
            <button className="char-button" name={pc['pc']}>
                {pc['pc']}
            </button>
        )
    }

    return(
        <div className="chosen-characters-element">
            <Character_Button pc='GK'/>
            <Character_Button pc='ST'/>
            <Character_Button pc='MD'/>
            <Character_Button pc='DF'/>
            <Character_Button pc='??'/>
        </div>
    )
}