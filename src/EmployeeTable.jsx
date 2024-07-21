import React, { useState, useEffect } from "react";
import "./EmployeeTable.css"; // Import the CSS file

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const employeesPerPage = 10;

  useEffect(() => {
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setEmployees(data))
      .catch((error) => setError("failed to fetch data"));
  }, []);

  const handleClickNext = () => {
    if (currentPage * employeesPerPage < employees.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  return (
    <div className="employee-table-container">
      <h1>Employee Data Table</h1>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handleClickPrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={handleClickNext} disabled={indexOfLastEmployee >= employees.length}>
          Next
        </button>
      </div>
    </div>
  );
}

export default EmployeeTable;
