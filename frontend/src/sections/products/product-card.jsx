import React from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ std, numberOfStudents }) => {
  return (
    <Link to="/user" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card className="card-style">
        <CardContent>
          <Typography className="title">Standard: {std}</Typography>
          <Typography className="text">Students: {numberOfStudents}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ProductCard;
