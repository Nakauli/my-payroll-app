import React, { useState } from 'react';

const MonolithicPayroll = () => {
  // state to hold the list of employees (acting as our database)
  const [employees, setEmployees] = useState([]);
  
  // state for handling form inputs and the final calculation result
  const [formData, setFormData] = useState({ id: '', name: '', dailyRate: '' });
  const [payrollResult, setPayrollResult] = useState(null);

  // --- CRUD Operations for Task A2 ---

  // function to add a new employee to the list
  const handleCreateEmployee = (e) => {
    e.preventDefault();
    // checking if all fields are filled before proceeding
    if (!formData.id || !formData.name || !formData.dailyRate) return;
    
    const newEmp = { 
      id: formData.id, 
      name: formData.name, 
      dailyRate: parseFloat(formData.dailyRate) 
    };
    
    // adding the new employee to the existing state array
    setEmployees([...employees, newEmp]);
    setFormData({ id: '', name: '', dailyRate: '' }); // clearing the form
    alert(`Created Employee: ID ${newEmp.id}, ${newEmp.name}`);
  };

  // Note: Reading employees happens in the render loop below using .map()

  // updating the daily rate of an existing employee
  const handleUpdateRate = (id) => {
    const newRate = prompt("Enter new daily rate:");
    if (newRate) {
      // finding the specific employee and updating their rate
      setEmployees(employees.map(emp => 
        emp.id === id ? { ...emp, dailyRate: parseFloat(newRate) } : emp
      ));
    }
  };

  // removing an employee from the list based on their ID
  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  // --- Payroll Calculation for Task A3 ---
  
  const computePayroll = (empId) => {
    const employee = employees.find(e => e.id === empId);
    if (!employee) return;

    // calculating gross pay assuming a fixed 22 working days
    const daysWorked = 22; 
    const grossPay = employee.dailyRate * daysWorked;
    
    // deducting 10% tax from the gross pay
    const tax = grossPay * 0.10;
    
    // final net pay calculation
    const netPay = grossPay - tax;

    setPayrollResult({ name: employee.name, grossPay, tax, netPay });
  };

  return (
    <div style={{ border: '2px solid #333', padding: '20px', marginBottom: '40px', borderRadius: '8px' }}>
      <h2>Part A: Monolithic Payroll System</h2>
      
      {/* form input section */}
      <form onSubmit={handleCreateEmployee} style={{ marginBottom: '20px' }}>
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
          placeholder="Daily Rate" 
          type="number"
          value={formData.dailyRate} 
          onChange={e => setFormData({...formData, dailyRate: e.target.value})} 
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Create Employee</button>
      </form>

      {/* displaying the list of employees */}
      <ul>
        {employees.map(emp => (
          <li key={emp.id} style={{ marginBottom: '10px', padding: '10px', borderBottom: '1px solid #ccc' }}>
            <strong>{emp.name}</strong> (ID: {emp.id}) - Rate: {emp.dailyRate}
            <br/>
            
            {/* buttons for update, compute, and delete actions */}
            <button onClick={() => handleUpdateRate(emp.id)} style={{ marginRight: '5px', marginTop: '5px' }}>
              Update Rate
            </button>

            <button onClick={() => computePayroll(emp.id)} style={{ marginRight: '5px', marginTop: '5px' }}>
              Compute Payroll
            </button>

            <button onClick={() => handleDelete(emp.id)} style={{ color: 'red', marginTop: '5px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* showing the payroll calculation result */}
      {payrollResult && (
        <div style={{ 
            backgroundColor: '#f0f0f0', 
            padding: '15px', 
            marginTop: '20px', 
            border: '1px solid #999',
            color: 'black' /* making sure text is readable on light background */
        }}>
          <h4>Payroll Result for {payrollResult.name}:</h4>
          <p>Gross Pay: {payrollResult.grossPay}</p>
          <p>Tax (10%): {payrollResult.tax}</p>
          <p><strong>Net Pay: {payrollResult.netPay}</strong></p>
        </div>
      )}
    </div>
  );
};

export default MonolithicPayroll;