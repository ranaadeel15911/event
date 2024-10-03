import React, { useContext,useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GrFacebookOption } from "react-icons/gr";
import { FcGoogle } from "react-icons/fc";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth} from '../../../Config/firebase';
import { AuthContext } from '../../../context/AuthContext';
import {BsFillEyeFill , BsFillEyeSlashFill} from 'react-icons/bs'

const initialState = {email:'' , password:''}


export default function Login()

{

  const navigate = useNavigate()

  const [state , setState] = useState(initialState)
const [process , setProcess] = useState(false)
 const {dispatch , handleClick , handlePink} = useContext(AuthContext)
const [showpass , setShowPass] = useState(false)

const showPassword = () =>
{
  setShowPass(true)
  let x = document.getElementById("passIds");
  if (x.type === "password") {
    x.type = "text";
  } else {
    setShowPass(false)
    x.type = "password";
  }
}




const handleChange = (e)=>
{

setState(state=>({...state ,[e.target.name]:e.target.value}))

}




const handleGoogleSignIn = async() =>
{
  try {
    const provider = new GoogleAuthProvider()
    
   await (signInWithPopup(auth , provider))
  } 
  catch (error) 
  {
   
     console.log('error')
    
  }

}

//////////////////////////////////////////


const handleFacebookSignIn = async() =>
{
  try {
    const provider = new FacebookAuthProvider()
    
   await (signInWithPopup(auth , provider))
  } 
  catch (error) 
  {
   
    console.error(error)
    
  }

}
/////////////////////////////////////

const handleLogin = (e) =>
{
  e.preventDefault()

  // console.log(state)
  

  const {email , password} = state

  if(!email)
  {

alert('please enter your email')
return

  }

  if(!password)
  {
    alert('please enter your password')
    return
  }

  setProcess(true)

  signInWithEmailAndPassword(auth , email , password)
  
  .then((userCredential) => {

     dispatch({type:'LOGOUT'})
     
    const user = userCredential.user;

    if(user.emailVerified)
    {
       dispatch({type:'LOGIN' , payload:{user} })
      navigate('/')
    window.notify("Login Successfully", "success")
    
setProcess(false)
    }

    else
    {
      signOut(auth).then(() =>
     {
      window.notify("please verify your email", "error")
      
setProcess(false)
    
    }).catch((error) => {
      // An error happened.
      console.error(error)
      
    });
    }

  })

  .catch((error) => {

    if (error.code === 'auth/wrong-password')
     {
      window.notify('Wrong Password', 'error');

    } else if (error.code === 'auth/user-not-found')
     {
      window.notify('There is no email record. Please register your email', 'error');
    } else {
      console.error(error);
    }

 console.log(error.code)

setProcess(false)
    return
  })
 
}



  
  return (
    <>
    


    <div className='bgc'>
   <div className="container-fluid ">
    <div className="row">
      <div className="col col-6  d-lg-block d-none backLogin  ">
        <div className='container_outer_img'>
          <div>
        <img src={'https://firebasestorage.googleapis.com/v0/b/eventapp-ceb2c.appspot.com/o/199583834-team-plans-and-organizes-various-events-organizer-notes-completed-cases-celebration-or-meeting-removebg-preview.png?alt=media&token=ea53c569-b88c-4fa8-8439-812f7b2660a2'} alt="login" className=' imgSet container_img' />

          </div>

        </div>
      </div>

       <div className="col col-lg-5  col-md-6 offset-md-3 offset-lg-0 col-sm-8 offset-sm-2 col-12 ">
            <div className="  login">
              <div className="row">
                <div className="col col-lg-12 col-md-6 offset-2  py-3 ">
                 

              <h1 className='d-lg-block d-none loginColor'>Login</h1>
              <p className='d-lg-block d-none text-white'>Don't have an account ?  <Link to='/Authentication/register' className="text-danger" style={{textDecoration:'none'}} >Create your account</Link> </p>
                </div>
              </div>
                

              <div className="cord rounded-4  mb-5  p-5 ">
              <form onSubmit={handleLogin}>
                

              <h1 className='text-center mb-3 d-lg-none d-block '> Login</h1>
                <div className=" col col-12   ">
           <input type="email" name="email" placeholder='Email' className='form-control rounded-4 p-3'  onChange={handleChange} />

                </div>
          
              
                <div className="col col-12 mt-4 input-group">
  <input  type='password' id="passIds" name="password" placeholder="Password"className="form-control rounded-4 p-3"
    onChange={handleChange}/>
<div className="input-group-append">
 
      {!showpass ? 
      <BsFillEyeFill className="input-icon  fs-4"  onClick={showPassword} />
       : <BsFillEyeSlashFill className="input-icon fs-4"onClick={showPassword} />
      }
    
  </div>
</div>

                <div className="col col-12  mt-1 d-flex justify-content-end">
                <span ><Link to='/Authentication/forgotPassword' className="text-danger ">Forgot Password ?</Link> </span>
                  </div>
             
                <div className="col col-12 text-center mt-4 ">
          <a href="#"onClick={()=>handlePink(null)}>
            <button className=' text-white p-3 btnLogin' onClick={()=>handleClick(1)} disabled={process}>{!process
         ?'Login'
        :<div className="spinner-grow spinner-grow-sm" role="status"></div>
        }</button></a>
                </div>
        
                <div className="col col-12  mt-4">
                <span ><Link to='/Authentication/register' className="text-danger d-lg-none d-block text-center">Create Register Account ?</Link> </span>
                  </div>
                          

                
              </form>
               <div className="row d-flex justify-content-center  offset-lg-1 mt-5">
            
                <div className="col col-3 col-lg-4 col-xl-3  munro">
       <a href="#" onClick={()=>handlePink(null)}><button className=' text-white p-3 btn btn-primary  rounded-5 shadow' onClick={()=>handleClick(1)}>
                <GrFacebookOption className='fs-2 ' onClick={handleFacebookSignIn}/>
                </button></a>
                </div>
                <div className="col col-3 col-lg-4 col-xl-3 munro ">
                <a href="#" onClick={()=>handlePink(null)}> <button className=' text-white p-3  shadow btn btn-light rounded-5' onClick={()=>handleClick(1)} >
                <FcGoogle className='fs-2 'onClick={handleGoogleSignIn} />
                </button></a>
                </div>
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
