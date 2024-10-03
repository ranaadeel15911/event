import React, { useContext, useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import {auth , firestore} from '../../../Config/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore/lite';
import {BsFillEyeFill , BsFillEyeSlashFill} from 'react-icons/bs'

const initialState = {username:'',email:'',password:''}

export default function Register()
{

  const navigate = useNavigate()
  
  const {dispatch , handleClick} = useContext(AuthContext)
  const [process , setProcess] = useState(false)
  const [state , setState] = useState(initialState) 
  const [showpass , setShowPass] = useState(false)
  
  const handleChange = (e)=>
  {

setState(state=>({...state,[e.target.name]:e.target.value}))

  }

  
  const showPassword = () =>
  {
    setShowPass(true)
    let x = document.getElementById("passId");
    if (x.type === "password") {
      x.type = "text";
    } else {
      setShowPass(false)
      x.type = "password";
    }
  }



  const handleRegister = async(e)=>
  {

    e.preventDefault()
    // console.log(state)

    const {username , email , password} = state

    if(!username)
    {
      window.notify('Please Enter your Username' , 'error')
      return
    }
    if(username.length<3)
    {
      window.notify('Username lenght atleast 3 character' , 'error')
      return
      
    }
  
    if(!email)
    {
      window.notify('Please Enter your email' , 'error')
      return
    }
    if(!password)
    {
      window.notify('Please Enter your password' , 'error')
      return
    }
    if(password.length<8)
    {
      window.notify('Password lenght AtLeast 8 character' , 'error')
      return
    }

    setProcess(true)

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

      dispatch({type:'LOGOUT'})
      localStorage.removeItem('selectedColor');
     window.notify('Please wait untill the process is complete','success')

    sendEmailVerification(auth.currentUser)
    signOut(auth).then(() =>
    {
      
    }).catch((error) => {
      
      console.error(error)
    });

    let user = userCredential.user;
addDoc(user)

setTimeout(() => {
        
  setProcess(false)
  navigate('/authentication/login')

  window.notify('User Register SuccessFully', 'success')
  return
 }, 2000);
 
 setTimeout(() => {
   window.notify('Email verification sent , verify it ', 'success')
 }, 3000);



  })
  .catch((error) => {
    console.error(error)
    window.notify('You already Register','info' )
    setProcess(false)
    // ..
  });

  }

  const addDoc = async(user) =>
  {
    const {email , password , username} = state

    let formData = {email , password , username}  
  
  formData.dateCreated = serverTimestamp()
  formData.id = window.getRandomId()
  
  
  formData.createdBy = {
    email:user.email,
    uid : user.uid
  }

    try
    {
await setDoc(doc(firestore,'User',formData.id),formData)

    }

     
  catch(error)
  {
    window.notify('Something went wrong','error')
  }
  }

  

  
  return (
    <>
    


    <div className='bgReg'>
   <div className="container-fluid ">
    <div className="row">
      <div className="col col-6  d-lg-block d-none backReg">
        
      <h1 className='text-white text-center welcome'>Welcome </h1>
      <p className='text-center text-white fs-5'>To keep connected with us please <br /> login with your personal information </p>
<br />
<div className='text-center'>

    <Link to='/Authentication/login' className="green"> <button className=' p-3 greenBtn w-50 rounded-5 welcomeReg'>login</button></Link> 
              
</div>
      </div>

       <div className="col col-lg-5  col-md-6 offset-md-3 offset-lg-0 col-sm-8 offset-sm-2 col-12  white">
            <div className="  login">
              <div className="row">
                <div className="col col-lg-12 col-md-6 offset-2  py-3 ">
                 

              <h1 className='d-lg-block d-none green text-center'>Create Account</h1>
            
                </div>
              </div>
                

              <form onSubmit={handleRegister}>
            

              <div className="cord  p-5 rounded-4 ">
              <h1 className='d-lg-none d-block green text-center mb-5'>Register</h1>
              <div className=" col col-12 ">
           <input  type="text" name="username" placeholder='Username' className='form-control rounded-4 p-3 offset-lg-3 bg-light' onChange={handleChange}/>

                </div>
          
                <div className=" col col-12  ">
           <input type="email" name="email" placeholder='Email' className='form-control rounded-4 p-3 mt-4  offset-lg-3 bg-light' onChange={handleChange} />

                </div>
          
            
                              <div className="col col-12 mt-4 input-group offset-lg-3">
  <input type='password' id="passId" name="password" placeholder="Password"className="form-control w-100 rounded-4 p-3"
    onChange={handleChange}  />
<div className="input-group-append">
 
      {!showpass ? 
      <BsFillEyeFill className="input-icon  fs-4"  onClick={showPassword} />
       : <BsFillEyeSlashFill className="input-icon fs-4"onClick={showPassword} />
      }
    
  </div>
</div>

           
             
                <div className="col col-12 text-end mt-4 ">
         <button className=' text-white p-3 btnReg greenBtn offset-0 offset-lg-5 rounded-5 'onClick={()=>handleClick(1)} disabled={process} >{!process
         ?'Register'
         :<div className="spinner-grow spinner-grow-sm" role="status"></div>
         }</button>
                </div>
        
                <div className="col col-12  mt-4 text-center offset-0 offset-lg-3">
                <span className='green'>Already have an account?<Link to='/Authentication/login' className="green">login</Link> </span>
                  </div>
            
              </div> 
                          

                
              </form>
              
        <div>

          </div>
                </div>
              </div> 
            </div>
          </div>
        </div>
      
      

   
    
    </>
  )
}
