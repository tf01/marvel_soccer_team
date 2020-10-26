import {useState, useEffect, useCallback} from 'react'
//Importing public key from file.
//File format is:
//export const public_key = 'key-here';
import './public_key'
import { public_key } from './public_key'

let url = 'http://gateway.marvel.com/v1/public/'
//To bypass cors, from https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
//The result will be blocked every time otherwise.
const proxyurl = "https://cors-anywhere.herokuapp.com/";


let special_case_a_limit = 80
//let limit = 100

//Need to build in a way to use fetch multiple times if necessary.
//Use the total retrieved and the count, 
    //retrieved = 0
    //while true
    //fetch with offset retrieved
    //if (total-retrieved) > 0
        //add count to retrieved
        //loop
    //else
        //return full list of characters (concatentated)

//Custom hook for character query
export function useGetCharacters(starts_with){
    //outgoing state
    const [loading, setLoading] = useState(true);
    const [charlist, setCharlist] = useState([]);
    const [attrib, setAttrib] = useState("");
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setLoading(true);
        let starts_with_a = false;

        let retrieved = 0;
        let limit  = 100;
        let total = 1;

        //let result_set = ['test'];

        //There is one character whose name starts with a number, ensure that they are included
        //by making 'a' a special case
        let starting_argument = starts_with['starts_with']
        if(starting_argument === 'a'){
            starts_with_a = true;
        }

        //loop until all characters under the given letter are found

        //assemble query
        let query = 'characters';
        //if the query is 'a', include all with special characters before it. therefore, no modification to query
        if(starts_with_a){
            query += '&limit='+special_case_a_limit.toString();
            //query += '&offset='+retrieved.toString();
        }
        else{
            query += '?nameStartsWith='+starting_argument;
            query += '&limit='+limit.toString();
            query += '&offset='+retrieved.toString();
        }

        query += '&apikey='+public_key;

        //const Encoded_URL = encodeURI(url+query);
        let getParam = {method: "GET"};
        // let head = { mode: 'no-cors'}
        // getParam.headers = head;

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
            setAttrib(result['attributionText']);
            //console.log(result['attributionText'])
            //update retrieved and total values (for loop)
            // if(starts_with_a){
            //     total = 0;
            // }
            // else{
            //     retrieved += result.data.count;
            //     //console.log(retrieved);
            //     total = result.data.total;
            //     //console.log(total);
            // }
            // //concat into resulting array of json objects
            //console.log(result.data.results);
            // let combined = resultset;
            // combined.concat(result.data.results)
            setError(result.data.total)
            // setResultSet(combined);
            setCharlist(result.data.results)
            //console.log(charlist);
            //console.log(result.data.results)
            //result_set.concat(result.data.results);
            setLoading(false);
        })
        .catch(function(error) {
            console.log("There has been a problem with your fetch operation: ",error.message);
            setError(error)
            setLoading(false)
        });

        //setCharlist(resultset);
        
    },
    [starts_with]);
    return {
        loading,
        charlist,
        attrib,
        error,
    };
}

// function httpGetAsync(theUrl, callback){
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function(){
//         if(xmlHttp.readyState === 4 && xmlHttp.status == 200)
//         useCallback(xmlHttp.responseText);
//     }
//     xmlHttp.open("GET", theUrl, true);
//     xmlHttp.send(null);
// }