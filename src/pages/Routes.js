import React, { useContext  } from 'react'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Frontend from './Frontend'
import Authentication from './Authentication'
import { AuthContext } from '../context/AuthContext'
import PrivateRoute from '../components/PrivateRoute'
import LoaderRoute from '../components/LoaderRoute'


export default function Index() {
  
  const {isAuthenticated  } = useContext(AuthContext)
  //  console.log(user)
  

  return (


    
    <BrowserRouter>
    
<Routes>

<Route path='/*' element={<LoaderRoute Component={Frontend} />}/>
{/* <Route path='Authentication/*' element={<LoaderRoute Component={Authentication} />}/> */}
<Route path='Authentication/*' element={!isAuthenticated ? <Authentication />:<Navigate to='/' />  }/>
<Route path='Frontend/*' element={<PrivateRoute Component = {Frontend} />} />


</Routes>
    
    
    
    </BrowserRouter>
  )
}
