import {useState} from 'react'
import {useGetCharacters, useGetCharacters_JSON_only} from './marvel_api'
import {per_page} from './shared_constants';

const labels = [
    'All',
    'A',
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

// const left_button_label = &#60;
// const right_button_label = &#62;

//User actions:
    //render initial selection pane (all buttons with letters)
    //User clicks on button, is taken to list of characters starting with that letter
    //User can select characters based on that

export default function Character_Browser(props){
    const [selected, setSelected] = useState('');
    const [page, setPage] = useState(0);
    const [numItemsOnCurrentPage, setNumItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(null);


    function handleAddToTeam(event){
        //Add modal dialog in here to ask when position
        console.log(event.target.value)
        console.log(currentPage.data.results)
        //search through current page to find character
        let char = null;
        let result_char = null;
        for (result_char in currentPage.data.results){
            if(result_char.id === event.target.value){
                char = result_char;
            }
        }
        props.add_character_to_team('goalkeeper', char);
        setSelected('');
    }

    function letter_list_entry(item, index){
        return(
            // <tr className='letter-list-row' key={index}>
            <div className="letter-list-entry">
                {item.name}
                <img src={item.thumbnail.path+'.'+item.thumbnail.extension} width='75' height='75'/>
                <button className="letter-list-addbutton" value={item.id} onClick={handleAddToTeam}>
                    Add
                </button>
            </div>
            //</tr>
        )
    }

    function handlePageChange(event){
        console.log(event.target.name)
        console.log(page)
        console.log(numItemsOnCurrentPage)
        console.log(per_page)
        if(event.target.name === 'right'){
            if(numItemsOnCurrentPage === per_page){
                setPage(page+1);
            } 
        }
        else{
            if(page > 0){
                setPage(page - 1);
            }
        }
    }

    function Entered_Letter_List(start_with){
        const {loading, result, error} = useGetCharacters_JSON_only(start_with, page);
        
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
            setNumItems(result.data.count)
            setCurrentPage(result);
            return(
                <div className='letter-list-table'>
                    <button classname='page-navi-left' name='left' onClick={handlePageChange}>
                        &#60;
                    </button>
                    <div className='letter-list-body'>
                        {result.data.results.map(letter_list_entry)}
                    </div>
                    <button classname='page-navi-right' name='right'  onClick={handlePageChange}>
                        &#62;
                    </button>
                </div>
            )
        }
    }

    function handleSelectionPaneClicked(event){
        //console.log(event.target.name)
        setSelected(event.target.name)
        //console.log(selected)
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

    function handleBack(){
        setSelected('');
    }

    function Current_View(){
        
        if(selected === ''){
            return(
                <Initial_Selection_Pane/>
            )
        }
        else{
            //console.log(selected)
            return(
                <div>
                <button className="back-button-browser" onClick={handleBack}>
                    Back
                </button>
                <Entered_Letter_List starts_with={labels[selected]}/>
                </div>
            )
        }
    }

    return(
        <div className='character-browser'>
            <Current_View/>
        </div>
    )
}