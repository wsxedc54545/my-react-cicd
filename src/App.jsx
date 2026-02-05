import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

const apiUrl = import.meta.env.VITE_API_URL;
console.log("Fetching from:", apiUrl);

// 封裝 API 請求邏輯
const fetchTestData = async (url, id) => {
  const response = await fetch(`${url}/${id}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json(); // 直接在這裡轉成 JSON
};

function App() {
  const [count, setCount] = useState(0);
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(false); // 額外增加載入狀態，體驗更好

  // 定義一個刷新資料的函式
  const handleRefreshData = () => {
    setLoading(true);
    fetchTestData(apiUrl, count)
      .then(data => {
        console.log("Data refreshed:", data);
        setTestData(data);
      })
      .catch(error => {
        console.error("Fetch error:", error);
        setTestData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 1. 畫面載入時執行一次
  useEffect(() => {
    handleRefreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 保持空陣列，代表只在 mount 時執行

  return (
    <>
      <h1>API 測試工具</h1>
      
      <div className="card">
        <h3>1. 修改 ID (Count)</h3>
        {/* 這個按鈕只負責增加 ID，不觸發 API */}
        <button onClick={() => setCount((prev) => prev + 1)}>
          ID 現為: {count} (點擊增加)
        </button>
      </div>

      <div className="card">
        <h3>2. API 互動區</h3>
        {/* 這個按鈕負責抓取目前的 count 並執行 API */}
        <button onClick={handleRefreshData}>
          {loading ? '載入中...' : `取得 ID 為 ${count} 的資料`}
        </button>

        {testData ? (
          <div style={{ textAlign: 'left', marginTop: '10px' }}>
            <h4>最新資料 / ID: {count}</h4>
            <pre>
              {JSON.stringify(testData, null, 2)}
            </pre>
          </div>
        ) : (
          <p>目前沒有資料(或載入錯誤)</p>
        )}
      </div>
    </>
  );
}

export default App
