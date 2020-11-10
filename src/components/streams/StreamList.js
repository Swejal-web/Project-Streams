import React from 'react';
import {connect} from 'react-redux';
//we use link for create stream..because link is used to navigate between pages
//and on clicking create stream..we must navigate to /streams/new
import {Link} from 'react-router-dom';
import {fetchStreams} from '../../actions';

class StreamList extends React.Component{
    componentDidMount(){
        this.props.fetchStreams();
    }

renderAdmin(stream){
    if(stream.userId ===this.props.CurrentUserId){
        return (
            <div className="right floated content">
               <Link to={`/streams/edit/${stream.id}`} className="ui button primary ">Edit</Link>
                <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
            </div>
        );
    }
};



renderList=()=>{
    return this.props.streams.map(stream=>{
        return(
            //for semantic ui to style the buttons appropiately
            <div className="item" key={stream.id}>
            {this.renderAdmin(stream)}

                <i className="large middle aligned icon camera" />
                <div className="content">
                    <Link to={`streams/${stream.id}`} className="header">
                    {stream.title}
                    </Link>
        <div className="description">{stream.description}</div>
                </div>
                
            </div>
        );
    });

};

renderCreate(){
    if(this.props.isSignedIn){
        return (
           <div style={{textAlign:'right'}}>
               <Link to="/streams/new" className="ui button primary">
               Create Stream
               </Link>
           </div>
        );
    }
};

   render(){
    //console.log(this.props.isSignedIn);  
    // console.log(this.props.streams);
    return (
        
        <div>
            <h2>Streams</h2>
             
             <div className="ui celled list">{this.renderList()}</div>
            {this.renderCreate()}
        </div>
    );
    };
};

const mapStateToProps =(state)=>{
    //Object.value is a js function which takes object and changes to array.
    //since normally it is stored as object
    return {
            streams: Object.values(state.streams),
            CurrentUserId:state.auth.userId,
            isSignedIn:state.auth.isSignedIn
            };
};

export default connect(mapStateToProps,{fetchStreams})(StreamList);