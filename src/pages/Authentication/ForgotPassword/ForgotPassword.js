import { sendPasswordResetEmail } from 'firebase/auth'
import React, {  useState }  from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../../Config/firebase'




const initialState = {email:''}


export default function ForgotPassword()

{

const [state , setState] = useState(initialState)
const [process , setProcess] = useState(false)

const handleChange = (e)=>
{
setState(state =>({...state , [e.target.name]:e.target.value}))
}


const handlePassword = (e)=>
{

e.preventDefault()

 const { email } = state

if (!email)
{
 
  window.notify(' please enter your email', 'info')
  return
  
}


sendPasswordResetEmail(auth , email)

.then(() => 
{
  setProcess(true)

  // Password reset email sent!
  window.notify('password reset email sent','info')
  
  // ..
})
.catch((error) => {
  // const errorCode = error.code;
  // const errorMessage = error.message;
  console.error(error)
  // ..
});
setTimeout(() => {
  setProcess(false)
    
}, 3000);
}


  
  return (
    <>
    


    <div className='bgf bg-white min-vh-100'>
   <div className="container-fluid ">
    <div className="row">
      <div className="col col-6  d-lg-block d-none  ">
        
      <img src={'https://firebasestorage.googleapis.com/v0/b/eventapp-ceb2c.appspot.com/o/360_F_465915646_M2xqzMp62FhVMRAd820lH209bOB74dg4.jpg?alt=media&token=f231bcbe-66d1-4cb7-969d-1727dba8f6e0'} alt="login" className='w-100 mt-5' />

      
      </div>

       <div className="col col-lg-5  col-md-6 offset-md-3 offset-lg-0 col-sm-8 offset-sm-2 col-12 white">
            <div className="  login">
              <div className="row">
                <div className="col col-lg-12 col-md-6 offset-2  py-3 ">
                 

              <h1 className='d-lg-block d-none text-warning'>Forgot password</h1>
            
                </div>
              </div>
                

              <div className="cord rounded-4 p-5 ">
              <form onSubmit={handlePassword}>
                

              <h1 className='text-center mb-3 d-lg-none d-block text-warning'>Forgot Password</h1>
                <div className=" col col-12   ">
           <input type="email" name="email" placeholder='Email' className='form-control rounded-4 p-3'  onChange={handleChange} />

                </div>
              
             
                <div className="col col-12 text-center mt-4 ">
                <button className=' text-white p-3 btnforgot bg-warning' disabled={process}>{!process
         ?'forgot'
        :<div className="spinner-grow spinner-grow-sm" role="status"></div>
        }</button>
                </div>
                    
              </form>
                <div className="col col-12 text-center mt-4 ">

<Link to='/Authentication/login'> <button className='btn btn-danger p-3  btnforgot rounded-5 '>login</button></Link> 
          
</div>
        
             
                          

                
   
              
            
              </div> 
      
                </div>
              </div> 
            
          </div>
        </div>
      
        </div>

   
    
    </>
  )
}
