import React, { useContext } from 'react';
import { Usercontext } from '../usercontext';
import axios from 'axios';
import '../css/IndexPage.css'; // Import your CSS file for styling
import { Navigate, NavLink } from 'react-router-dom';
const IndexPage = () => {
    const { user, setUser } = useContext(Usercontext);

    // Function to handle logout
    async function logout() {
        await axios.get("/logoutTeacher");
        setUser(null);
    }

    if(!user) {
        return (
            <Navigate to="/login"/>
            
        )
    }


    return (
        <div className="index-page">


            <div className="image-section">
                <img src="/dash.jpeg" alt="Dashboard Image" />
                <div >
                    <h1>Welcome to Your Dashboard</h1>
                    {user && <p>Logged in as: {user.teacherId}</p>}
                    {user && <button onClick={logout}>Logout</button>}
                    <p>Empower your teaching with our innovative platform designed 
                        to elevate student success. Access personalized tools, manage
                         classroom activities seamlessly, and connect with a community 
                         of educators to inspire and guide your students effectively</p>
                </div>

            </div>

            <div className="content-section">
                <div>
                    <h1>Manage Your Students</h1>
                    <p>View and manage your students' information.</p>
                    <NavLink to="/students">
                        <button>Students</button>
                    </NavLink>
                </div>

                <img src="/student.webp" alt="Student Image" />
            </div>
        </div>
    );
}

export default IndexPage;
