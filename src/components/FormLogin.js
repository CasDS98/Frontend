import { Link, useHistory } from 'react-router-dom';
import { useForm, FormProvider } from "react-hook-form";
import LabelInput from "../components/LabelInput";
import { useCallback, useEffect } from "react";
import { useLogin, useSession } from '../contexts/AuthProvider';


const validationRules = {
  email: {
    required: "This is required"
  },
  password: { required: "This is required" },
};


const FormLogin = () => {
  const history = useHistory();
  const { loading, error, isAuthed  } = useSession();
  const login = useLogin();
  const methods = useForm();
  const {
    handleSubmit,
    reset,
  } = methods;

 
  const onSubmit  = useCallback(async ({ email, password }) => {
		const success = await login(email, password);
    console.log(success);
    if (success) {
			history.replace('/');
		}

    reset();
		
	}, [reset, login, history]);

  useEffect(() => {
		if (isAuthed) {
			history.replace('/');
		}
	}, [isAuthed, history]);


  return (
   
    <div className="form-container">
    <div className="form-content-left">
      <img src="/img/chat-svgrepo-com.svg" alt="" className="form-img"></img>
    </div>
    <div className="form-content-right">
    <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)} className="form">
           <h1>Login by entering email and password below.</h1>
           {
						error ? (
							<p className="text-red-500">
								{error}
							</p>
						) : null
					}
            <LabelInput
              label="email"
              type="email"
              placeholder="Enter your email"
              validation={validationRules.email}
              data-cy="email_input_login"
            />

            <LabelInput
              label="password"
              type="password"
              placeholder="Enter your password"
              validation={validationRules.password}
              data-cy="password_input_login"
            />
       
           
            <button className="form-input-btn" disabled={loading} type="submit">Login</button>
      
            <span className="form-input-login">Not registered? Register <Link to="/register">here</Link></span>
      </form>
      </FormProvider>
    </div>
  </div>

  )
}

export default FormLogin