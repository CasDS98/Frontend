import React, {useState} from 'react'
import FormSignup from './FormSignup'
import FormSuccess from './FormSuccess'

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  function submitForm(){
    setIsSubmitted(true)
  }

  return (
    <div className="form-container">
      <div className="form-content-left">
        <img src="/img/chat-svgrepo-com.svg" alt="" className="form-img"></img>
      </div>
      {!isSubmitted ? (<FormSignup submitForm={submitForm}/>) : (<FormSuccess></FormSuccess>)}
   
    </div>
  )
}

export default Form
