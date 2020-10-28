import {Component} from 'react';

export default class Search_Bar extends Component{
    //Should accept one prop: submit: the submission function, taking the argument to submit.

    constructor(props){
        super(props);
        this.state = {
            search_term: '',
        }

        this.change_search = this.change_search.bind(this);
        this.submit_search = this.submit_search.bind(this);
    }

    change_search(event){
        //console.log(event.target.value);
        this.setState({search_term: event.target.value});
        event.preventDefault();
    }

    submit_search(event){
        //console.log(this.state.search_term);
        this.props.submit(this.state.search_term);
        event.preventDefault();
    }


    render(){
        return(
            <form className="search" onSubmit={this.submit_search} key="search_bar">
            {/*possibly expand to search by any metric? comics and stories included <select name */}
            <input key="search_text" 
                    className="bar" 
                    type="text" 
                    placeholder="Name..." 
                    value={this.state.search_term} 
                    onChange={this.change_search} />
            <input className='enter' key="sbutton" type="submit" value="Search"/>
            </form>
        )
    }
}