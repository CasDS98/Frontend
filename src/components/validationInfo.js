export default function validateInfo(values)
{
  let errors = {}

  //username
  if(!values.username.trim()){
    errors.username = "Username required"
  }

  //email
  if(!values.email){
    errors.email = "Email required"
  }else if (!/\S+@\S+\.\S+/.test(values.email))
  {
    errors.email = "Email adress is invalid"
  }

  if(!values.password)
  {
    errors.password = "Password is required"
  }else if (values.password.search(/^[A-Za-z0-9@_]{8,40}$/) === -1)
  {
    errors.password = "Password needs to be 8 characters or more"
  }
 
  if(!values.password2)
  {
    errors.password2 = "Password is required"
  }else if(values.password2 !== values.password)
  {
    errors.password2 = "Passwords do not match"
  }

  return errors;
}