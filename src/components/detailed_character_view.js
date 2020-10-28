import {Component} from 'react';
import { back_constant } from '../shared_constants';


export default class Detailed_Character_View extends Component{
    //Should accept props:
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

    Render_Position(props){
        if(props.pos !== ''){
            return(
                <div className="char-pos">
                {props.pos}
                </div>
            )
        }
        else{
            return null;
        }
    }

    individual_link(item, index){
        return(
            <div key = {index} className="link">
                <a href={item}>{item}</a>
            </div>
        )
    }

    Render_Links(props){
        if(props.links){
            return(
                <div className="all-links">
                    {props.links.map(this.individual_link)}
                </div>
            )
        }
        else {
            return null;
        }
    }

    render(){
        if(this.props.character==null){
            return null;
        }

        return(
            <div className="detailed-char-view-wrap">
                
                <this.Render_Position pos={this.props.character.position}/>
                <div className="char-name">
                    {this.props.character.name}
                </div>
                
                <img className="portrait" alt={this.props.character.name} src={this.props.character.thumbnail.path+'.'+this.props.character.thumbnail.extension}/>
                
                <div className="description">
                        {this.props.character.description}
                </div>
                <div className="links">
                        <this.Render_Links link={this.props.character.urls}/>
                </div>
                <div className="options">
                    {[...Object.values(this.props.option_list), back_constant].map(this.return_option)}
                </div>
            </div>
        )
    }
}