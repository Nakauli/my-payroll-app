import React from 'react';
import MonolithicPayroll from './components/MonolithicPayroll';
import MicroservicesPayroll from './components/MicroservicesPayroll';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>System Architecture Activity</h1>
      <MonolithicPayroll />
      <div style={{height: '40px'}}></div>
      <MicroservicesPayroll />
    </div>
  );
}
export default App;