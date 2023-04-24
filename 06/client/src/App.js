import './App.css'
import { Routes, Route } from "react-router-dom"
import Layout from './pages/Layout'
import Swap from './pages/Swap'
import Pool from './pages/Pool'

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Swap/>}/>
            <Route path="pool" element={<Pool/>}/>
            <Route path="*" element={<Swap/>}/>
          </Route>
        </Routes>
      </div>
  );
}

export default App;