import {useEffect, useState} from 'react'
import Search_Bar from './search_bar';
import Detailed_Character_View from './detailed_character_view';
import {useGetCharacters_JSON_only} from '../marvel_api'
import {back_constant, per_page, positions} from '../shared_constants';

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

    const [char, setChar] = useState(null);

    //retrieve results 
    const {loading, result, error} = useGetCharacters_JSON_only(selected, page);
    //console.log(result);

    //update num when result is retrieved
    useEffect(()=>{
        if(result != null){
            setNumItems(result.data.count);
        }
        
    }, [result]);

    function findCharacter(event){
        let result_index = null;
        for (result_index in result.data.results){

            if(result.data.results[result_index].id == event.target.dataset.item){
                setChar(result.data.results[result_index]);
                break;
            }
        }
    }

    function letter_list_entry(item, index){
        
        return(
            <div className="letter-list-entry" key={index} data-item={item.id} onClick={(e) => {
                findCharacter(e);
                }} >
                <label className="letter-list-name-label">
                    {item.name}
                </label>
                <img className="letter-list-img" alt={item.name} data-item={item.id} src={item.thumbnail.path+'.'+item.thumbnail.extension}/>
            </div>
        )
    }

    function Entered_Letter_List(props){

        if(props.err){
            return(
                <div className='letter-list-loading'>
                    There was an error.
                    {error.message}
                </div>
            )
        }
        if(props.load){
            return(
                <div className='letter-list-loading'>
                    Loading...
                </div>
            )
        }
        else if(props.res != null){
            if(result.data.count === 0){
                return(
                    <div className='letter-list-loading'>
                        No results.
                    </div>
                )
            }
            else{
                return(
                    <div className='letter-list-table'>
                        <div className='letter-list-body'>
                            {result.data.results.map(letter_list_entry)}
                        </div>
                    </div>
                )
            }
        }
        else{
            return(
                <div>
                    this
                </div>
            )
        }
        
    }

    function handleSelectionPaneClicked(event){
        setSelected(labels[event.target.name])
        setPage(0);
    }

    function initial_selection_pane_item(item, index){
        return(
            <button name={index} key={index} className='selection-pane-button' onClick={handleSelectionPaneClicked}>
                {item}
            </button>
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

    function handlePageChange(event){
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

    function Navigation(){
        return(
            <div className="letter-list-navi">
                <button className='navi-buttons' name='left' onClick={handlePageChange}>
                &#60;
                </button>
                <button className="navi-buttons" onClick={handleBack}>
                    Back
                </button>
                <button className='navi-buttons' name='right'  onClick={handlePageChange}>
                &#62;
                </button>
            </div>

        )
    }

    function listAction(character, position){
        if(position !== back_constant){
            props.add_character_to_team(position, character);
        }
        setChar(null);

    }

    function Current_View(){
        if(char!=null){
            return(
                <div>
                <Detailed_Character_View    option_list={positions} 
                                            list_action={listAction}
                                            character={char}/>
                </div>
            )
        }
        
        if(selected === ''){
            return(
                <Initial_Selection_Pane/>
            )
        }
        else{
            return(
                <div>
                <Navigation/>
                <Entered_Letter_List err={error} load={loading} res={result}/>
                <Navigation/>
                </div>
            )
        }
    }


    
    function submit_search(search_term){
        console.log(search_term)
        setSelected(search_term);
    }

    return(
        <div className='character-browser'>
            <Search_Bar submit={submit_search}/>
            <Current_View/>
        </div>
    )
}