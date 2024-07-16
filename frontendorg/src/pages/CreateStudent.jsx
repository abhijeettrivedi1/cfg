import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Toast notifications
import '../css/CreateStudent.css'; // Import CSS file for styling

const CreateStudent = () => {
    const [studentRollNo, setStudentRollNo] = useState('');
    const [level, setLevel] = useState(1); // Default level
    const [standard, setStandard] = useState('');
    const [message, setMessage] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/createstud', {
                studentRollNo,
                level,
                standard,
            });

            if (response.data.message === 'Student already created') {
                toast.error('Student already created');
            } else {
                toast.success('Student created successfully');
                setStudentRollNo('');
                setLevel(1);
                setStandard('');
            }
        } catch (error) {
            console.error('Error creating student:', error);
            toast.error('Failed to create student. Please try again.');
        }
    };

    const handleLevelChange = (e) => {
        setLevel(parseInt(e.target.value));
    };

    return (
        <div className="form-container">
            <Toaster position="bottom-center" reverseOrder={false} />
            <h2>Create Student</h2>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="studentRollNo">Student Roll No:</label>
                <input
                    type="text"
                    id="studentRollNo"
                    value={studentRollNo}
                    onChange={(e) => setStudentRollNo(e.target.value)}
                    required
                />
                <br />

                <label htmlFor="level">Level:</label>
                <select id="level" value={level} onChange={handleLevelChange}>
                    <option value={1}>Level 1</option>
                    <option value={2}>Level 2</option>
                    <option value={3}>Level 3</option>
                    <option value={4}>Level 4</option>
                    {/* Add more options as needed */}
                </select>
                <br />

                <label htmlFor="standard">Standard:</label>
                <input
                    type="text"
                    id="standard"
                    value={standard}
                    onChange={(e) => setStandard(e.target.value)}
                    required
                />
                <br />

                <button type="submit" className="create-student-btn">Create Student</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateStudent;
