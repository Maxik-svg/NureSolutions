const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://kolomoitsev:jMBueTbBymeolFAU@cluster0-hnn0k.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`MongoDb connection established successfully`);
});

const TaskssRouter = require('./routes/tasks');
const UsersRouter = require('./routes/users');
const ProjectsRouter = require('./routes/projects');
const StatsRouter = require('./routes/stats');


app.use('/tasks', TaskssRouter);
app.use('/users', UsersRouter);
app.use('/projects', ProjectsRouter);
app.use('/stats', StatsRouter);

app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
});
