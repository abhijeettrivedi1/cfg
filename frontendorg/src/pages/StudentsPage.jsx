import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import '../css/StudentPage.css'; // Import the CSS file

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [error, setError] = useState('');
  const [filterLevel, setFilterLevel] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/teacherHome', { withCredentials: true });
        setStudents(response.data);
        setFilteredStudents(response.data); // Initially set filtered students to all students
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch students data. Please try again later.');
      }
    };

    fetchStudents();
  }, []);

  const handleTakeTest = (studentId) => {
    navigate(`/test/${studentId}`);
  };

  const handleFilterChange = (e) => {
    const level = parseInt(e.target.value);
    setFilterLevel(level);

    // Filter students based on the selected level
    if (level === 0) {
      setFilteredStudents(students); // Reset to all students
    } else {
      const filtered = students.filter(student => student.level === level);
      setFilteredStudents(filtered);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="student-page">
      <div className="header">
        <NavLink to="/">
          <button className="home-btn">Back</button>
        </NavLink>
        <NavLink to="/createstudent">
          <button className="add-student-btn">Add Student</button>
        </NavLink>
      </div>
      <div className="filter-section">
        <label htmlFor="levelFilter">Filter by Level:</label>
        <select id="levelFilter" value={filterLevel} onChange={handleFilterChange}>
          <option value={0}>All Levels</option>
          <option value={1}>Level 1</option>
          <option value={2}>Level 2</option>
          <option value={3}>Level 3</option>
          <option value={4}>Level 4</option>
        </select>
      </div>
      <h1>Students</h1>
      <table className="student-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Level</th>
            <th>Standard</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student._id}>
              <td>{student.studentRollNo}</td>
              <td className={student.level!=4 &&student.level < student.standard ? 'level-less-than-standard' : ''}>{student.level}</td>
              <td>{student.standard}</td>
              <td>
                <button onClick={() => handleTakeTest(student._id)} className="take-test-btn">Take Test</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentPage;
