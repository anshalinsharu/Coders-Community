const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const app = express();
const port = 8080; // Ensure this port is free

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));
//nodemailer
app.use(express.json({ limit: "25mb" }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

function sendEmail(name, email, message) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'sranshalinsharu@gmail.com',
                pass: 'sozt zmao tjei tkrx'
            }
        });
        const mail_config = {
            from: "anshalinsharu@gmail.com",
            to: email,
            subject: `Message from ${name}`,
            text: message,
        };
        transporter.sendMail(mail_config, function (error, info) {
            if (error) {
                console.log(error);
                return reject({ message: "An error occurred" });
            }
            return resolve({ message: "Email sent successfully" });
        });
    });
}

app.get("/email", (req, res) => {
    const { name, email, message } = req.query; // Assuming query params are used
    sendEmail(name, email, message)
        .then((response) => res.send(response.message))
        .catch((error) => res.status(500).send(error.message));
});

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'public/images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "db"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.post('/upload', upload.single('image'), (req, res) => {
    const { name, email } = req.body;
    const image = req.file.filename;

    const sql = "INSERT INTO users (name, email, image) VALUES (?, ?, ?)";
    db.query(sql, [name, email, image], (err, result) => {
        if (err) {
            console.error(err); // Log the error
            return res.json({ Status: "Failed", Error: err.message });
        }
        return res.json({ Status: "Success" });
    });
});

app.get('/uploads', (req, res) => {
    const sql = "SELECT name, email, image FROM users";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching uploads:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(result);
    });
});

app.post('/register', (req, res) => {
    const sql = "INSERT INTO registertable(`name`,`email`,`password`,`role`) VALUES (?)";
    const values = [req.body.name, req.body.email, req.body.password, req.body.role];
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("ERROR");
        }
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM registertable WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("ERROR");
        }
        if (data.length > 0) {
            const user = data[0];
            if (user.role === "admin") {
                return res.json("ADMIN");
            } else if (user.role === "normaluser") {
                return res.json("USER");
            }
        }
        return res.json("login Failure");
    });
});

// app.get('/user', (req, res) => {
    
//     const user = {
//         id: 1,
//         name: 'Anshalin Sharu',
//         email: 'john.doe@example.com'
//     };
//     res.json(user);
// });

app.get('/', (req, res) => {
    res.json("BACKEND IS WORKING");
});

app.listen(port, () => {
    console.log(`ONLINE IN PORT:${port}`);
});
