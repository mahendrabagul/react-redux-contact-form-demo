import React, {Component} from 'react';
import './App.css';
import {reduxForm, Field} from 'redux-form';

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div>
        <div className="control">
            <label className="field">{label}</label>
            <input className="input" {...input} placeholder={label} type={type}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
);
let SignInForm = props => {
    const {handleSubmit} = props;
    return <form onSubmit={handleSubmit} className="form">
        <div className="field">
            <div className="control">
                <label className="label">First Name</label>
                <Field className="input" name="firstName" component={renderField} type="text" placeholder="First Name"/>
            </div>
        </div>
        <div className="field">
            <div className="control">
                <label className="label">Last Name</label>
                <Field className="input" name="lastName" component={renderField} type="text" placeholder="Last Name"/>
            </div>
        </div>
        <div className="field">
            <div className="control">
                <label className="label">Email</label>
                <Field className="input" name="email" component={renderField} type="email" placeholder="Email Address"/>
            </div>
        </div>
        <div className="field">
            <div className="control">
                <label className="label">Proficiency</label>
                <div className="select">
                    <Field className="input" name="proficiency" component="select">
                        <option/>
                        <option value="beginner">Beginner Dev</option>
                        <option value="intermediate">Intermediate Dev</option>
                        <option value="expert">Expert Dev</option>
                    </Field>
                </div>
            </div>
        </div>
        <div className="field">
            <div className="control">
                <label className="label">Age</label>
                <Field className="input" name="age" component={renderField} type="number" placeholder="Age"/>
            </div>
        </div>
        <div className="field">
            <div className="control">
                <label className="label">Gender</label>
                <label className="radio">
                    <Field name="gender" component="input" type="radio" value="male"/>
                    {' '}
                    Male
                </label>
                <label className="radio">
                    <Field name="gender" component="input" type="radio" value="female"/>
                    {' '}
                    Female
                </label>
            </div>
        </div>
        <div className="field">
            <div className="control">
                <label className="checkbox">
                    <Field name="saveDetails" id="saveDetails" component="input" type="checkbox"/>
                    Save Details
                </label>
            </div>
        </div>
        <div className="field">
            <div className="control">
                <label className="label">Message</label>
                <Field className="textarea" name="message" component="textarea"/>
            </div>
        </div>
        <div className="field">
            <div className="control">
                <button className="button is-link">Submit</button>
            </div>
        </div>
    </form>;
};


const validate = val => {
    const errors = {};
    if (!val.firstName) {
        errors.firstName = 'Required';
    }
    if (!val.lastName) {
        errors.lastName = 'Required';
    }
    if (!val.email) {
        errors.email = 'Required';
    } else if (!/^.+@.+$/i.test(val.email)) {
        errors.email = 'Invalid email address';
    }
    if (!val.age) {
        errors.age = 'Required'
    } else if (isNaN(Number(val.age))) {
        errors.age = 'Must be a number'
    } else if (Number(val.age) < 18) {
        errors.age = 'Sorry, you must be at least 18 years old'
    }
    return errors;
};

SignInForm = reduxForm({
    form: 'signIn',
    validate
})(SignInForm);

class App extends Component {
    handleSignIn = values => {
        console.log(values);
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to React x redux-form</h1>
                </header>
                <div className="container">
                    <p className="App-intro">
                        Contact Form
                    </p>
                    <SignInForm onSubmit={this.handleSignIn}/>
                </div>
            </div>
        );
    }
}

export default App;
