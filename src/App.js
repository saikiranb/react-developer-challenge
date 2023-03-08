
import { ReactDOM } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Graph from './pages/Graph';
import Home from './pages/Home'
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
