import express from 'express';
import cors from 'cors';
import {router as matches} from './routes/matchRoute.js'
import { router as users } from './routes/userRoute.js';
import { auth } from './middleware/auth.js';

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(express.json()); 

app.use('/matches', auth, matches);
app.use('/users', users);
// app.use('/matches', auth, (req, res) => {
//   res.send('Hola desde /matches con auth');
// })

const port = process.env.PORT || 9871;
app.listen(port, () => {
  console.log('Server is running on port '+port);
});