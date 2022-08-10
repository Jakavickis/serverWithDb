import express from 'express';
import handlebars from 'express-handlebars';
import { getNotes, addNote, deleteNote, updateNote } from './src/routes.js';
import { handleLogin, handleRegistration, loginPage, startRegistration, } from './src/user-routes.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = 8081;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

app.get('/test', (req, res) => res.render('test'));


// app.get('/', (req, res) => res.send("hi"));
app.get('/', getNotes);
app.post('/', addNote);
app.delete('/', deleteNote);
app.patch('/', updateNote);

app.get('/register', startRegistration);
app.post('/register', handleRegistration);
app.get('/login', loginPage);
app.post('/login', handleLogin);

app.listen(port, () => console.log(`starting server on port localhost:${port}`));

// SELECT note FROM todoapp.notes n;


// const connection = mysql.createConnection({
//     host: 'localhost',
//     database: 'classicmodels',
//     user: 'classicmodels',
//     password: 'bit'
// })

// app.get('/db', (req, res) => {
//     connection.execute('SELECT productLine, textDescription FROM classicmodels.productlines', (err, rows) => {
//         const data = rows.map(row => row);
//         res.render('db', { data: data });
//     });
// })