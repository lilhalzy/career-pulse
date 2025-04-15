import { useEffect } from 'react';
import './App.css';

const apiUrl = import.meta.env.VITE_API_URL;
const appName = import.meta.env.VITE_API_NAME;

function App() {
  useEffect(() => {
    console.log('API URL in useEffect:', apiUrl)
  }, []);

  return (
   <div className="App">
    <h1>{appName}</h1>
    <p>API Base: {apiUrl}</p>
   </div> 
  )
}

export default App