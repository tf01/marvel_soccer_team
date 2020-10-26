import {useState} from 'react'
import {useGetCharacters} from './marvel_api'

export default function Character_Browser(){

    function letter_list_entry(item, index){
        return(
            <tr className='letter-list-row' key={index}>
                {item}
            </tr>
        )
    }

    function Entered_Letter_List(start_with){
        const {loading, character_list, attribution, error} = useGetCharacters(start_with);
        // let character_list = ['test1', 'test2', 'test3'];
        // let error = false;
        // let loading = false;
        let arr = ['arrtest'].concat(character_list)
        //console.log();
        console.log(attribution);
        console.log(loading)
        console.log(error)

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
        else if(arr != undefined){
            return(
                <table className='letter-list-table'>
                    <tbody className='letter-list-body'>
                        {arr.map(letter_list_entry)}
                        {attribution}
                    </tbody>
                </table>
            )
        }
        return(
            <div>
                test
            </div>
        )
    }

    return(
        <div className='character-browser'>
            <Entered_Letter_List starts_with='v'/>
        </div>
    )
}