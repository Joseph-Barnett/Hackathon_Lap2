const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');
const postRouter = require('./routers/post');
const userRouter = require('./routers/user');
const diarysRouter = require('./routers/diarys');


const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

api.use('/entries', diarysRouter)

api.get("/", (req, res) => {
    res.json({
        name: "Discretion",
        description: "Send and receive private messages."
    })
})

api.use("/posts", postRouter);
api.use("/users", userRouter);

module.exports = api;
