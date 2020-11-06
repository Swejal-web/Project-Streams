import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createStream} from '../../actions';

//reduxForm is similar to connect

class StreamCreate extends React.Component {

    renderError({error,touched}){
        if(touched && error){
            return(
                <div className="ui error message">
                <div className="header">{error}</div>
                </div>
            )
        }
    }


   //formProps contains onchange,ondrop and all the properties
  //In this helper function there is arrow function beacuse
  //this cannot be called in a normal function..so arrow function is made
   renderInput=({input , label , meta})=>{
    const className = `field ${meta.error && meta.touched ? 'error':''} `;
        return (
        <div className={className}>
        <label>{label}</label>
        <input {...input}  
        autoComplete="off"
                // onChange={formProps.input.onChange} 
                // value={formProps.input.value
            
                //instead of formprops you can destructure it using {input}
                //So...<input {...input} /> instead of {...formProps.input}
                />
            {this.renderError(meta)}
                </div>
        );
    }
   //formValues contains what we type in the title and description
   onSubmit=(formValues)=>{
     
     this.props.createStream(formValues);
   }
    render(){
       // console.log(this.props);
       //FIeld can be anything like dropdown,checkbox,  text input form etc
        //handleSubmit automatically does the function of event.preventDefault
       //by default semantic ui hides error messages..so write classname as ui form error
        return (
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
            <Field name="title" component={this.renderInput} label=" Enter Title"/>
            <Field name="description" component={this.renderInput} label="Enter Description"/>
            <button className="ui primary button">Submit</button>
        </form>
    );
    }
};

//the name in the Field at first checks if the object returned by the error
//in validate is same..then it is passed to the renderedInput with input meta....

const validate = (formValues)=>{
     const error = {};

    if(!formValues.title){
        error.title = 'You have to enter a title';
    }
    if(!formValues.description){
        error.description = 'You have to enter a description';
    }
    return error;
};

const formWrapped =  reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);

export default connect(null,{createStream})(formWrapped);