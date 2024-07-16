// src/components/charts/PieChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ students }) => {
    // Calculate data for the pie chart (example data)
    const levelCounts = {};
    students.forEach(student => {
        const level = student.level;
        if (levelCounts[level]) {
            levelCounts[level]++;
        } else {
            levelCounts[level] = 1;
        }
    });

    const data = {
        labels: Object.keys(levelCounts),
        datasets: [{
            data: Object.values(levelCounts),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
            ],
        }],
    };

    return (
        <div className="pie-chart">
            <h2>Student Distribution by Level</h2>
            <Pie data={data} />
        </div>
    );
};

export default PieChart;
