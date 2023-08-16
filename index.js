const express = require('express')

const app = express()

const port = 3000

require('./conn/db')

app.use(express.json())

const AuthRoutes=require('./routes/auth')

const Alluser=require('./routes/user')

const PostRoutes = require('./routes/post')

app.use('/',AuthRoutes);

app.use('/',PostRoutes)

app.use('/',Alluser)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))