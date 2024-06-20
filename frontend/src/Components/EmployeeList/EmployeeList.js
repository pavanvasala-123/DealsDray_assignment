import React, { useState, useEffect } from 'react';
import './EmployeeList.css';
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import  { setEditemployee ,setEmployeeId} from '../../Store/Features/editemployee';


function EmployeeList() {
  const navigate = useNavigate()
  const showEdit = useSelector((store)=>store.edit.isEdit)
  const dispatch = useDispatch()
 
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    fetchEmployees();
  }, [search, currentPage]); // Reload data on search or page change

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/get-employees?search=${search}&page=${currentPage}&limit=10`
      );
      const data = await response.json();
      setEmployees(data.employees);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch employees', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (id) => {
    // Implement edit functionality
    navigate('/create-employee')
    dispatch(setEditemployee(showEdit))
    dispatch(setEmployeeId(id))
    console.log(`Edit employee with id: ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/delete-employee/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setEmployees(employees.filter((employee) => employee._id !== id));
      } else {
        console.error('Failed to delete employee');
      }
    } catch (error) {
      console.error('Failed to delete employee', error);
    }
  };

  return (
    <div className="employee-list-container">
      <h1>Employee List</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Courses</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course.join(', ')}</td>
                <td>
                  {employee.img && (
                    <img src={`http://localhost:3000/${employee.img}`} alt={employee.name} />
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(employee._id)}>Edit</button>
                  <button onClick={() => handleDelete(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() =>
            handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default EmployeeList;

