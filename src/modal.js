import {Component} from 'react';

export default class Modal extends Component{
    
    //https://daveceddia.com/open-modal-in-react/
    //Not exactly the same
    //Need to make sure to pass the following props:
    //show bool, close func, and children nodes

    render() {
        if(!this.props.show){
            return null
        }
        


        return (
            <div className="modal-backdrop">
                <div className="modal-box">
                    {this.props.children}
                    <div className="modal-footer">
                        <button onClick={this.props.onClose}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}