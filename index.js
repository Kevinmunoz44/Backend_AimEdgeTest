import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/database.js'
import UserRoutes from './routes/UserRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js'
import productRoutes from './routes/productRoute.js'
import SequelizeStore from 'connect-session-sequelize';
dotenv.config();

const app = express();

const corsOption = {
    origin: ['http://localhost:3001'],
    credentials: true,
};

app.use(cors(corsOption));

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

const port = process.env.PORT || 3002;

app.use(express.json());

app.use(UserRoutes);
app.use(AuthRoutes);
app.use(productRoutes);

// store.sync();

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
});

export default app;