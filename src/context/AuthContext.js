
import { onAuthStateChanged } from 'firebase/auth'
import React ,{ createContext, useEffect, useReducer, useState} from 'react'
import { auth } from '../Config/firebase'


// Inside your component

export const AuthContext = createContext()

const initialState = {isAuthenticated : false , user :{uid:''} }

const reducer = ((state , action)=>
{
  
  

switch (action.type) {
        case 'LOGIN':
          
        return {isAuthenticated : true , user: action.payload.user }        
         
        case 'LOGOUT':
          
          return {isAthenticated:false}
        
          default:
            return state                
          }
})

export default function AuthContextProvider(props)

{
  
  const [state , dispatch] = useReducer(reducer , initialState)

  const [white, setWhite] = useState(parseInt(localStorage.getItem('selectedColor')) || 1);
  
  const [pink, setPink] = useState(parseInt(localStorage.getItem('selectedPink')) || null);

  const [search, setSearch] = useState('');
  

const handleClick = async(color) =>
{
  setWhite(color)
  localStorage.setItem('selectedColor', color);
  
}

const handlePink = async(color) =>
{
  setPink(color)
  
  localStorage.setItem('selectedPink', color); 
}




  useEffect(()=>
  {
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
    
      dispatch({type:'LOGIN' , payload : {user}})
        // ...
      } else {
        
         
        // ...
      }
    });
  },[])

  
  
return (
  
  <AuthContext.Provider value={{...state , dispatch , handleClick, white  , pink , handlePink ,search , setSearch  }}>
        {props.children}
</AuthContext.Provider>
  )
  
}


