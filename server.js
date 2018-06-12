import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';

const app = express();

app.set('port', (process.env.PORT || 3000));
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(express.static('./dist'));
app.use('/dist', express.static(__dirname + 'dist'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(app.get('port'));