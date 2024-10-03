import { collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore/lite'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { firestore } from '../../../Config/firebase'
import { AuthContext } from '../../../context/AuthContext'



const joined = false



export default function PublicEvents()
 {

    const {user , isAuthenticated , search} = useContext(AuthContext)
    const [ docu , setDocu ] = useState([])
    const [loading , setLoading] = useState(false)
    const [process , setProcess] = useState(false)
    const [ joinedDocs , setJoinedDocs ] = useState([])
const [deleteProcess , setdeleteProcess] = useState(false)
const [join , setJoin] = useState(joined)
const [delProcess , setdelProcess] =useState(null)
    const [joinProcess , setJoinProcess] = useState(null)
  
    useEffect(()=>
    {
      const documents = async()=>
      {
  
    setLoading(true)
  
    let arr = []

     let joinedArr = []
  
    const q = query(collection(firestore, "Event"), where("createBy.uid", "!=", user.uid));
  
    const querySnapshot = await getDocs(q);
  
  querySnapshot.forEach((doc) => {
  
  let data =doc.data()
  
    arr.push(data)

 
  });
  
  
  const joinedQuery = query(collection(firestore, "join"), where("joinedBy.uid", "==", user.uid));
  
  const joinedSnapshot = await getDocs(joinedQuery);
  
  joinedSnapshot.forEach((doc) => {
  
  let data =doc.data()
  
  joinedArr.push(data)
  });
  
      setJoinedDocs(joinedArr)

  for(let i = 0; i< joinedArr.length; i++){
    for(let j=0; j< arr.length; j++){

      if(joinedArr[i].id === arr[j].id){
      
        arr[j].joiningStatus = true
     
      }

    }
  }
  
 setDocu(arr)
  setLoading(false)
  
console.log(docu)

  }
  if (user) {
    documents();
  }
      
    },[user , join])
     
    

    const handleJoined = (event) =>
    {
      setJoinProcess(event.id)

      setProcess(true)
          
      event.dateCreated = serverTimestamp()
event.joiningId = window.getRandomId()
event.joiningStatus = true

event.joinedBy =
{
 email:user.email,
  uid : user.uid, 
}

console.log(event)
createDocument(event)


    }

 const createDocument = async(event) =>
 {
  setJoin(false)

  try
  {

  await setDoc(doc(firestore , 'join', event.joiningId),event );
  
  window.notify('Event has been joined Successfully' , 'success')

}

catch(error)
{
  window.notify('something went wrong' , 'error')
}
setProcess(false)
}





const handleDelete = async (event) => {
  setdeleteProcess(true);

  setdelProcess(event.id)

  let findData = joinedDocs.find((coll) => coll.id === event.id);

  try {
    if (findData.joiningStatus === true) {
      await deleteDoc(doc(firestore, 'join', findData.joiningId));
    }

    // Update the joining status of the event
    const updatedDocu = docu.map((doc) => {
      if (doc.id === event.id) {
        return {
          ...doc,
          joiningStatus: false,
        };
      }
      return doc;
    });
    setDocu(updatedDocu);

    setdeleteProcess(false);
    setJoin(false);

    window.notify('Event has been successfully Unjoined', 'success');
  } catch (error) {
    console.error(error);
  }
};


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
        ? <div className="text-center home backColor"> <div className='spinner-grow spinner-grow-lg spin bg-danger '></div> </div>
        :docu==0
        ?
        
<>
<div className='backColor home'>
<div className="container">
  <div className="row">
    <div className="col col-12 col-md-6 col-lg-6 offset-lg-3 offset-md-2 mb-5 col-md-8 col-12 py-5">
      <div className="card p-2 p-md-3 p-lg-4">
    <div className="row">
    <div className="col py-3 ">
      <p className='mb-0 text-center fw-bold fs-1' >Empty Events</p>
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
            <div className="row  mt-5">
            <div className="col col-12 ">
        
              {docu.map((event , i)=>
  {
    
    return <div key={i}>
                <div data-aos="flip-left">

               <div className="card mt-5 mb-5 text-white border-0 rounded-5" style={{backgroundColor: '#03045e'}} >
<div className="row">
    <div className="col-12  col-lg-6 col-xl-5">
      <div className='zoomImg'>

    {event.modifyImageURL ? (
      <img src={event.modifyImageURL} className="img-fluid eventImg rounded-start" alt="..." />
      ) : (
        <img src={event.imageUrl}  className="img-fluid eventImg rounded-start" alt="..." />
        )}
        </div>
</div>
<div className=" col col-12 col-lg-6 col-xl-7">
<div className="card-body">
<p className="card-text"> <span className='text-warning'> Category : </span> {event.category}</p>
        <h5 className="card-title"> <span className='text-warning'> Event : </span>  {event.title}</h5>
        <p className="card-text"> <span className='text-warning'> Location : </span>  {event.location}</p>
        <p className="card-text"> <span className='text-warning'>Date : </span>{event.date}  <span className="card-text ms-4"> <span className='text-warning'> Day : </span> {event.day}</span> <span className="card-text ms-4"> <span className='text-warning'>Status :</span> {event.status}</span></p>
        <p className='card-text text-dark rounded-5 p-1' style={{backgroundColor:'#e9ecef'}} >Start Time :{event.startTime}  <span className='card-text ms-3'>End Time :{event.endTime}</span></p>
       


        {
          !event.joiningStatus ? (
  <button
    className="btn btn-warning w-100 mt-md-1 mt-xl-0 me-2"
    onClick={() => handleJoined(event)}
    disabled={event.status === 'InActive Event'}>
    {process && joinProcess===event.id? (
      <div className="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></div>
    ) : (
      'Join Event'
    ) }
  </button>
) : (
  <>
    {process && joinProcess===event.id? (
      <div className='d-flex justify-content-center'>

      <div className="spinner-border  spinner-border-sm me-3" role="status" aria-hidden="true"></div>
      </div>
    ) : (
      <>
        <button className="btn btn-success btn-sm mt-md-1 mt-xl-0 btn-sm me-2" disabled>
          Joined
        </button>
        <button className="btn btn-danger mt-md-1 mt-xl-0 btn-sm me-2"
          onClick={() => {handleDelete(event)}}>

          {deleteProcess && delProcess===event.id 
          ?  
          <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
          : 
          'Event Unjoined'
          }
        </button>
      </>
    )}
  </>
)

}


       
      </div>
</div>
</div>
</div>
                </div>

              
              
                </div>
            
                    })}
                     {!docu.some((event) => search.toLowerCase() === '' || event.title.toLowerCase().includes(search)) && (
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

