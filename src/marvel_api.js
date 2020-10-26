import {useState, useEffect} from 'react'
//Importing public key from file.
//File format is:
//export const public_key = 'key-here';
import './public_key'
import { public_key } from './public_key'

let url = 'http://gateway.marvel.com/public/'
//Just for simplicity, this is here.


let special_case_a_limit = 80
let limit = 100

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

function useGetCharacters(starts_with){
    const [loading, setLoading] = useState(true);
    const [charlist, setCharlist] = useState([]);
    const [attrib, setAttrib] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        let retrieved = 0;
        //assemble query
        let query = 'characters/';
        //if the query is 'a', include all with special characters before it. therefore, no modification to query
        if(starts_with != 'a'){
            query += '?nameStartsWith='+starts_with;
        }
        query += '&limit=100';
        query += 'apikey='+public_key;

        const Encoded_URL = encodeURI(url+query);

        fetch(Encoded_URL)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.")
        })
        .then(function(result) {
            
        })
        .catch(function(error) {
            console.log("There has been a problem with your fetch operation: ",error.message);
            setError(error)
            setLoading(false)
        });
    })
}