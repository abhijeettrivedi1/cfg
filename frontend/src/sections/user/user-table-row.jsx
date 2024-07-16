import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import { useRouter } from 'src/routes/hooks';

export default function UserTableRow({
  rollNo,
  level,
}) {
  const [levelValue, setLevelValue] = useState(level || 'paragraph');
  const router = useRouter();
  const [referenceText, setReferenceText] = useState("");

  const handleChange = (event) => {
    setLevelValue(event.target.value);
  };

  const handleTestClick = async (e) => {
    try {
      const response = await fetch("http://localhost:3000/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials in the request
        body: JSON.stringify({ level: "3", langType: "M" }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reference text");
      }
      const data = await response.json();
      setReferenceText(data); // Assuming your API response has a field 'referenceText'
      router.push(`/exam/${e.id ? e.id : 1}`)
      console.log("Fetched reference text:", data); // Log the fetched data
    } catch (error) {
      console.error("Error fetching reference text:", error);
      setReferenceText("Error"); // Placeholder or error handling
    }
  };

  return (
    <TableRow hover tabIndex={-1}>
      <TableCell sx={{ paddingLeft: 5 }}>{rollNo}</TableCell>
      <TableCell>{level}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          onClick={handleTestClick}
          sx={{ ml: 20 }} // Add left margin for the button
        >
          Take Test
        </Button>
      </TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  rollNo: PropTypes.string.isRequired,
  levelId: PropTypes.string.isRequired,
};
