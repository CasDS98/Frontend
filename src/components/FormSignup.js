import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import LabelInput from "../components/LabelInput";
import { Link } from 'react-router-dom';
import { useRegister } from '../contexts/AuthProvider';
import { useHistory } from 'react-router-dom';

let password2='';

const passwordMatch = async (password) => 
{
  if(password === password2)
  {
    return true;
  }
  return "Passwords do not match.";
}

const passwordLenght = async (password) => 
{
  if(String(password).length >= 8)
  {
    return true;
  }
  return "Min length is 8.";
}

const validationRules = {
  username: {
    required: "Username is required",
  },
  email: {
    required: "Email is required",
  },
  password: 
  {
    required: "Password is required",
    validate: passwordLenght
  },
  password2: 
  { 
    required: "Password is required",
    validate : passwordMatch
  },
};

function FormSignup() {
  const  register  = useRegister();
  const history = useHistory();

  const methods = useForm();
  const {
    handleSubmit,
    reset,
  } = methods;

 
  const onSubmit = (data) => {
    //call login api
    console.log(JSON.stringify(data));
     const success = register(
      {
        user_name : data.Username,
        email : data.Email,
        password : data.Password
      }
    );

    if (success) {
			history.replace('/');
		}

    reset();

  };
            
  return (
    <div className="form-content-right">
        <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)} className="form">
           <h1>Create your account by filling in the information bellow.</h1>
           <LabelInput
              label="Username"
              type="text"
              placeholder="Enter your username"
              validation={validationRules.username}
              data-cy="username_input_login"
              showError="true"
            />
            <LabelInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              data-cy="email_input_login"
              validation={validationRules.email}
              showError="true"
            />

            <LabelInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              validation={validationRules.password}
              data-cy="password_input_login"
              onChange={
                event => password2 = event.target.value
              }
              showError="true"
            />

            <LabelInput
              label="Password check"
              type="password"
              placeholder="Enter your password again"
              validation={validationRules.password2}
              data-cy="password2_input_login"
              showError="true"
            />
           
            <button className="form-input-btn" type="submit">Sign Up</button>
      
            <span className="form-input-login">Already have an account? Login <Link to="/login">here</Link></span>
      </form>
      </FormProvider>
    </div> 
  )
}

export default FormSignup
