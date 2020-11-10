import _ from 'lodash';
import React from 'react';
import {connect } from 'react-redux';
import {fetchStream,editStream} from '../../actions';
import StreamForm from './StreamForm';
import { formValues } from 'redux-form';

//this prop contains some default values because of react router dom
//the id for the stream is inside :match called params
class StreamEdit extends React.Component {
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }
    //formValues contains the changed values
    onSubmit=(formValues)=>{
        //console.log(formValues);
        this.props.editStream(this.props.match.params.id,formValues)
    };
    
    render(){
    //console.log(this.props);
    //this.props contains all the information about the stream
    if(!this.props.stream){
        return <div>Loading...</div>
    }
    //we do this cause it takes time to fetch stream..
    return (
        <div>
            <h3>Edit a Stream</h3>
            <StreamForm 
            //outer bracket indicates jsx and inner indicates objects
            //initial values is a property in redux form
            //the properties in initial values must be similar to the one in name property of Field
            //which are title and decription
            
            //initialValues={{title:this.props.stream.title,description:this.props.stream.description}}
            //or use Lodash 
            initialValues={_.pick(this.props.stream,'title','description')}
            onSubmit={this.onSubmit} />
        </div>
    );
    }
};
//ownProps contains everything inside props of streamEdit
const mapStateToProps = (state,ownProps)=>{
    //console.log(ownProps);
    return {stream:state.streams[ownProps.match.params.id]};
}
export default connect(mapStateToProps,{fetchStream,editStream})(StreamEdit);