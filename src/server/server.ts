import * as path from 'path';
import * as express from 'express';
import * as passport from 'passport';

import './middleware/localstrategy';
import './middleware/bearerstrategy';
import routes from './routes';

const app = express();

let p = path.join(__dirname, '../public');


app.use(express.json());
app.use(express.static(p));
app.use(passport.initialize());

app.use(routes);

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, `../public/index.html`));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});