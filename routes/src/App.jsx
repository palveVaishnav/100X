// import { useState } from 'react'

import {BrowserRouter,Routes, Route,useNavigate} from 'react-router-dom'
// import Landing from './components/Landing'
// import Dashboard from './components/Dashboard'
import { lazy, Suspense } from 'react'

const Landing = lazy(()=> import('./components/Landing'))
const Dashboard = lazy(()=> import('./components/Dashboard'))

function App() {
  return (
    <div>
        
        <BrowserRouter>
            <Topbar />
            <Routes>
                <Route path="/" element={
                  <Suspense fallback={"Loding Landing......"}> 
                    <Landing /> 
                  </Suspense>}>
                </Route>
                <Route path="dashboard" element={
                  <Suspense fallback={"Loading Dashboard ..."}>
                    <Dashboard/>
                  </Suspense>}>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

function Topbar(){
  const navigate = useNavigate();
  return(
    <div style={{padding:".5em", border:"2px solid"}}>
        <div>
            instead of using window.location.href we are using useNavigate() from react-router-dom in this topbar
        </div>
        <button onClick={()=>{
            navigate("/")
        }              
        }>Landing </button>
        <button onClick={()=>{
          navigate("/dashboard")
        }}>Dashboard</button>
    </div>
  )
}


export default App
