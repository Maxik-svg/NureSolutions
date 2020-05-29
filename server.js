const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`MongoDb connection established successfully`);
});

const ExercisesRouter = require('./routes/exercises');
const UsersRouter = require('./routes/users');
const ProjectsRouter = require('./routes/projects');


app.use('/exercises', ExercisesRouter);
app.use('/users', UsersRouter);
app.use('/projects', ProjectsRouter);


app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
});
