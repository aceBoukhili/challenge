import express from 'express';
import webpack from 'webpack';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import colors from 'colors';
import morgan from 'morgan';
import moviesData from './movies-coming-soon.json';
import config from '../../webpack.config.babel';

const TARGET = process.env.npm_lifecycle_event;

const sessionOpts = {
  saveUninitialized: false,
  resave: false,
  secret: 'BestProduct',
  cookie: { httpOnly: true, maxAge: 2419200000 }
};

const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

app.set('views', path.join(__dirname, './renderedPages/'));
app.set('view engine', 'pug');
if (TARGET === 'start' || !TARGET) {
  app.use(morgan('dev'));
  app.use(
    require('webpack-dev-middleware')(compiler, { //eslint-disable-line
      noInfo: true,
      publicPath: config.output.publicPath
    })
  );
  app.use(require('webpack-hot-middleware')(compiler)); //eslint-disable-line
}

const CDs = moviesData;

app.use(cookieParser('coding chalenge'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(sessionOpts));

app.get('/', (req, res) => {
  res.render(path.join(__dirname, './renderedPages/index'));
});

app.get('/geCDs', (req, res) => {
  res.json(CDs);
});

app.listen(port, (err) => {
  if (err) {
    console.log(colors.red.underline(err)); //eslint-disable-line
  } else {
    console.log(colors.green(`App is running🔥: 🌎 http://localhost:${port}`)); //eslint-disable-line
    // open(`http://localhost:${port}`);
  }
});
