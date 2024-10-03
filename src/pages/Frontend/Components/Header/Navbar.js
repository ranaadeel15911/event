import { signOut } from 'firebase/auth'
import React, { useContext} from 'react'
import { Link } from 'react-router-dom'
import { auth} from '../../../../Config/firebase'
import { AuthContext } from '../../../../context/AuthContext'
import { VscThreeBars } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { MdArrowDropDown } from "react-icons/md";


export default function Navbar() 


{

  const {isAuthenticated , dispatch , handleClick , white , pink , handlePink ,  setSearch } = useContext(AuthContext)
  
  


const scrollUp = () =>
{
    window.scrollTo({
        top : 0,
        
    })
}

//////////////////////////////////

    const handleLogout = ()=>
  {
  signOut(auth)
  
    .then(()=>
    {
      dispatch({type:'LOGOUT'})
      window.notify('Logout Successfully' , 'success')
  
    })
    
  .catch = (error) => {
  console.error(error)
  }
  }


  return (
    <>
    <header> 
    <nav className= 'navbar text-white fixed-top  navColor scroll  navbar-expand-md  fixed-top'>
  <div className="container">


  <VscThreeBars  className=" fs-2 d-md-none d-block" style={{cursor:'pointer'}} data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" />
 
  <li className="nav-item " >
        <a className="nav-link active fs-5" href="#"><BsSearch className='d-block d-md-none  '   data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"/></a>
        </li>
        
    <Link to='/' className="navbar-brand mb-0" href="#"><img src="https://firebasestorage.googleapis.com/v0/b/eventapp-ceb2c.appspot.com/o/logo1.png?alt=media&token=b1aa91dd-61f2-4ba9-abca-6b5a5238f6fe" height={60}  alt="" /></Link>

    <button className="navbar-toggler bg-white d-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
         <li className="nav-item">
        <div  style={{textDecoration:'none'}} onClick={scrollUp}>  <Link to='/'className="nav-link mt-2 m-1  fw-bold " style={{color:white==1?'#ff758f': 'grey'}} onClick={()=>handleClick(1)}  >Home</Link></div>
        </li> 
    
         <li className="nav-item">
       <div style={{textDecoration:'none'}} onClick={scrollUp}>  <Link to='/about'  href="#" className="nav-link mt-2 m-1  fw-bold"style={{color:white==2?'#ff758f': 'grey'}} onClick={()=>handleClick(2)} >About</Link></div> 
        </li> 
       {isAuthenticated
      &&
      <>
   
        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle mt-2 m-1 fw-bold"  role="button" data-bs-toggle="dropdown" aria-expanded="false"style={{color:white==8?'#ff758f': 'grey'}} onClick={()=>handleClick(8)}>
            User
            <MdArrowDropDown className='fs-5'/>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li><Link to='/' className='text-decoration-none' onClick={()=>handleClick(1)}> <a className="dropdown-item "  href='#' style={{color:pink==1?'#ff758f': 'white'}} onClick={()=>handlePink(1)}>Admin</a></Link></li>
            <li > <Link to='/'className='text-decoration-none' onClick={()=>handleClick(1)}><a className="dropdown-item" href='#' style={{color:pink==2?'#ff758f': 'white'}} onClick={()=>handlePink(2)}>Member</a></Link></li>
           
          </ul>
        </li>
      </ul>
    </div>
       
        
         {pink==1
          &&
          <>
             <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle mt-2 m-1 fw-bold " href="#" role="button" data-bs-toggle="dropdown" style={{color:white==3?'#ff758f':white==4?'#ff758f':white==5?'#ff758f':'grey'}}>
          Events
          <MdArrowDropDown className='fs-5'/>
          </a>
          <ul className="dropdown-menu">
          <li className="nav-item">
          <a href="#" style={{textDecoration:'none'}} onClick={scrollUp}><Link to='/eventPage' className="nav-link  mt-2 m-1 fw-bold " aria-current="page"style={{color:white==3?'#ff758f': 'grey'}} onClick={()=>handleClick(3)} >Create Event</Link> </a>
        </li>
        <li className="nav-item">
         <a href="#" style={{textDecoration:'none'}} onClick={scrollUp}>  <Link to='/eventShow' className="nav-link mt-2 m-1 fw-bold "style={{color:white==4?'#ff758f': 'grey'}} onClick={()=>handleClick(4)}>My Events</Link></a>
        </li>
        <li className="nav-item">
<a href="#" style={{textDecoration:'none'}} onClick={scrollUp}>  <Link to='/joinedEvent' className="nav-link mt-2 m-1 fw-bold " style={{color:white==5?'#ff758f': 'grey'}} onClick={()=>handleClick(5)} > People who joined my Event</Link></a>
        </li>
           
          </ul>
        </li>
        
</>
} 
{pink==2
&&

<>
<li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle mt-2 m-1 fw-bold" href="#" role="button" data-bs-toggle="dropdown"  style={{color:white==6?'#ff758f':white==7?'#ff758f':'grey'}}>
            Events
            <MdArrowDropDown className='fs-5'/>
          </a>
          <ul className="dropdown-menu">
<li className="nav-item">
<a href="#" style={{textDecoration:'none'}} onClick={scrollUp}>  <Link to='/myjoinEvents' className="nav-link mt-2 m-1 fw-bold " style={{color:white==6?'#ff758f': 'grey'}} onClick={()=>handleClick(6)} >You Join Events</Link></a>
</li>
<li className="nav-item">
<a href="#" style={{textDecoration:'none'}} onClick={scrollUp}>  <Link to='/publicEvent' className="nav-link mt-2 m-1 fw-bold " style={{color:white==7?'#ff758f': 'grey'}} onClick={()=>handleClick(7)} >public Events</Link></a>
</li>
           
          </ul>
        </li>

</>

} 
<li className="nav-item " >
        <a className="nav-link active fs-5 offset-5"><BsSearch className='d-block d-lg-none  text-white mt-2 text-white '   data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"/></a>
        </li>
<form>
<li className="input-group  offset-1  offset-xl-5">
 
  <input type="search" className="p-2 form-control mt-2 d-none d-lg-block rounded-5 border-0" style={{width:'300px'}} placeholder='Search Event' onChange={(e) => setSearch(e.target.value)}/>
  <div className='input-group-append'>

  <BsSearch className='input-search  text-dark'/>
  
  </div>

</li>

</form>
      </>
      } 
   
      </ul> 
        
      
       <div className="d-flex " role="search ">
        
        {!isAuthenticated
        ?
        <>
        <Link to='/Authentication/login' className="btn btn-success  " type="submit">Login</Link>
        <Link to='/Authentication/register' className="btn btn-outline-warning ms-3" type="submit">Register</Link>
        </>
        :
        <>
        
        <button style={{background:'none' , border:"none"}} onClick={()=>handleClick(1)}> <Link to='/' className=" btn logBtn  rounded-5 " type="submit" onClick={handleLogout}>Logout</Link></button>
        
        </>
        }

      </div> 
 
    </div>
  </div>
</nav>
 <div className="offcanvas offcanvas-start bg-dark d-lg-none d-block  off-width  " data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div className="offcanvas-header">
    <h1 className="offcanvas-title text-white" id="offcanvasWithBothOptionsLabel">MUUFA</h1>
    <button type="button" className="btn-close bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body d-lg-none d-block offset-1 offset-md-3">
 
  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
     <div  onClick={scrollUp} className='text-decoration-none'><Link to='/'className="nav-link mt-2 m-1 fw-bold " style={{color:white==1?'#ff758f': 'grey'}} onClick={()=>handleClick(1)}  >Home</Link></div> 
        </li>
    
        <li className="nav-item">
          <div onClick={scrollUp} className='text-decoration-none'></div><Link to='/about'className="nav-link mt-2 m-1  fw-bold"style={{color:white==2?'#ff758f': 'grey'}} onClick={()=>handleClick(2)} >About</Link>
        </li>
        
              {isAuthenticated
      &&
      <>
     
        <div >
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle mt-2 m-1 fw-bold" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"style={{color:white==8?'#ff758f': 'grey'}} onClick={()=>handleClick(8)}>
            User
          </a>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li><Link to='/' className='text-decoration-none' onClick={()=>handleClick(1)}> <a className="dropdown-item "  href='#' style={{color:pink==1?'#ff758f': 'white'}} onClick={()=>handlePink(1)}>Admin</a></Link></li>
            <li > <Link to='/'className='text-decoration-none' onClick={()=>handleClick(1)}><a className="dropdown-item" href='#' style={{color:pink==2?'#ff758f': 'white'}} onClick={()=>handlePink(2)}>Member</a></Link></li>
           
          </ul>
        </li>
      </ul>
    </div>
      
        
          {pink==1
          &&
          <>
          <li className="nav-item">
          <a href="#" style={{textDecoration:'none'}} onClick={scrollUp}><Link to='/eventPage' className="nav-link  mt-2 m-1 fw-bold " aria-current="page"style={{color:white==3?'#ff758f': 'grey'}} onClick={()=>handleClick(3)} >Create Event</Link> </a>
        </li>
        <li className="nav-item">
         <a href="#" style={{textDecoration:'none'}} onClick={scrollUp}>  <Link to='/eventShow' className="nav-link mt-2 m-1 fw-bold "style={{color:white==4?'#ff758f': 'grey'}} onClick={()=>handleClick(4)}>My Events</Link></a>
        </li>
        <li className="nav-item">
<a href="#" style={{textDecoration:'none'}} onClick={scrollUp}>  <Link to='/joinedEvent' className="nav-link mt-2 m-1 fw-bold " style={{color:white==5?'#ff758f': 'grey'}} onClick={()=>handleClick(5)} > People who joined my Event</Link></a>
        </li>
        
</>
}
{pink==2
&&

<>
<li className="nav-item">
<a href="#" style={{textDecoration:'none'}} onClick={scrollUp}>  <Link to='/myjoinEvents' className="nav-link mt-2 m-1 fw-bold " style={{color:white==6?'#ff758f': 'grey'}} onClick={()=>handleClick(6)} >You Join Events</Link></a>
</li>
<li className="nav-item">
<a href="#" style={{textDecoration:'none'}} onClick={scrollUp}>  <Link to='/publicEvent' className="nav-link mt-2 m-1 fw-bold " style={{color:white==7?'#ff758f': 'grey'}} onClick={()=>handleClick(7)} >public Events</Link></a>
</li>

</>

}

          

      </>
      } 
           <li className='nav-item'>
        {!isAuthenticated
        ?
        <>
        <Link to='/Authentication/login' className="btn btn-success  " type="submit">Login</Link>
        <Link to='/Authentication/register' className="btn btn-outline-warning ms-3" type="submit">Register</Link>
        </>
        :
        <>
        
        <button style={{background:'none' , border:"none"}} onClick={()=>handleClick(1)}> <Link to='/' className=" btn logBtn  rounded-5 " type="submit" onClick={handleLogout}>Logout</Link></button>
        
        </>
        }


        </li>
        
      </ul>


  </div>
</div>

<div className="offcanvas offcanvas-top off-height " tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
  <div className="offcanvas-header">
    
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
  <div className="container">
    <div className="row">
      <div className="col col-lg-8 col-12  mx-auto">
  <div className="input-group  mx-auto">
  <input type="search" className="form-control" placeholder="Search Event" onChange={(e) => setSearch(e.target.value)}/>
</div>
      </div>
    </div>
  </div> 
  </div>
</div>

</header>
    </>
  )
}
