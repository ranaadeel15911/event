import { doc, serverTimestamp, setDoc } from 'firebase/firestore/lite'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { firestore , storage  } from '../../../Config/firebase'
import {AuthContext} from '../../../context/AuthContext'
import {  ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const initialState = {title:'' , location:'', date:'', startTime:'',category:'',endTime:'' , day:'' , status:'' }


export default function EventPage()

{
  
  const [imageFile, setImageFile] = useState(null);
  const {user , isAuthenticated , handleClick} = useContext(AuthContext)
const [process , setProcess] = useState(false)
const [state , setState] = useState(initialState)
 const [day , setDay] = useState(false)
const [SelectDate , setSelectDate] = useState(null)
const [CurrentDate , setCurrentDates] = useState(null)

const navigate = useNavigate()

const week = ['Sunday' ,  'Monday' , 'Tuesday' , 'wednesday' , 'Thursday' , 'Friday','Saturday']


const handleChange = (event) => {
  
  const { name, value } = event.target;
  
  if (name === 'startTime' || name === 'endTime' || name==='category' || name==='status' || name==='title'  || name==='location' ) {
    // Don't update the selected day if the start time or end time is changed
    setState(state => ({ ...state, [name]: value }));
    return;
  }
  
  const date = event.target.value;
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

  setState((state) => ({ ...state, [name]: value, day: selectedDay }));
};



/////////////////////////////////////////////////////////////////////



const handleSubmit = async (e) => {
  
  e.preventDefault();


  if (!isAuthenticated) {
    navigate('/authentication/login');
    window.notify('Login to your account', 'info');
    return;
  }

  const { title, location, date, startTime, category, endTime, day, status } = state;

  if (!title) {
    window.notify('Please enter your event name', 'error');
    return;
  }
  if (SelectDate=='Invalid Date') {
    window.notify('Please select a future date', 'error');
    return;
  }
  
  if (SelectDate<=CurrentDate) {
    window.notify('Please select a future date', 'error');
    return;
  }

  
  if (title.length < 3) {
    window.notify('Event title should be at least 3 characters long', 'info');
    return;
  }

  if (!location) {
    window.notify('Please enter your location name', 'error');
    return;
  }

  if (location.length < 3) {
    window.notify('Event location should be at least 3 characters long', 'error');
    return;
  }

  if (!date) {
    window.notify('Please enter your date', 'error');
    return;
  }

  if (!startTime) {
    window.notify('Please enter your time', 'error');
    return;
  }

  if (!endTime) {
    window.notify('Please enter your End time', 'error');
    return;
  }

  if (!category) {
    window.notify('Please enter your category', 'error');
    return;
  }

  if (!imageFile) {
    window.notify('Please select an image', 'error');
    return;
  }

  if (imageFile.size > 1000000) {
    window.notify('Please select an image within the allowed size of 1mb', 'error');
    return;
  }

  if (!status) {
    window.notify('Please select a status', 'error');
    return;
  }
 
 

  setProcess(true);

  const storageRef = ref(storage, `user_images/${imageFile.name}`);
  await uploadBytes(storageRef, imageFile);
  const downloadURL = await getDownloadURL(storageRef);

  const formData = {
    title,
    location,
    date,
    day,
    startTime,
    endTime,
    status,
    category,
    imageUrl: downloadURL,
  };

  formData.dateCreated = serverTimestamp();
  formData.id = window.getRandomId();

  formData.createBy = {
    email: user.email,
    uid: user.uid,
  };

  createDocument(formData);
};


const createDocument = async(formData) =>
{
  setProcess(true)
try
{

  await setDoc(doc(firestore, 'Event', formData.id),formData );
  
  window.notify('Event has been Successfully Created' , 'success')
    
navigate('/eventShow')
}

catch(error)
{
  window.notify('something went wrong' , 'error')
}

setProcess(false)

}



const handleImageChange = (e) => {

  const file = e.target.files[0];
   const img = new Image();
   console.log(img)

   setImageFile(file)
};




  return (
    <>
    
    <div className="  home d-flex  justify-content-center align-items-center">

    <div className="container mt-5">
            <div className="row mt-5">
            <div className="col col-12">
                <div className="cardEvent  mt-5 col col-12  rounded-3   p-5 " >
                <h1 className="text-center text-white">Create Event</h1>
          
           
            <form onSubmit={handleSubmit} >
           <div className="row mt-3 ">
            <div className="col col-12 col-md-6 mb-3 mb-md-0 p-1 ">
            <label className='text-white'>Event Name</label>
    
  
  <input type="text" name='title' className="form-control  p-3 " placeholder="Event Name"  onChange={handleChange} />

            </div>
            <div className="col col-12 col-md-6 mb-3 mb-md-0 p-1  ">
            <label className='text-white'>Location</label>
            <input type="location" name='location' className="form-control p-3 " placeholder="Location" onChange={handleChange}  />
            </div>
        </div>
        <div className="row mt-3 ">
        <div className="col col-12 col-md-6 mb-3 mb-md-0 ">
        <label className='text-white'>Date</label>
        <input type="date" name='date' className='form-control p-3' id="date"  onChange={handleChange} />
        
            </div>
            <div className="col col-12 col-md-6 mb-3 mb-md-0 ">
        <label className='text-white'>Day</label>
      
            <select className="form-select  py-3" disabled  name='day' aria-label="Default select example" onChange={handleChange}>
            <option style={{ display: 'none'}}>{!day?'Select a day':day}</option>
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
       
        <div className="row mt-3 ">
           
            <div className="col col-12 col-md-6  p-1 ">
            <label className='text-white'>Start Time</label>
            <input type="time" name='startTime' className="form-control p-3"  onChange={handleChange}  />
            </div>
            <div className="col col-12 col-md-6  p-1 ">
              <label className='text-white'>End Time</label>
            <input type="time" name='endTime' className="form-control p-3  " placeholder="time" onChange={handleChange}  />
            </div>
        </div>
        
        <div className="row mt-3 ">
        <div className="col col-12 col-md-6  mb-3 mb-md-0 p-1">
            <label className='text-white'>Status</label>
            <select className="form-select  py-3"  name='status' aria-label="Default select example" onChange={handleChange}>
  <option value='Active Event'>Active Event</option>
        <option value='InActive Event'>InActive Event</option>
    
</select>
            </div>

            <div className="col col-12 col-md-6  mb-3 mb-md-0 p-1">
            <label className='text-white'>Category</label>
        <input type="text" name='category' className="form-control  p-3" placeholder="Category" onChange={handleChange}  />
            </div>
         
        </div>
        <div className="row mt-3 ">
            <div className="col col-12  mb-3 mb-md-0 p-1">
            <label className='text-white'>Upload an image with width: 1280px and height: 850px</label>
  <input type="file" name="image"className="form-control p-2"  accept="image/jpeg, image/png, image/gif" onChange={handleImageChange}

/>

            </div>
         
        </div>
       
   
              <div className="row">
                <div className="col-12 col-md-6 offset-md-3 mt-5"  >
                    <div className="d-grid gap-2">
                    <button 
  className='btn btn-info'
  disabled={ process } onClick={()=>handleClick(4)}
>
  {process ? (
    <div className='spinner-border spinner-border-sm'></div>
  ) : (
    'Add Event'
  )}
</button>
                      </div>
                </div>
            </div>
              </form>
          
            </div> 
        </div> 
    </div>
    </div>

   
    </div>
    
    </>
  )
}