import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { Link } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore/lite';
import { firestore, storage } from '../../../Config/firebase';
import {  getDownloadURL, ref, uploadBytes } from 'firebase/storage';



export default function EventShow() 

{

  const {user , isAuthenticated , handleClick , search , setSearch} = useContext(AuthContext)
  const [ document , setDocument ] = useState([])
  const [ joinedDocs , setJoinedDocs ] = useState([])
const [loading , setLoading] = useState(false)
  const [processDelete , setProcessDelete] = useState(false)
  const [eventDelete , setEventDelete] = useState(null)
const [event , setEvent] = useState({})
const [processUpdate , setProcessUpdate] = useState(false)
const [eventUpdate , setEventUpdate] = useState(null)
const [imageFile, setImageFile] = useState(null);
const [SelectDate , setSelectDate] = useState(new  Date())
const [CurrentDate , setCurrentDates] = useState(null)
const [day , setDay] = useState(false)

  


const week = ['Sunday' ,  'Monday' , 'Tuesday' , 'wednesday' , 'Thursday' , 'Friday','Saturday']

  const handleChange = (e) => {
    
    
    const { name, value } = e.target;
    if (name === 'startTime' || name === 'endTime' || name==='category' || name==='status' ) {
      // Don't update the selected day if the start time or end time is changed
      setEvent(state => ({ ...state, [name]: value }));
      return;
    }
    
    const date = e.target.value;
    const days = new Date(date).getDay();
  const selectedDay = week[days];

    const selectedDate = new Date(date);
    const currentDate = new Date();
  
    setSelectDate(selectedDate);
    setCurrentDates(currentDate);
  

    if (selectedDate <= currentDate) {
      window.notify('Please select a future date', 'error');
      return;
    }
 setDay(selectedDay);

  setEvent((s) => ({ ...s, [name]: value , day:selectedDay }));
   
  };
  
  

  const handleImageChange = (e) => {

    const file = e.target.files[0];
     setImageFile(file)
  

     
    
  };

  useEffect(() => {

    const fetchDocument = async () => {
      setLoading(true)
  
      let array = []
  
      let joinedArr = []
  
      const q = query(collection(firestore, "Event"), where("createBy.uid", "==", user.uid));
      
      const querySnapshot = await getDocs(q);
      
  querySnapshot.forEach((doc) => {
  
    let data =doc.data()
    
    array.push(data)
    console.log(array)
  
  });
  
  const joinedQuery = query(collection(firestore, "join"), where("createBy.uid", "==", user.uid));
      
  
   const joinedSnapshot = await getDocs(joinedQuery);
      
      joinedSnapshot.forEach((doc) => {
      
      let data =doc.data()
      
      joinedArr.push(data)
      });
  
  setJoinedDocs(joinedArr)
  
  setDocument(array)
  console.log(document)
  setLoading(false)
    }

    if (user) {
      fetchDocument();
    }

  }, [user]);
/////////////////////////////////////////


console.log(document)


const handleDelete = async(event)=>
{

setEventDelete(event.id)

   let findData = joinedDocs.find((coll)=>{
return coll.id == event.id
  })

setProcessDelete(true)

try
{


  if(!findData)
  {
    await deleteDoc(doc(firestore,'Event',event.id));

  }
  
  else
 {
  await deleteDoc(doc(firestore,'join',findData.joiningId));
  await deleteDoc(doc(firestore,'Event',event.id));
 }
 
window.notify('Event has been successfully Deleted' , 'success')

let newDocument = document.filter((doc)=>
{
  return event.id != doc.id
})

setDocument(newDocument)

}

catch(error)
{
  console.error(error)
}
setProcessDelete(false)
}


const handleUpdate = async () => {
  setEventUpdate(event.id);

 
  
  if (SelectDate<=CurrentDate) {
     console.log(SelectDate)
      console.log(CurrentDate)
    window.notify('Please select a future date', 'error');
    return;
  }

  setProcessUpdate(true);

  let findData = joinedDocs.find((coll) => {
    return coll.id == event.id;
  });

  let formData = { ...event };

  formData.modify = serverTimestamp();
  formData.modifiedBy = {
    email: user.email,
    uid: user.uid,
  };


  try {
    // Check if a new image file is selected
    if (imageFile) {
      const storageRef = ref(storage, `user_images/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);

      formData.modifyImageURL = downloadURL;
    }

    if (!findData) {
      await setDoc(doc(firestore, 'Event', event.id), formData, { merge: true });
    } else {
      await setDoc(doc(firestore, 'join', findData.joiningId), formData, { merge: true });
      await setDoc(doc(firestore, 'Event', event.id), formData, { merge: true });
    }

    let newDocument = document.map((doc) => {
      if (doc.id === event.id) {
        return formData;
      }
      return doc;
    });

    setDocument(newDocument);
  } catch (error) {
    console.error(error);
    window.notify('Something went wrong, event was not updated', 'error');
  }

  window.notify('Event has been successfully updated', 'success');
  setProcessUpdate(false);
};




  return (
    <>

    {!isAuthenticated
    ? <div className='backColor home'>
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

        : loading==true

        ? <div className="text-center home backColor"> <div className='spinner-grow spinner-grow-lg spin bg-danger '></div> </div>
    
         :document==0

         ?
         <div className='backColor home'>
<div className="container">
  <div className="row">
    <div className="col col-12 col-md-6 col-lg-6 offset-lg-3 offset-md-2 mb-5 col-md-8 col-12 py-5">
      <div className="card p-2 p-md-3 p-lg-4">
    <div className="row">
    <div className="col py-3 ">
      <p className='mb-0 text-center fw-bold fs-1' >Event does not exist if you want to create events , click this link <Link to='/eventPage'onClick={()=>handleClick(3)} >ADD Event</Link> </p>
      

          </div>
        </div>
          </div>
</div>
        </div>
      </div>
    </div>

    :
<div className=" home d-flex  justify-content-center align-items-center mt-5">
    <div className="container">
            <div className="row mt-5 ">
            <div className="col col-12 mt-3">


  {document.filter((event)=>{
    return search.toLowerCase()===''
    ?event
    :event.title.toLowerCase().includes(search)
  })
.map((event , i)=>

{
  
return            <div key={i}>

<div data-aos="flip-left">

 <div className="card  mt-5 mb-5 text-white border-0 border-0 rounded-5" style={{backgroundColor: '#03045e'}}  >
<div className="row ">
    <div className="col-12  col-lg-6 col-xl-5 ">
      <div className='zoomImg'>

    {event.modifyImageURL ? (
      <img src={event.modifyImageURL} className="img-fluid  eventImg rounded-start" alt="..." />
      ) : (
        <img src={event.imageUrl}  className="img-fluid eventImg  rounded-start" alt="..." />
        )}
        </div>
</div>
<div className=" col col-12   col-lg-6 col-xl-7">
<div className="card-body">
        <p className="card-text"> <span className='text-warning'> Category : </span> {event.category}</p>
        <h5 className="card-title "> <span className='text-warning'> Event : </span>  {event.title}</h5>
        <p className="card-text"> <span className='text-warning'> Location : </span>  {event.location}</p>
        <p className="card-text"> <span className='text-warning'>Date : </span>{event.date}  <span className="card-text ms-4"> <span className='text-warning'> Day : </span> {event.day}</span><span className="card-text ms-4"> <span className='text-warning'>Status :</span> {event.status}</span></p>
        <p className='card-text text-dark rounded-5 p-1' style={{backgroundColor:'#e9ecef'}} >Start Time :{event.startTime}  <span className='card-text ms-3'>End Time :{event.endTime}</span></p>
       
      
        <p>
          <button className='btn btn-success  btn-sm me-2'  data-bs-toggle="modal" data-bs-target="#exampleModal"  onClick={()=>{setEvent(event)}} >

{
   event.id===eventUpdate && processUpdate 
   ?
   <>
<div className="text-center"> <div className='spinner-border spinner-border-sm'></div>processing </div>

   </>
     : 
     'Update Event'
}
    </button>
    <button className='btn btn-danger btn-sm' data-bs-toggle="modal" data-bs-target="#exampleM" onClick={()=>{setEvent(event)}}>
                      {event.id===eventDelete && processDelete
                      ?<div className="text-center"> <div className='spinner-border spinner-border-sm'></div> processing</div>
                      :'Delete Event'

                      
                    }</button>
                    </p>
      
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
  
    
    
}
    
 {/* <!-- Button trigger modal --> */}


 <div className="modal fade" id="exampleModal" >
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" >Update Event</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="row ">
            <div className="col col-sm-6 col-12 mt-3 ">
        <input type="text" name='title' value={event.title}  className="form-control   p-3 " placeholder="Event Name" onChange={handleChange}  />
            </div>
            <div className="col col-sm-6 col-12 mt-3 ">
            <input type="location" name='location' value={event.location} className="form-control p-3  " placeholder="Location" onChange={handleChange}  />
            </div>
        </div>
        <div className="row">
        <div className="col col-sm-6 col-12 mt-3">
        <input type="date" name='date' value={event.date} className="form-control p-3 " placeholder="date" onChange={handleChange}  />
            </div>
            <div className="col col-sm-6 col-12 mt-3">
      
            <select className="form-select  py-3" disabled  name='day' aria-label="Default select example" onChange={handleChange}>
            <option style={{ display: 'none'}}>{!day?event.day:day}</option>
  <option value={day}>Monday</option>
        <option value={day}>Tuesday</option>
        <option value={day}>Wednesday</option>
        <option value={day}>Thursday</option>
        <option value={day}>Friday</option>
        <option value={day}>Saturday</option>
        <option value={day}>Sunday</option>
</select>
            </div> 
        </div>
       
        <div className="row">
           
            <div className="col col-sm-6 col-12 mt-3">
              
            <input type="time" name='startTime' value={event.startTime}  className="form-control p-3 "  onChange={handleChange}  />
            </div>
            <div className="col col-sm-6 col-12 mt-3">
            <input type="time" name='endTime' value={event.endTime} className="form-control p-3 " placeholder="time" onChange={handleChange}  />
            </div>
        </div>
        
        <div className="row">
        <div className="col col-sm-6 col-12 mt-3 ">
      
            <select className="form-select  py-3" value={event.status}  name='status' aria-label="Default select example" onChange={handleChange}>
  <option value='Active Event'>Active Event</option>
        <option value='InActive Event'>InActive Event</option>
    
</select>
            </div>
            <div className="col col-12 col-sm-6 mt-3">
        <input type="text" name='category' value={event.category}  className="form-control  p-3 " placeholder="category" onChange={handleChange}  />
            </div>
         
        </div>
        <div className="row  ">
            <div className="col col-12 mt-3">
            <label>Upload an image with width: 1280px and height: 850px</label>
  <input type="file" name="image"className="form-control  p-2"accept="image/jpeg, image/png, image/gif" onChange={handleImageChange}/>
            </div>
         
        </div>       
          
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-warning"data-bs-dismiss="modal"  onClick={handleUpdate} >Update Event</button>
      </div>
  
    </div>
  </div>
</div>
    
    {/* <!-- Button trigger modal --> */}


 <div className="modal fade" id="exampleM" >
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" >Delete Event</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
     <h3>Would you like to Delete this Event</h3>
              <div className="row mt-3">
              <div className="col">
             
              </div>
              </div>
           
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>{handleDelete(event)}}  >Delete</button>
      </div>
  
    </div>
  </div>
</div>
    
    </>
  )
}