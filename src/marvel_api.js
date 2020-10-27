import {useState, useEffect} from 'react';
//Importing public key from file.
//File format is:
//export const public_key = 'key-here';
import './public_key';
import { public_key } from './public_key';
import {per_page} from './shared_constants';

let url = 'http://gateway.marvel.com/v1/public/';
//To bypass cors, from https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
//The result will be blocked every time otherwise.
const proxyurl = "https://cors-anywhere.herokuapp.com/";


export function useGetCharacters_JSON_only(starts_with, page){
    //outgoing state
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setLoading(true);
        let starts_with_a = false;

        let starting_argument = starts_with['starts_with'];

        //assemble query
        let query = 'characters';

        query += '?limit='+per_page.toString();
        //move to shared constant
        if(starting_argument !== 'All'){
            query += '&nameStartsWith='+starting_argument;
        }
        query += '&offset='+(per_page*page).toString();
        query += '&apikey='+public_key;

        let getParam = {method: "GET"};

        fetch(proxyurl+url+query, getParam)
        .then(function(response) {
            if (response.ok) {
                return response.json();
                //return response.toString();
            }
            throw new Error("Network response was not ok.")
        })
        .then(function(result) {
            //marvel attribution text (required)
            setResult(result);
            setLoading(false);
        })
        .catch(function(error) {
            console.log("There has been a problem with your fetch operation: ",error.message);
            setError(error)
            setLoading(false)
        });

        //setCharlist(resultset);
        
    },
    [starts_with, page]);
    return {
        loading,
        result,
        error,
    };
}

