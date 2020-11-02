import React from 'react';
import {connect} from 'react-redux';
import {signIn,signOut} from '../actions'

class GoogleAuth extends React.Component{
 
    componentDidMount(){
        //it takes time to load the library so we use callbavkl function
        //arrow fucntion will only be called once the gapi library is loaded
        window.gapi.load('client:auth2',()=>{
         //when we call client.init ..that executes an asynchronous
         //network request to google api server to initialize
         //our client
         //init gives a promise so no need of arrow/callback function
         //a promise is a object which gives tap on the shoulder after
         //the library is laaded....
            window.gapi.client.init({
                clientId:'77608383647-hipam97cieme68rc4mqtual79fgbre4l.apps.googleusercontent.com',
                scope:'email'
            })
            .then(()=>{
                this.auth=window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                //instead of this you can also write
                //this.onAuthCHange();
                
                //listen is contained inside protoype of auth.inSIgnedin as well as get
             this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
    //with help of listen we can change the state  of isSignedIn
    //without refreshing the page
    onAuthChange=(isSignedIn)=>{
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId); //to get the users google id..
        }else{
            this.props.signOut();
        }
    };

    onSignOut=()=>{
        this.auth.signIn();
    };
  
    onSignIn=()=>{
        this.auth.signOut();
    };
    

    renderAuthButton(){
        if (this.props.isSignedIn === null){
            return null;
        }else if(this.props.isSignedIn){
            return (
                <button onClick={this.onSignIn} className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        }else {
            return(
                <button onClick={this.onSignOut} className="ui red google button">
                    <i className="google icon"></i>
                    Sign In With Google
                </button>
            )
            
        }
    }

    render(){
        return<div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state)=>{
    return {isSignedIn:state.auth.isSignedIn};
}

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth); 