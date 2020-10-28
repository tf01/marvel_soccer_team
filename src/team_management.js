

//Functions to help manage a 5-aside soccer team

const { positions } = require("./shared_constants");

const max_goalkeepers = 1;
//Only one of these can be at two
const max_same_pos = 2;
const max_others = 1;

//Check if a character is legal to include on a team based on the curent status of the team
//Returns object with legal: boolean, and reason: string values
export function legal_to_include(character_list, character){
    let result = {};
    result.legal = false;
    result.reason = "nothing";

    //console.log(character_list.length)
    if(character_list.length == 5){
        //not legal to have more than 5
        result.reason = "Too many team members.";
        return result;
    }  

    //analyse team, getting numbers of each team member position
    let goalkeepers = 0;
    let strikers = 0;
    let midfielders = 0;
    let defenders = 0;

    let index = 0;
    for(index in character_list){
        if(character_list[index].id === character.id){
            result.reason = "Character already on team.";
            return result;
        }

        switch (character_list[index].position) {
            case positions['GK']:
                goalkeepers++;
                break;
            case positions['ST']:
                strikers++;
                break;
            case positions['MD']:
                midfielders++;
                break;
            case positions['DF']:
                defenders++;
            default:
                break;
        }
    }

    //only one goalie allowed
    if(goalkeepers == max_goalkeepers && character.position === positions['GK']){
        result.reason = "Too many goalkeepers.";
        return result;
    }
    else if(goalkeepers < max_goalkeepers && character.position === positions['GK']){
        result.legal = true;
        return result;
    }

    //Only two of one of the other positions allowed
    let extra_slot_taken = false;
    let other_positions = [strikers, midfielders, defenders];
    const pos_strings = [positions['ST'], positions['MD'], positions['DF']];

    //Once there are two of the same, others can only be at least 1
    if(strikers == max_same_pos || midfielders == max_same_pos || defenders == max_same_pos){
        extra_slot_taken = true;
    }

    index = 0;
    for(index in other_positions){
        //console.log(other_positions)
        if(extra_slot_taken){
            switch (character.position) {
                case positions['ST']:
                    if(strikers < max_others){
                        result.legal = true;
                        return result;
                    }
                    break;
                case positions['MD']:
                    if(midfielders < max_others){
                        result.legal = true;
                        return result;
                    }
                    break;
                case positions['DF']:
                    if(defenders < max_others){
                        result.legal = true;
                        return result;
                    }
                default:
                    break;
            }
            result.reason = "There are already two of another position on the team.";
            return result;
        }
        if(other_positions[index] == max_same_pos){
            extra_slot_taken = true;
            //Is the character the same position as the one that already has two, reject.
            //console.log(pos_strings[index])
            if(character.position === pos_strings[index]){
                result.reason = "This would make the team one "+pos_strings[index]+" too many.";
                return result;
            }
        }
    }

    result.legal = true;
    return result;
}