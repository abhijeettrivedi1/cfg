import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ProductCard from '../product-card';
import UserPage from '../../user/view/user-view';

export default function ProductsView() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/teacherHome/Teacher02'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setStudents(data); // Assuming API response is an array of students
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  // Initialize an object to hold unique standards with their respective student counts
  const stdCounts = {};

  // Count students for each standard
  students.forEach(student => {
    const { standard } = student;
    if (!stdCounts[standard]) {
      stdCounts[standard] = 0;
    }
    stdCounts[standard]++;
  });

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Standard 
      </Typography>

      <Grid container spacing={3}>
        {/* {Object.entries(stdCounts).map(([std, numberOfStudents]) => ( */}
          <Grid item xs={12} sm={6} md={3}>
            <UserPage />
          </Grid>
        {/* ))} */}
      </Grid>
    </Container>
  );
}
