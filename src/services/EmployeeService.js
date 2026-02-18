class EmployeeService {
  constructor() {
    this.db = []; // acting as my temporary database storage
  }

  // adding a new employee to the list
  create(emp) {
    this.db.push(emp);
    return emp;
  }

  // fetching all the employees currently in the db
  getAll() {
    return this.db;
  }

  // finding a specific employee using their unique id
  getById(id) {
    return this.db.find(e => e.id === id);
  }

  // updating the daily rate for an employee if they exist
  updateRate(id, newRate) {
    const emp = this.db.find(e => e.id === id);
    if (emp) {
      emp.dailyRate = parseFloat(newRate);
      return emp;
    }
    return null; // returning null if the employee wasn't found
  }

  // removing an employee from the array based on id
  delete(id) {
    this.db = this.db.filter(e => e.id !== id);
  }
}

export default new EmployeeService();