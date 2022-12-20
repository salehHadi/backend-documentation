const express = require('express')

const app = express()

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const fileUplode = require('express-fileupload')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.use(fileUplode())
let courses = [
    {
        id: 11,
        name: "Learn ReactJS",
        price: 299
    },
    {
        id: 22,
        name: "Learn Backend DEV",
        price: 399
    },
    {
        id: 33,
        name: "Learn Angular",
        price: 499
    },
];


app.get('/', (req, res) => {
    res.send("hello my Frinds")
});

app.get('/api/v1/lco', (req, res) => {
    res.send("hello from LCO")
});

app.get('/api/v1/lcoobject', (req, res) => {
    res.json({id: 55, name: "Learn Python", price: 999})
});

app.get('/api/v1/courses', (req, res) => {
    res.json(courses)
});


app.get('/api/v1/mycourse/:courseId', (req, res) => {
    // I used == instade of === for now I'll check why didn't accept the number later
    const myCourse = courses.find(course => course.id == req.params.courseId)
    res.send(myCourse)
})

app.post('/api/v1/addCourse', (req, res) => {
    console.log(req.body)
    courses.push(req.body)
    res.send(true)
})

app.get('/api/v1/coursequery', (req, res) => {
    let location = req.query.location
    let device = req.query.device

    res.send({location, device})
})

app.post('/api/v1/courseuplode', (req, res) => {
    console.log(req.headers)
    const file = req.files.file
    let path = __dirname + "/images/" + new Date() + ".jpg"

    file.mv(path, err => {
        res.send(true)
    })
})

app.listen('4000', () => {console.log(`server is running at 4000 ...`)});