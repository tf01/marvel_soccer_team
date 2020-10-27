import {useState} from 'react'
import Character_Browser from './character_browser'


export default function Chosen_Characters(GK, ST, MD, DF, flexible){
    const [goalkeeper, setGK] = useState(null);
    const [striker, setST] = useState(null);
    const [midfielder, setMD] = useState(null);
    const [defender, setDF] = useState(null);
    const [flex, setFlex] = useState(null);

    const positions = {'GK': goalkeeper,
                        'ST': striker,
                        'MD': midfielder,
                        'DF': defender,
                        '??': flex
    }

    function Character_Button(pc){
        //Customise button to have some of the characteristics of the character
        //that it is representing
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
                    <img src={positions[pc['pc']].thumbnail.path+'.'+positions[pc['pc']].thumbnail.extension} width='75' height='75'>
                    {pc['pc']}
                    </img>
                </button>
            )
        }
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