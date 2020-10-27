import {useState} from 'react'
import {useGetCharacters, useGetCharacters_JSON_only} from './marvel_api'

const labels = [
    '0-A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'

]

//User actions:
    //render initial selection pane (all buttons with letters)
    //User clicks on button, is taken to list of characters starting with that letter
    //User can select characters based on that

export default function Character_Browser(){
    const [selected, setSelected] = useState('');

    function letter_list_entry(item, index){
        return(
            // <tr className='letter-list-row' key={index}>
            <div>
                {item.name}
                <img src={item.thumbnail.path+'.'+item.thumbnail.extension} width='75' height='75'/>
            </div>
            //</tr>
        )
    }

    function Entered_Letter_List(start_with){
        // const {loading, character_list, attribution, error} = useGetCharacters(start_with);
        // // let character_list = ['test1', 'test2', 'test3'];
        // // let error = false;
        // // let loading = false;
        // let arr = ['arrtest'].concat(character_list)
        // //console.log();
        // console.log(attribution);
        // console.log(loading)
        // console.log(error)
        const {loading, result, error} = useGetCharacters_JSON_only(start_with);
        console.log(result);
        if(error){
            return(
                <div className='error'>
                    There was an error.
                    {error.message}
                </div>
            )
        }
        if(loading){
            return(
                <div className='letter-list-loading'>
                    Loading...
                </div>
            )
        }
        else if(result != undefined){
            return(
                <table className='letter-list-table'>
                    <tbody className='letter-list-body'>
                        {result.data.results.map(letter_list_entry)}
                        {/* {attribution} */}
                    </tbody>
                </table>
            )
        }
    }

    function handleSelectionPaneClicked(event){
        console.log(event.target.name)
        setSelected(event.target.name)
        console.log(selected)
    }

    function initial_selection_pane_item(item, index){
        return(
            // <tr className='selection-pane-item'>
                <button name={index} className='selection-pane-button' onClick={handleSelectionPaneClicked}>
                    {item}
                </button>
            // </tr>
        )
    }

    function Initial_Selection_Pane(){
        return(
            <div className='selection-pane-table'>
                {labels.map(initial_selection_pane_item)}
            </div>
        )
    }

    function Current_View(){
        
        if(selected === ''){
            return(
                <Initial_Selection_Pane/>
            )
        }
        else{
            console.log(selected)
            return(
                <Entered_Letter_List starts_with={labels[selected]}/>
            )
        }
    }

    return(
        <div className='character-browser'>
            <Current_View/>
        </div>
    )
}