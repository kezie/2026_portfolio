import { useState } from 'react'

import heroImg from './assets/hero.png'
import './App.css'

//My imports
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import PageNotFound from './lib/PageNotFound';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';


function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
   
  )
}

export default App
