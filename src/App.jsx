import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const apiUrl = import.meta.env.VITE_API_URL;
console.log("Fetching from:", apiUrl);

// 1. Define the function BEFORE you call it
const fetchTestData = async (url) => {
  const response = await fetch(`${url}/`); // Adjust endpoint as needed
  if (!response.ok) throw new Error('Network response was not ok');
  return response;
};

// 2. This call now works because the function is defined above
fetchTestData(apiUrl)
  .then(response => response.json())
  .then(data => console.log("Initial fetch:", data))
  .catch(error => console.error("Initial fetch error:", error));

function App() {
  const [count, setCount] = useState(0)
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    fetchTestData(apiUrl)
      .then(response => response.json())
      .then(data => setTestData(data))
      .catch(error => console.error("Effect fetch error:", error));
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Test</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        {testData && (
          <div>
            <h2>Test Data</h2>
            <pre>{JSON.stringify(testData, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  )
}

export default App
