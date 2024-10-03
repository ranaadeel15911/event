import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import Footer from '../Components/Footer'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
//..

AOS.init({offset: 250, duration:1500 , once:true });

export default function Home() 
{

  const {isAuthenticated , handleClick , pink} = useContext(AuthContext)


  return (
    <>


    <div id="carouselExampleFade" className="carousel slide carousel-fade " data-interval="false" data-bs-ride="carousel">
  <div className="carousel-inner  ">
    <div className="carousel-item active bgImg1">
    <div className='overlay'>
    <div className="container">
              <div className="row">
                <div className="col col-12">
                  
                    
              <div>
                            <p className='heroText '> Welcome to <span style={{color: 'rgb(252, 237, 34)'}}>Events World</span></p>
                            <p className='fs-1  text-white  text-containerP'>Discover a World of Unforgettable Events
                            </p>
                            <p className='text-white'>Embark on an Unforgettable Journey through Captivating Events and Experiences</p>
                        </div>
                </div>
                        <div className="col col-12  col-lg-1 offset-lg-1 ">
                  
                        <div>
                          
                        <Link to='/about' className="btn  logBtn  rounded-5  p-3 text-white" onClick={()=>handleClick(2)}>About</Link>
                          
                        </div>
      
                        </div>
                </div>
                    </div>
    </div>
</div>

    <div className="carousel-item bgImg2">
    <div className='overlay'>
    <div className="container">
              <div className="row">
                <div className="col col-12">
                  
                    
                        <div>
                        <p className='heroText' > Welcome to <span style={{color: 'rgb(252, 237, 34)'}}>Events World</span></p>
                            <p className='fs-1  text-white'>Discover a World of Unforgettable Events
                            </p>
                            <p className='text-white'>Embark on an Unforgettable Journey through Captivating Events and Experiences</p>
                        </div>
                </div>
                        <div className="col col-12  col-lg-1 offset-lg-1 ">
                        <Link to='/about' className="btn  logBtn  rounded-5  p-3 text-white" onClick={()=>handleClick(2)}>About</Link>
                  </div>
                </div>
                    </div>

     
    </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon d-none"  aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon d-none" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>


<div>

<div className="container">
<div className="row" style={{marginTop:'15%'}} >
        <div className="col col-lg-6 col-md-8 col-12 "  data-aos="fade-up">
        
            <img src="https://firebasestorage.googleapis.com/v0/b/eventapp-ceb2c.appspot.com/o/audience-1853662_640.jpg?alt=media&token=cccc242e-51f8-4712-974d-1cb9f96d7b56" style={{width:'100%'}} />
           
        </div>
        <div className="col col-12 col-lg-6 col-md-4  text-center" data-aos="fade-up">
            <h1 className='textColor'>A new Way to explore the world</h1>
            <p className='text-white'>A new way to explore the world 
                For decades travellers have reached for Lonely Planet books when looking to plan and execute their perfect 
                trip, but now, they can also let Lonely Planet Experiences lead the way
                Learn more</p>
                {isAuthenticated && pink==2
                &&
                <Link to='/publicEvent' className="btn btn-outline-danger btn-sm  w-50 " onClick={()=>handleClick(7)}>Public Events</Link>
                }
        </div>
      
       </div>
       </div>
       <div className="container">  
  <div className="row">
    <div className="col col-12 text-center mt-5 "data-aos="fade-up">

      <h2 className='textColor'>Our Services</h2>
      <h1 className='text-white'>We Provide The Best Service For Your Event</h1>
      <p className='text-white'>Lorem ipsum dolor sit amet,  consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore <br /> magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
    </div>
    </div>
    <div className="row mt-5 text-center">

    <div className="col col-md-4  col-12 mb-3"data-aos="fade-up">
    <div className="card cardShadow">
      <div className='zoomImg'>

  <img src="https://firebasestorage.googleapis.com/v0/b/eventapp-ceb2c.appspot.com/o/venue.webp?alt=media&token=0a34bb11-49a1-4b89-818f-9c9ba4713e3e" className="card-img-top" style={{aspectRatio:'3/2'}}  alt="..."/>
      </div>
  <div className="card-body">
    <h5 className="card-title">Venue Selection</h5>
    <p className="card-text">Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
    <a href="#" id='para' className="btn btn-outline-primary w-75">Read More</a>
  </div>
</div>
    </div>
    <div className="col  col-md-4 col-12 mb-3"data-aos="fade-up">
    <div className="card cardShadow" >
      <div className="zoomImg">

  <img src="https://firebasestorage.googleapis.com/v0/b/eventapp-ceb2c.appspot.com/o/documentation.jpg?alt=media&token=abe1d03c-69a5-4568-b96e-fc91cbc4cdc7" style={{aspectRatio:'3/2'}} className="card-img-top" alt="..."/>
      </div>
  <div className="card-body">
    <h5 className="card-title">Documentation</h5>
    <p className="card-text">Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
    <a href="#" className="btn btn-outline-primary w-75">Read More</a>
  </div>
</div>
    </div>
    <div className=" col col  col-md-4 col-12 mb-3 "data-aos="fade-up">
    <div className="card cardShadow">
      <div className="zoomImg">

  <img src="https://firebasestorage.googleapis.com/v0/b/eventapp-ceb2c.appspot.com/o/invitation.webp?alt=media&token=f4226fc1-77f2-473e-8837-e1e58ff7b631" className="card-img-top" alt="..."/>
      </div>
  <div className="card-body">
    <h5 className="card-title">Invitation Cards</h5>
    <p className="card-text">Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
    <a href="#" className="btn btn-outline-primary w-75">Read More</a>
  </div>
</div>
    </div>
    </div>

  <div className="row mt-5 text-center">
    <div className="col  col-md-4 col-12 mb-3 "data-aos="fade-up">
    <div className="card cardShadow">
      <div className="zoomImg">

  <img src="https://firebasestorage.googleapis.com/v0/b/eventapp-ceb2c.appspot.com/o/entertainment.jpg?alt=media&token=e0e4f309-d18b-47e9-abfe-795f6e1d7f42" style={{aspectRatio:'3/2'}} className="card-img-top" alt="..."/>
      </div>
  <div className="card-body">
    <h5 className="card-title">Entertaiment</h5>
    <p className="card-text">Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
    <a href="#" className="btn btn-outline-primary w-75">Read More</a>
  </div>
</div>
    </div>
    <div className="col col-md-4 col-12 mb-3 "data-aos="fade-up">
    <div className="card cardShadow">
      <div className="zoomImg">

  <img src="https://firebasestorage.googleapis.com/v0/b/eventapp-ceb2c.appspot.com/o/decoration.jpg?alt=media&token=9dfa67db-0b98-44f0-ab5c-b746c0e43c40" style={{aspectRatio:'3/2'}} className="card-img-top" alt="..."/>
      </div>
  <div className="card-body">
    <h5 className="card-title">Decoration</h5>
    <p className="card-text">Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
    <a href="#" className="btn btn-outline-primary w-75">Read More</a>
  </div>
</div>
    </div>
    <div className="col  col-md-4 col-12 mb-3 "data-aos="fade-up">
    <div className="card cardShadow">
      <div className="zoomImg">

  <img src="https://firebasestorage.googleapis.com/v0/b/eventapp-ceb2c.appspot.com/o/juggler.jpg?alt=media&token=1c04981c-3a03-46be-a749-cf18871d1a96"  style={{aspectRatio:'3/2'}}className="card-img-top" alt="..."/>
      </div>
  <div className="card-body">
    <h5 className="card-title">Juggler</h5>
    <p className="card-text">Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
    <a href="#" className="btn btn-outline-primary w-75">Read More</a>
  </div>
</div>
    </div>
  </div>
</div>



<div className="hero_image">
  <div className="overlayhome">

<div className="container-fluid">
<div className="row">
<div className="col  col-12 mt-5 text-white">
  <br /><br />
  
  <br />

  {isAuthenticated && pink==2
  &&
  
  <p className='text-center '><Link to='/publicEvent' onClick={()=>handleClick(7)} className='btn btn-outline-warning w-50 p-3'>Upcoming Events</Link></p>
}

    
  </div>
  </div>
</div>
  


</div>
  </div>

  <div className="container mt-4">

<div className="row">
  <div className="col col-12 ">
    <div data-aos="fade-up">

    <p className='textColor fw-bold fs-5'>HAVE QUESTION?</p>
    <h1 className='fs-1 text-white'>Contact Us</h1>
    </div>
</div>
</div>


  <div className="row">
  
 <div className="col col-12 col-md-6 col-lg-2 text-white mb-5"data-aos="fade-up">
  <p className='text-white'>Address :</p>
  <p className='text-white'>House no.234 College Road Samnabad Faisalabad</p>

  <p className='text-white'>Phone :</p>
  <p >03016613599</p>
  <p>Email :</p>
  <p>irshadusama27@gmail.com</p>
  

</div> 
<div className="col col-12 col-md-6 col-lg-8 offset-0 offset-lg-2 ">
<div data-aos="fade-up">
 <div className='contactBox w-100 p-4 mb-5 rounded-3' >
 <div className="container-fluid">
      <div className="row">
        <div className="col col-12 col-sm-6 ">
  
    <div className="input-group">

<input type="text" className=' w-100 bottomInput' placeholder='First Name' />
</div>
        </div>
        <div className="col  col-12 col-sm-6 mt-sm-0 mt-5">
<input type="text" className=' w-100  bottomInput'placeholder='Last Name' />

        </div>
      </div>
      <div className="row">
        <div className="col  col-12 col-sm-6 mt-sm-5 mt-5">
  
    <div className="input-group">

<input type="email" className=' w-100 bottomInput' placeholder='email' />
</div>
        </div>
        <div className="col  col-12 col-sm-6 mt-sm-5 mt-5 ">
<input type="number" className=' w-100  bottomInput'placeholder='Your number' />

        </div>
      </div>
      <div className="row">
        <div className="col col-12 mt-sm-5 mt-4">
  
    <div className="input-group">

    <textarea className=' mt-3   w-100  ' cols="10" rows="3" placeholder='Your Message'></textarea>
    <button className='logBtn rounded-5 p-2 w-100 mt-4  '>SEND MESSAGE</button>
</div>
        </div>
     
      </div>
    </div>
 
 </div>
</div>
</div>

</div>
 
 </div>
</div>





  <Footer/>
    </>
  )
}
