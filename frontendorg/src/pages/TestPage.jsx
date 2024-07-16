import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Toast notifications
import { useParams, Link } from 'react-router-dom';
import '../css/TestPage.css'; // Import CSS file for styling

const TestPage = () => {
    const [selectedOption, setSelectedOption] = useState('story');
    const [result, setResult] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const [text, setText] = useState('माझं नाव राजू आहे.'); // Initial text
    const [language, setLanguage] = useState('Hindi'); // Default language
    const [level, setLevel] = useState(4); // Default level
    const fileInputRef = useRef(null);
    const { id } = useParams();

    useEffect(() => {
        fetchTestText(); // Fetch test text when component mounts or when language/level changes
    }, [language, level]); // Dependencies: language and level
    
    const fetchTestText = async () => {
        try {
            const response = await axios.post('/test', {
                level,
                langType: language
            });

            setText(response.data); // Set the fetched text to the state
        } catch (error) {
            console.error('Error fetching test text:', error);
            // Handle error (e.g., show a toast notification)
            toast.error('Failed to fetch test text. Please try again.');
        }
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();

        const file = fileInputRef.current.files[0];
        if (!file) {
            console.error('No file selected!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('language', language);
        formData.append('text', text);

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Upload failed with status ${response.status}`);
            }

            const data = await response.json();
            console.log('Upload response:', data);

            try {
                const r = await fetch('http://localhost:5000/grade', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        reference_text: text,
                        language
                    })
                });

                if (!r.ok) {
                    throw new Error(`Error while grading`);
                }

                const d = await r.json();
                console.log('Grading response:', d);

                if (d.Message === 'Pass') {
                    toast.success('Passed');
                    updateStudentLevel(); // Call function to update student level
                } else {
                    setLevel(lev => lev-1);
                    toast.error('Failed');
                }

            } catch (error) {
                console.error('Error uploading file:', error);
            }

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleLevelChange = (e) => {
        setLevel(e.target.value);
    };

    const updateStudentLevel = async () => {
        try {
            const response = await axios.post('/changeStudentLevel', {
                studentId: id, // Assuming id is the student's ID you want to update
                newLevel: parseInt(level)  // Example: Increase level by 1
            });

            console.log('Updated student level:', response.data);
            // Optionally update state or handle success
        } catch (error) {
            console.error('Error updating student level:', error);
            // Handle error (e.g., show a toast notification)
            toast.error('Failed to update student level. Please try again.');
        }
    };

    return (
        <div className="TestPage">
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <div className="header">
                <Link to="/students" className="back-btn">Back</Link>
                
            </div>
            <h1>TEST</h1>
            {/* Language and Level Dropdowns */}
            <div className="dropdowns">
                <div>
                    <label htmlFor="languageSelect">Select Language: </label>
                    <select id="languageSelect" value={language} onChange={handleLanguageChange}>
                        <option value="Hindi">Hindi</option>
                        <option value="English">English</option>
                        {/* Add more language options as needed */}
                    </select>

                    <label htmlFor="levelSelect">Select Level: </label>
                    <select id="levelSelect" value={level} onChange={handleLevelChange}>
                        <option value={1}>Level 1</option>
                        <option value={2}>Level 2</option>
                        <option value={3}>Level 3</option>
                        <option value={4}>Level 4</option>
                        {/* Add more level options as needed */}
                    </select>
                
                </div>
                
            </div>
            
            <div className="form">
                <form id="uploadForm" onSubmit={handleFileUpload}>
                    
                    <textarea
                        value={text}
                        style={{ height: '200px', width: '500px', fontSize: '18px' }}
                        readOnly // Use readOnly instead of contentEditable
                    />

                    <br />
                    Select File:
                    <input type="file" id="myFile" name="filename" ref={fileInputRef} />
                    <input type="submit" value="Upload" />
                </form>
            </div>

            {/* Display result and percentage */}
            {result && (
                <p>{result}, {percentage}</p>
            )}
        </div>
    );
};

export default TestPage;
