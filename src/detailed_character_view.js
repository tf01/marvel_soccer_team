import {Component} from 'react';


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
    



    render(){
        if(!this.props.showing){
            return null;
        }

        function buttonClicked(event){
            this.props.list_action(this.props.character, event.target.name);
        }

        function return_option(item, index){
            return(
                <button key={index} name={item} className="option-element" onClick={buttonClicked}>
                    {item}
                </button>
            )
        }

        return(
            <div className="detailed-char-view-wrap">

                <div className="detailed-char-view">
                    <div className="char-id">
                        {this.props.character.id}
                    </div>
                    <div className="char-name">
                        {this.props.character.name}
                    </div>
                    <div className="description">
                        {this.props.character.description}
                    </div>
                    <img className="portrait" src={this.props.character.thumbnail.path+'.'+this.props.character.thumbnail.extension}/>
                </div>
                <div className="options">
                    {this.props.option_list.map(return_option)}
                </div>
            </div>
        )
    }
}