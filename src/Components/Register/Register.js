import React, {Component} from 'react';
import {countries} from 'countries-list';
import { particleOptions } from '../../config';
import Validation from './../../SubComponents/Validation/Validation'

class Register extends Component {

    constructor(props) {
       
        super();  
        this.props = props;    
        
        this.state = {
            email: '',
            password: '',
            name: '',
            errors: []
        }  
    }   

    onNameChange = (event) => {
        this.setState(
            {name: event.target.value}
        );
    }    

    onEmailChange = (event) => {
        this.setState(
            {email: event.target.value}
        );
    }

    onPasswordChange = (event) => {
        this.setState(
            {password: event.target.value}
        );
    }

    onSubmitRegister = () => {       
        fetch("http://localhost:3610/register", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
         .then((response) => response.json())
         .then((user) => {
             if (user && user?.email) {
                this.props.loadUser(user); 
                this.props.onRouteChange("home");
             } else {               
             }
         });                  
    }    

    getCountrySelectOptions = () => {
        const options = [];

        for (let countryCode in countries) {
            options.push(<option key={"countryOption" + countryCode} value="countryCode">{countries[countryCode].name}</option>);
        }

        return options;
    }
           
    render() {         
        
        const {onRouteChange} = this.props;

        return (
            <>            
                    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">      
                    <main className="pa4 black-80">
                        <div className="measure">
                            
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                    <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                                </div>    
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="country">Country</label>
                                    <select id="country" name="country" className="b pa2 ba bg-transparent hover-bg-black hover-white w-100" >
                                        {this.getCountrySelectOptions()}
                                    </select>
                                </div>                        
                            </fieldset>

                            <Validation key="RegisterValidation" type="register" errors={this.state.errors} />

                            <div className="">
                                <input onClick={() => this.onSubmitRegister()} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                            </div>

                            <div className="lh-copy mt3">
                                <p onClick={() => onRouteChange('signin')} className="f6 link dim black db pointer">Sign in</p>                   
                            </div>

                        </div>
                    </main>         
                    </article>                      
            </>
        );
    }
}

export default Register;