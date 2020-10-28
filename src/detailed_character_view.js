import {Component} from 'react';
import { back_constant } from './shared_constants';


export default class Detailed_Character_View extends Component{
    //Should accept props:
    //current_character_list: so it knows what its dealing with
    //character: character object
    //list_action: function to remove/add current character from list, 
        //should accept char as arg
        //then, another arg
    //showing: bool showing?
    //option_list: array of options for button
        //maybe in java object format, so that they can have different properties?

    constructor(props){
        super(props);

        //console.log(this.props);
        this.buttonClicked = this.buttonClicked.bind(this);
        this.return_option = this.return_option.bind(this);
    }
    

    buttonClicked(event){
        this.props.list_action(this.props.character, event.target.name);
    }

    return_option(item, index){
        return(
            <button key={index} name={item} className="option-element" onClick={this.buttonClicked}>
                {item}
            </button>
        )
    }

    render(){
        if(this.props.character==null){
            return null;
        }


        //console.log{this.props.option_list.values}

        return(
            <div className="detailed-char-view-wrap">

                <div className="detailed-char-view">
                    <div className="char-name">
                        {this.props.character.name}
                    </div>

                    <img className="portrait" src={this.props.character.thumbnail.path+'.'+this.props.character.thumbnail.extension}/>
                </div>
                <div className="description">
                        {this.props.character.description}
                </div>
                <div className="options">
                    {[...Object.values(this.props.option_list), back_constant].map(this.return_option)}
                </div>
            </div>
        )
    }
}