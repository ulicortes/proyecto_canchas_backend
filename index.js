import express from 'express';
import cors from 'cors';
import {router as matches} from './routes/matchRoute.js'

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(express.json()); 

app.use('/matches', matches)

const port = process.env.PORT || 9871;
app.listen(port, () => {
  console.log('Server is running on port '+port);
});