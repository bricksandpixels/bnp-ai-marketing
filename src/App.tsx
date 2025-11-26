import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import ServicePage from './components/ServicePage'
import LoadingScreen from './components/LoadingScreen'
import { Suspense } from 'react'

function App() {

  return (
    <div className={`flex h-full w-full justify-center items-center bg-linear-to-b from-0% via-55% to-100% from-g1 to-g2 no-select`}>
      <div className="absolute h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[1.5rem_1.5rem] opacity-3"></div>
      <div
        className='w-screen h-dvh z-10 overflow-y-auto overflow-x-hidden bg-dark/50'>
        <Suspense fallback={<div className='w-screen h-screen'><LoadingScreen isLoading={true} /></div>}>
          <Routes>
            <Route path={"/"} element={<Navigate to="/elevation-to-render" />} />
            <Route path={"/:service"} element={<ServicePage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App
