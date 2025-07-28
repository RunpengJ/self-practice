import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CrewmateList from './components/CrewmateList'
import CrewmateForm from './components/CrewmateForm'
import CrewmateDetail from './components/CrewmateDetail'
import Layout from './components/Layout'
import './index.css'
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CrewmateList />} />
          <Route path="/create" element={<CrewmateForm />} />
          <Route path="/edit/:id" element={<CrewmateForm />} />
          <Route path="/crewmates/:id" element={<CrewmateDetail />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App