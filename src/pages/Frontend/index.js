import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from './About/About'
import EventPage from './EventPage/EventPage'
import EventShow from './EventShow/EventShow'
import Home from './Home/Home'
import Header from './Components/Header'
import Footer from './Components/Footer/Footer'
import PublicEvents from './PublicEvent'
import NoPage from '../NoPage'
import JoinedEvents from './JoinEvent'
import MyJoin from './MyJoinEvents/MyJoin'

export default function index() {
  return (
    <>
    
    <Header/>

<main>

    <Routes>

<Route path='/'>


<Route index element={<Home/>}/>
<Route path='about' element={<About/>}/>
<Route path='eventPage' element={<EventPage/>}/>
<Route path='eventShow' element={<EventShow/>}/>
<Route path='publicEvent' element={<PublicEvents/>}/>
<Route path='joinedEvent' element={<JoinedEvents/>}/>
<Route path='myjoinEvents' element={<MyJoin/>}/>

<Route path='*' element={<NoPage/>}/>

</Route>



    </Routes>
    
</main>
    
  

    </>
  )
}
