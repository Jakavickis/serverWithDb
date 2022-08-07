import express from 'express';
import handlebars from 'express-handlebars';
import { renderMainPage, insertNewNote, deleteNote, editNote } from './src/routes.js';

const app = express();
const port = 8081;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

app.get('/test', (req, res) => res.render('test'));


// app.get('/', (req, res) => res.send("hi"));
app.get('/', renderMainPage);
app.post('/', insertNewNote);
app.delete('/', deleteNote);
app.patch('/', editNote)

app.listen(port, () => console.log(`starting server on port ${port}`));

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