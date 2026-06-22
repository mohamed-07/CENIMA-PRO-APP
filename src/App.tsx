import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MoviesPage from './pages/MoviesPage'
import TvSeriesPage from './pages/TvSeriesPage'
import MyList from './pages/MyList'
import TvSeriesDetailsPage from './pages/TvSeriesdetailsPage'
import SeasonDetailsPage from './pages/SeasonDetailsPage'
import RegisterPage from './pages/RegisterPage'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {

  return (
    <BrowserRouter>
      {/* <ScrollRestoration /> */}
      <Routes>
        {/* [1]: route for login page only */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        {/* [2]: route for main layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path='/' element={<HomePage/>} />
            <Route path='/movies' element={<MoviesPage />} />
            <Route path='/tv-shows' element={<TvSeriesPage />} />
            <Route path='/tv/:id' element={<TvSeriesDetailsPage />} />
            <Route path='/tv/:id/season/:seasonNumber' element={<SeasonDetailsPage />} />
            <Route path='/my-list' element={<MyList />} />
          </Route>
        </Route>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App


