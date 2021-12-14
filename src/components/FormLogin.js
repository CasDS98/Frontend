import { Link } from 'react-router-dom';
import { useForm, FormProvider } from "react-hook-form";
import LabelInput from "../components/LabelInput";


//test costum valistaion 
const existingEmail = async (email) => 
{
  await(1000);
  if(email === "test@hotmail.com")
  {
    return true;
  }
  return "There is no user with this email.";
}

const validationRules = {
  email: {
    required: "This is required",
    validate : existingEmail
  },
  password: { required: "This is required" },
};


const FormLogin = () => {
  const methods = useForm();
  const {
    handleSubmit,
    reset,
  } = methods;

 
  const onSubmit = (data) => {
    //call login api
    console.log(JSON.stringify(data));
    //console.log("errors",errors);
    reset();
  };

  return (
    <div className="form-container">
    <div className="form-content-left">
      <img src="/img/chat-svgrepo-com.svg" alt="" className="form-img"></img>
    </div>
    <div className="form-content-right">
    <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)} className="form">
           <h1>Login by entering email and password below.</h1>
            <LabelInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              validation={validationRules.email}
              data-cy="email_input_login"
            />

            <LabelInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              validation={validationRules.password}
              data-cy="password_input_login"
            />
       
           
            <button className="form-input-btn" type="submit">Login</button>
      
            <span className="form-input-login">Not registered? Register <Link to="/">here</Link></span>
      </form>
      </FormProvider>
    </div>
  </div>
  )
}

export default FormLogin