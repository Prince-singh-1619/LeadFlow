import './App.css'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import LeadForm from './pages/LeadForm';
import LeadList from './pages/LeadList';

function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<LeadForm/>}/>
        <Route path='/lead-list' element={<LeadList/>}/>
      </Routes>
    </Router>
  )
}

export default App
