import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';


const existingEmail = async (email) => 
{
  await(1000);
  return email === "test@hotmail.com";
}

const validationRules = {
  email: {
    required: "This is required",
    validate : existingEmail
  },
  password: { required: "This is required" },
};


const FormLogin = () => {
  const {register, handleSubmit,reset,  formState: {errors}} = useForm();

 
  const onSubmit = (data) => {
    //call login api
    console.log(JSON.stringify(data));
    console.log("errors",errors);
    reset();
  };

  return (
    <div className="form-container">
    <div className="form-content-left">
      <img src="/img/chat-svgrepo-com.svg" alt="" className="form-img"></img>
    </div>
    <div className="form-content-right">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
           <h1>Login by entering email and password below.</h1>
            
            {/* EMAIL */}
          <div className="form-inputs">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
                  {...register("email", validationRules.email)}
                  id="email"
                  type="email" 
                  name="email" 
                  className="form-input"
                  placeholder="Enter your email"
                />
                  {errors.email && <p>{errors.email.message}</p>}
                  {errors.email && errors.email.type === "validate" && <p>There is no user with this email.</p>}
          </div>
           {/* PASSWORD */}
           <div className="form-inputs">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
                  {...register("password", validationRules.password)}
                  id="password"
                  type="password" 
                  name="password" 
                  className="form-input"
                  placeholder="Enter your password"
                />
                {errors.password && <p>{errors.password.message}</p>}
          </div>
            <button className="form-input-btn" type="submit">Login</button>
      
            <span className="form-input-login">Not registered? Register <Link to="/">here</Link></span>
      </form>
    </div>
  </div>
  )
}

export default FormLogin