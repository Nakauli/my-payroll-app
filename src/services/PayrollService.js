class PayrollService {
  // logic for computing the pay, separated from the employee data
  calculate(employeeData, daysWorked) {
    // simple check to make sure we have valid data first
    if (!employeeData) return null;

    // calculating the basic gross pay
    const gross = employeeData.dailyRate * daysWorked;
    
    // deducting the 10% tax
    const tax = gross * 0.10;
    
    // getting the final net pay after deductions
    const net = gross - tax;

    // returning the calculated values as an object
    return { employee: employeeData.name, gross, tax, net };
  }
}
export default new PayrollService();