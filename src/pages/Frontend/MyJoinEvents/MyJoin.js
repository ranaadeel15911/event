import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore/lite'
import React, { useContext, useEffect, useState }  from 'react'
import { firestore } from '../../../Config/firebase'
import { AuthContext } from '../../../context/AuthContext'
import { Link } from 'react-router-dom'




export default function MyJoin() 

{


  
  const {user , isAuthenticated , search} = useContext(AuthContext)
  const [ document , setDocument ] = useState([])
  const [loading , setLoading] = useState(false)
const [ProcessDelete , setProcessDelete] = useState(false)
const [eventDelete , setEventDelete] = useState(null)


useEffect(()=>
{
  const fetchDocument = async() =>
  {    
    setLoading(true)

    let array = []
    
    const q = query(collection(firestore, "join"), where("joinedBy.uid", "==", user.uid ));
    
    const querySnapshot = await getDocs(q);
    
querySnapshot.forEach((doc) => {

  let data =doc.data()
  
  array.push(data)
  

});

setDocument(array)

setLoading(false)

  }
  
  if (user) {
    fetchDocument();
  }
  

},[user])


const handleDelete = async(event)=>
{
  
setEventDelete(event.id)
 setProcessDelete(true)

try
{

await deleteDoc(doc(firestore, "join", event.joiningId));

window.notify('Todo has been successfully Deleted' , 'success')

let newDocument = document.filter((doc)=>
{
return event.id !== doc.id
}

)
setDocument(newDocument)
}
catch(error)
{
console.error(error)
}

setProcessDelete(false)
}




  return (

    <>
    
    {!isAuthenticated

?

<div className='backColor home'>
    <div className="container">
      <div className="row">
        <div className="col col-12 col-md-6 col-lg-6 offset-lg-3 offset-md-2 mb-5 col-md-8 col-12 py-5">
          <div className="card p-2 p-md-3 p-lg-4">
        <div className="row">
        <div className="col py-3 ">
          <p className='mb-0 text-center fw-bold fs-1' ><Link to='/authentication/login' > please Login</Link> </p>
              </div>
            </div>
              </div>
</div>
            </div>
          </div>
        </div>

        :loading===true
        ? <div className="text-center home backColor"> <div className='spinner-grow spinner-grow-lg spin bg-danger '></div></div>
        :document==0
        ?
        
<>
<div className='backColor home'>
<div className="container">
  <div className="row">
    <div className="col col-12 col-md-6 col-lg-6 offset-lg-3 offset-md-2 mb-5 col-md-8 col-12 py-5">
      <div className="card p-2 p-md-3 p-lg-4">
    <div className="row">
    <div className="col py-3 ">
      <p className='mb-0 text-center fw-bold fs-1' > You cannot join any Event</p>
          </div>
        </div>
          </div>
</div>
        </div>
      </div>
    </div>
</>

:
 <>   
<div className=" home d-flex justify-content-center align-items-center">



    <div className="container mt-5">
            <div className="row mt-5">
            <div className="col col-12 ">
        

            {document.filter((event)=>{
    return search.toLowerCase()===''
    ?event
    :event.title.toLowerCase().includes(search)
  }).map((event , i)=>
                    {
                      
              return <div key={i}>
                <div data-aos="flip-left">
                  
               <div className="card mt-5 mb-5 text-white border-0 rounded-5" style={{backgroundColor: '#03045e'}} >
<div className="row g-0">
    <div className="col-12   col-lg-6 col-xl-5">
      <div className="zoomImg">

    {event.modifyImageURL ? (
      <img src={event.modifyImageURL} className="img-fluid eventImg rounded-start" alt="..." />
      ) : (
        <img src={event.imageUrl} width={460}  className="img-fluid eventImg rounded-start" alt="..." />
        )}
        </div>
</div>
<div className=" col col-12 col-lg-6 col-xl-7">
<div className="card-body">
        <p className="card-title"> <span className='text-warning'>Category : </span>{event.category}</p>
        <h5 className="card-title"> <span className='text-warning'>Event : </span> {event.title}  <span className="card-title"> <span className='text-warning ms-3'>Location : </span>  {event.location}</span></h5>
        <p className="card-text">  <span className='text-warning'>Date : </span>  {event.date}  <span className="card-text ms-4"> <span className='text-warning'> Day : </span>{event.day}</span></p>
        <p className='card-text  rounded-5 p-1 text-dark' style={{backgroundColor:'#e9ecef'}} >Start Time :{event.startTime}  <span className='card-text ms-3'>End Time :{event.endTime}</span></p>
     <button className='btn btn-warning btn-sm' disabled>Joined</button>
        
 <button className='btn btn-danger btn-sm ms-3' onClick={()=>{handleDelete(event)}} >
                      {event.id===eventDelete && ProcessDelete
                      ?<div className="text-center"> <div className='spinner-border ms-3 spinner-border-sm'></div> processing</div>
                      :'Unjoin Event'

                      
                    }</button>
      </div>
</div>
</div>
</div>

              
              
      </div>
                </div>
            
                    })}
                      {!document.some((event) => search.toLowerCase() === '' || event.title.toLowerCase().includes(search)) && (
    <div>
      <h1 className='text-center text-white'>No Result Found</h1>
    </div>
  )}
      

</div>
        </div> 
        </div>
        
        </div>
        
        
        </>
      }
      </>
      )
}


