import express from 'express';
import handlebars from 'express-handlebars';

const app = express();
const port = 8081;

app.use(express.static('public'));

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

app.get('/test', (req, res) => res.render('test'));


app.get('/', (req, res) => res.send("hi"));

app.listen(port, () => console.log(`starting server on port ${port}`));

