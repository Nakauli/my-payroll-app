import React, { useState } from 'react';
// Make sure these paths match where you put the files!
import empService from '../services/EmployeeService'; 
import payrollService from '../services/PayrollService'; 

const MicroservicesPayroll = () => {
  const [displayList, setDisplayList] = useState([]); 
  const [payrollData, setPayrollData] = useState(null);
  const [formData, setFormData] = useState({ id: '', name: '', dailyRate: '' });

  // handling the creation of a new employee using the service
  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.name || !formData.dailyRate) return;

    const newEmp = { 
      id: formData.id, 
      name: formData.name, 
      dailyRate: parseFloat(formData.dailyRate) 
    };
    
    // sending the new data to the employee service
    empService.create(newEmp);
    refreshList(); 
    setFormData({ id: '', name: '', dailyRate: '' });
  };

  // function to fetch the latest list of employees from the service
  const refreshList = () => {
    // spreading into a new array so react detects the update
    setDisplayList([...empService.getAll()]);
  };

  // updating the daily rate of an employee
  const handleUpdate = (id) => {
    const newRate = prompt("Enter new daily rate:");
    if (newRate) {
      empService.updateRate(id, newRate);
      refreshList();
    }
  };

  // deleting an employee record via the service
  const handleDelete = (id) => {
    empService.delete(id);
    refreshList();
  };

  // coordinating between the two services to calculate payroll
  const handleProcessPayroll = (id) => {
    // step 1: getting the employee details first
    const empData = empService.getById(id);

    if (empData) {
      // step 2: passing that data to the payroll service for the math
      const result = payrollService.calculate(empData, 22); // assuming 22 days worked
      setPayrollData(result);
    }
  };

  return (
    <div style={{ border: '2px solid #007bff', padding: '20px', borderRadius: '8px' }}>
      <h2 style={{color: '#0056b3'}}>Part B: Microservices Payroll</h2>
      <p style={{ color: '#555' }}><em>Services are logically separated. UI acts as the Gateway.</em></p>

      {/* form for adding new employees */}
      <form onSubmit={handleAdd} style={{ marginBottom: '20px' }}>
        <input 
          placeholder="ID" 
          value={formData.id} 
          onChange={e => setFormData({...formData, id: e.target.value})} 
          style={{ marginRight: '10px' }}
        />
        <input 
          placeholder="Name" 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})} 
          style={{ marginRight: '10px' }}
        />
        <input 
          placeholder="Rate" 
          type="number"
          value={formData.dailyRate} 
          onChange={e => setFormData({...formData, dailyRate: e.target.value})} 
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Add via Service</button>
      </form>

      {/* displaying the list of employees */}
      <ul>
        {displayList.map(emp => (
          <li key={emp.id} style={{ marginBottom: '10px', padding: '10px', borderBottom: '1px solid #ccc' }}>
            <strong>{emp.name}</strong> (ID: {emp.id}) - Rate: {emp.dailyRate}
            <br/>
            
            <button onClick={() => handleUpdate(emp.id)} style={{ marginRight: '5px', marginTop: '5px' }}>
              Update Rate
            </button>

            <button onClick={() => handleProcessPayroll(emp.id)} style={{ marginRight: '5px', marginTop: '5px' }}>
              Send to Payroll Svc
            </button>

            <button onClick={() => handleDelete(emp.id)} style={{ color: 'red', marginTop: '5px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* showing the calculated payroll results */}
      {payrollData && (
        <div style={{ 
            backgroundColor: '#e6f7ff', 
            padding: '15px', 
            marginTop: '20px', 
            border: '1px solid #007bff',
            borderRadius: '5px',
            color: '#000000' /* ensures text is readable */
        }}>
          <h4 style={{ color: '#0056b3', margin: '0 0 10px 0' }}>Payroll Service Response:</h4>
          <p><strong>Employee:</strong> {payrollData.employee}</p>
          <p><strong>Gross Pay:</strong> {payrollData.gross}</p>
          <p><strong>Tax (10%):</strong> {payrollData.tax}</p>
          <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#008000' }}>
            Net Pay: {payrollData.net}
          </p>
        </div>
      )}
    </div>
  );
};

export default MicroservicesPayroll;