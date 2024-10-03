import React from 'react'
import{ GrFacebookOption }from 'react-icons/gr'
import {FcGoogle} from 'react-icons/fc'
import {AiOutlineTwitter} from 'react-icons/ai'
import {BsGithub} from 'react-icons/bs'

export default function Footer() {
  return (
    <>
    
    <footer className=" text-white"   >


        <div className="container " >
          <div className="row">
          <div className="col col col-md-4 col-sm-6">
                  <div><br /><br />
                   <h4 >FOLLOW US ?</h4>
      <br/>
      <button className=' text-white p-2 rounded-5 ms-2 iconBtn '>
            <GrFacebookOption className='fs-5' />
            </button>
            <button className=' text-white p-2 iconBtn  rounded-5 ms-2'  >
            <FcGoogle className='fs-5' />
            </button>
            <button className=' text-white p-2  iconBtn  rounded-5  ms-2'  >
            <AiOutlineTwitter className='fs-5' />
            </button>
            <button className=' text-white p-2 iconBtn rounded-5 ms-2 '  >
            <BsGithub className='fs-5' />
            </button>

 
     </div>
     </div>
            <div className="col col-md-4 col-sm-6">
         
              <br/> <br/>
              <div>

              <b >Gemas marketplace the relase etras thats sheets continig passag.</b>
              <br/>
              <br/>
            
              <p>Address : House no.234 College Road Samnabad Faisalabad </p>
              
              <p>Phone : 03016613599</p>
              <br/>
              <p>Email: irshadusama27@gmail.com</p>
              <br/>
              
              </div>
            
             </div>
             <div className="col col-md-2 col-6  ">
              <div><br /><br />
              <div>

               <h4>P A G E S</h4>
               <br/>
               <p >Create Event</p>
               <br/>
               <p >Show Your Events</p>
               <br/>
               <p >Join your Events</p>
               <br/>
              
              
              </div>
              </div>
              </div>
              <div className="col col-md-2 col-6  ">
                <div><br /> <br />
                <div>

                 <h4   >NEED HELP ?</h4>
                 <br/>
                 <p >Terms & Conditions</p>
                 <br/>
                 <p >Privacy Policy</p>
                 <br/>
                 <p >Refund Policy</p>
                
                </div>
                
                </div>
                </div>
       
            </div>
            </div>
          </footer>
    
    </>
  )
}
