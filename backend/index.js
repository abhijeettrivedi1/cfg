const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bcryptsalt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken")
const jwtSecret =process.env.JWT_SECRET_KEY;


const cookieParser = require("cookie-parser");
app.use(express.json())
app.use(cookieParser())
const Student = require('./models/student');
const Teacher = require('./models/teacher');
const Test = require('./models/test')
              // CORS setup
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173",
}));
mongoose.connect(process.env.mongo_uri)
  .then(() => console.log('Connected to Mongo'))
  .catch((err) => console.log(err));

app.get("/teacherHome/:id", (req, res) => {
  const tid = req.params.id;
  console.log(tid, "reached in get method");
  Student.find({ teachers: tid }).then((result) => {
    console.log(result), res.json(result);
  });
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, async (err, userdata) => {
      console.log(userdata);
      if (err) {
        res.status(422).json(err);
      } else {
        try {
          const { teacherId } = await Teacher.findOne({teacherId:userdata.id}); // Fix here
          console.log("hello")
          res.json({ teacherId});
        } catch (error) {
          res.status(422).json(error);
        }
      }
    });
  } else {
    res.json(null);
  }
});

//registering a teacher on the database
app.post("/registerTeacher", async (req, res) => {
  const { teacherId, subject, password } = req.body;
  try {
    const teacherDoc = await Teacher.create({
      teacherId,
      subject,
      password: bcrypt.hashSync(password, bcryptsalt),
    });
    res.json(teacherDoc);
  } catch (e) {
    console.log(e);
    res.status(422).json(e);
  }
});

//function for logout
app.get("/logoutTeacher", (req, res) => {
  console.log("here");
  //  res.cookie('token' , '',{maxAge:1})
  // res.redirect('/loginTeacher')
  res.cookie("token", "").json(true);
});

// rendering all the students registered under a teacher, accross different standards(classes)
app.get("/teacherHome", (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    // res.redirect("/loginTeacher");
    console.log("No token")
  } else {
    jwt.verify(token, jwtSecret, (error, decodedToken) => {
      const tid = decodedToken.id;
      //console.log(decodedToken.id)
      // console.log(typeof(JSON.stringify(decodedToken.id)))
      //const tid = req.body.tid;
      //   console.log(typeof(tid))
      //  console.log(tid)
      Student.find({ teachers: tid }).then((result) => {
        console.log(result), res.json(result);
      });
    });
  }
});

//loging in a teacher
app.post("/loginTeacher", async (req, res) => {
  const { teacherId, password } = req.body;
  console.log(teacherId, password, "Hi");
  const teacherDoc = await Teacher.findOne({ teacherId });
  if (!teacherDoc) {
    res.status(422).json("Invalid Credentials");
  } else {
    if (bcrypt.compareSync(password, teacherDoc.password)) {
      jwt.sign({ id: teacherDoc.teacherId }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        else {
          console.log("at login");
          res
            .cookie("token", token, {
              domain: "localhost",
            })
            .json(teacherId);
          console.log("at login 2");
        }
      });
    } else {
      res.status(422).json("Invalid Credentials");
    }
  }
});

//creating a student, this will be accessed by a teacher
app.post("/createstud", async (req, res) => {
  const { studentRollNo, level, standard } = req.body;
  console.log(studentRollNo, level, standard);
  const studDoc = await Student.findOne({ studentRollNo });
  if (studDoc) {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, async (err, userdata) => {
        if (err) {
          res.status(422).json(err);
        } else {
          console.log("else");
          try {
            const matchingTeacherID = studDoc.teachers.find(
              (teacherID) => teacherID === userdata.id
            );
            if (matchingTeacherID) {
              console.log("student present");
              res.json({ message: "Student already created" });
            } else {
              console.log("student absent");
              studDoc.teachers.push(userdata.id);
              await studDoc.save();
              res.json(studDoc);
            }
          } catch (error) {
            res.status(422).json(error);
          }
        }
      });
    } else {
      res.json(null);
    }
  } else {
    try {
      const { token } = req.cookies;
      if (token) {
        jwt.verify(token, jwtSecret, async (err, userdata) => {
          if (err) {
            res.status(422).json(err);
          } else {
            try {
              const stuDoc = await Student.create({
                studentRollNo,
                level,
                standard,
                teachers: [userdata.id],
              });
              res.json(stuDoc);
            } catch (error) {
              console.log("error is abhjeet");
              console.log(error);
              res.status(422).json(error);
            }
          }
        });
      } else {
        res.json("null");
      }
    } catch (e) {
      console.log(e);
      res.status(422).json(e);
    }
  }
});

// creating a test, this will also be accessed by a teacher

app.post("/createTest", async (req, res) => {
  const { level, langType, referenceText } = req.body;
  const testLev = await Test.findOne({ level, langType });
  if (testLev) {
    testLev.referenceText.push(referenceText);
    await testLev.save();
    res.json(testLev);
  } else {
    const newTest = new Test({
      langType,
      level,
      referenceText,
    });
    newTest
      .save()
      .then(res.json(newTest))
      .catch((err) => {
        console.log(err);
      });
  }
});

//this route will be used to fetch a test paragraph to the frontend, on which evaluation will be done
app.post("/test", async (req, res) => {
  const { level, langType } = req.body;
  console.log(level, langType, "Hi");
  try {
    const testDoc = await Test.findOne({ level, langType });
    const testArry = testDoc.referenceText;
    const size = testArry.length;
    console.log(size, "size");
    if (!size) {
      res.status(422).json("No test available");
      return;
    } else {
      const random = Math.floor(Math.random() * size);
      const test = testArry[random];
      res.json(test);
    }
  } catch (e) {
    console.log(e);
    res.status(422).json(e);
  }
});

app.post("/changeStudentLevel", (req, res) => {
  const { studentId, newLevel } = req.body;

  // Verify JWT token
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, jwtSecret, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find student by ID and update level
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        { $set: { level: newLevel } },
        { new: true }
      );

      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.json(updatedStudent);
    } catch (error) {
      console.error("Error updating student level:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
