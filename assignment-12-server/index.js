const express = require('express');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000
const app = express()
require("dotenv").config();
const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY)

app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.opkciwj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    const classCollection = client.db('helloSummer').collection('classes')
    const selectedClassCollection = client.db('helloSummer').collection('selectedClasses')
    const userCollection = client.db('helloSummer').collection('users')
    const paymentCollection = client.db('helloSummer').collection('payments')


    // verification

    const verifyAdmin = async(req, res, next) =>{
      const email = req.decoded.email

      const query = {email: email}

      const user = await userCollection.findOne(query)

      if(!user) {
        return res.status(401).send({error: true, message: 'unauthorized'})
      }

      const role = user?.role

      if(role !== 'admin'){
        return res.status(403).send({error: true, message: 'forbidden nnnnnnnnnnnnn'})
      }

      next()

    }

    const verifyInstructor = async(req, res, next) =>{
      const email = req.decoded.email

      const query = {email: email}

      const user = await userCollection.findOne(query)

      if(!user) {
        return res.status(401).send({error: true, message: 'unauthorized'})
      }

      const role = user?.role

      if(role !== 'instructor'){
        return res.status(403).send({error: true, message: 'forbidden'})
      }

      next()

    }

    const verifyStudent = async(req, res, next) =>{
      const email = req.decoded.email

      const query = {email: email}

      const user = await userCollection.findOne(query)

      if(!user) {
        return res.status(401).send({error: true, message: 'unauthorized'})
      }

      const role = user?.role

      if(role !== 'student'){
        return res.status(403).send({error: true, message: 'forbidden'})
      }

      next()

    }


    // JWT

    const verifyJWT = (req, res, next)=>{
      const authorization = req.headers.authorization
    
      if(!authorization){
        return res.status(401).send({error: true, message: 'unauthorized'})
      }
    
      const token = authorization.split(' ')[1]
    
      jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) =>{
        if(error){
          return res.status(401).send({error: true, message: 'unauthorized'})
        }
    
        req.decoded = decoded
    
        next()
      })
    }

    app.post('/jwt', (req, res)=>{
      const user = req.body
      const token = jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: '1h'})

      res.send({token})
    })

    // SelectedClasses

    app.get('/selectedClasses', verifyJWT, verifyStudent, async(req, res)=>{
      const studentEmail = req.query.studentEmail

      if(studentEmail){
        const query = {studentEmail: studentEmail}
        const selectedClasses = await selectedClassCollection.find(query).toArray()

        const classesId = selectedClasses.map((selectedClass) => selectedClass.classId)

        const loadedClasses = []

        for (const i of classesId) {
          const query = {_id: new ObjectId(i)}
          const cls = await classCollection.findOne(query)

          loadedClasses.push(cls)
        }

        res.send(loadedClasses)
      }
    })

    app.post('/selectedClasses', verifyJWT, verifyStudent, async(req, res)=>{
      const selectedClass = req.body

      const selectQuery = {classId: selectedClass.classId, studentEmail: selectedClass.studentEmail}

      const exist = await selectedClassCollection.findOne(selectQuery)

      if(exist){
        return res.send({exist: true})
      } else {
        const result = await selectedClassCollection.insertOne(selectedClass)

        res.send(result)
      }
    })

    app.delete('/selectedClasses/:id', verifyJWT, verifyStudent, async(req, res)=>{
      const id = req.params.id
      const studentEmail = req.query.studentEmail
      const query = {classId: id, studentEmail: studentEmail}
      
      const result = await selectedClassCollection.deleteOne(query)
      res.send(result)
    })


    // Classes

    app.get('/myClasses', verifyJWT, verifyInstructor, async(req, res)=>{
      const email = req.query.email
      const id = req.query.id

      if(email !== req.decoded.email){
        return res.status(403).send({error: true, message: 'forbidden'})
      }

      let query = {}

      if(email && id){
        query = {instructorEmail: email, _id: new ObjectId(id)}

        const result = await classCollection.findOne(query)
        return res.send(result)

       } else if(email){

        query = {instructorEmail: email}
        const result = await classCollection.find(query).toArray()
        return res.send(result)

      } else {
        return res.status(403).send({error: true, message: 'forbidden'})
      }
    })

    app.get('/classes', async(req, res)=>{
        const status = req.query.status

        let query = {}
        if(status){
            query = {status: status}
        }

        const result = await classCollection.find(query).sort({status: 1}).toArray()
        res.send(result)
    })

    app.get('/classes/:id', async(req, res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}

      const result = await classCollection.findOne(query)
      res.send(result)
    })

    app.post('/classes', verifyJWT, verifyInstructor, async(req, res)=>{
      const newClass = req.body

      const result = await classCollection.insertOne(newClass)
      res.send(result)
    })


    app.patch('/classes', verifyJWT, verifyInstructor, async(req, res)=>{
      const id = req.query.id

      const newClass = req.body

      const updatedNewClass = {
          $set: newClass
      }

      const query = {_id: new ObjectId(id)}

      const result = await classCollection.updateOne(query, updatedNewClass)

      res.send(result)

  })


    app.patch('/classes/:id',verifyJWT, verifyAdmin, async(req, res)=>{
        const id = req.params.id

        const status = req.body

        const updatedStatus = {
            $set: status
        }

        const query = {_id: new ObjectId(id)}

        const result = await classCollection.updateOne(query, updatedStatus)

        res.send(result)

    })

    // Enrolled Classes

    app.get('/enrolledClasses', verifyJWT, verifyStudent, async(req, res)=>{
      const studentEmail = req.query.studentEmail

      if(studentEmail){
        const query = {studentEmail: studentEmail}

        const result = await paymentCollection.find(query).toArray()

        const classesId = result.map(classId => classId.classId)

        const enrolledClasses = []

        for (const i of classesId) {
          const query = {_id: new ObjectId(i)}
          const cls = await classCollection.findOne(query)

          enrolledClasses.push(cls)
        }

        res.send(enrolledClasses)
      }

    })
    

    // Users

    app.post('/users', async(req, res) =>{
      const user = req.body

      const email = user?.email

      const query = {email: email}

      const exist = await userCollection.findOne(query)

      if(exist){
        return res.send({insertedId: true})
      }

      const result = await userCollection.insertOne(user)
      res.send(result)
    })


    app.get('/users',verifyJWT, async(req, res)=>{
      const email = req.query.email

      if(email){

        if(req.decoded.email !== email){
          return res.status(403).send({error: true, message: 'forbidden'})
        }

        const query = {email: email}
        const result = await userCollection.findOne(query)
        return res.send(result)
      }

      const result = await userCollection.find().toArray()

      res.send(result)
    })

    
    app.patch('/users/:email',verifyJWT, verifyAdmin, async(req, res)=>{
        const email = req.params.email

        const role = req.body

        const updatedRole = {
            $set: role
        }

        const query = {email: email}

        const result = await userCollection.updateOne(query, updatedRole)

        res.send(result)

    })

    app.delete('/users/:email',verifyJWT, verifyAdmin, async(req, res)=>{
      const email = req.params.email

      const query = {email: email}

      const result = await userCollection.deleteOne(query)
      res.send(result)
    })

    app.post('/createPaymentIntent',verifyJWT, async(req, res)=>{
      const {price} = req.body

      const amount = parseFloat((parseFloat(price) * 100).toFixed(2))

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        "payment_method_types": [
          "card"
        ]
      })


      res.send({
        clientSecret: paymentIntent.client_secret
      })
    })

    app.get('/payments', verifyJWT, verifyStudent, async(req, res)=>{
      const studentEmail = req.query.studentEmail

      if(studentEmail){
        const query = {studentEmail: studentEmail}

        const payments = await paymentCollection.find(query).sort({date: -1}).toArray()
  
        const classesId = payments.map(payment => payment.classId)

        const paidClasses = []

        for (const i of classesId) {
          const query = {_id: new ObjectId(i)}
          const cls = await classCollection.findOne(query)

          const paidCls = await paymentCollection.findOne({classId: i, studentEmail: studentEmail})

          cls.transactionId = paidCls.transactionId
          cls.amount = paidCls.amount
          cls.date = paidCls.date
          paidClasses.push(cls)
        }

        res.send(paidClasses)
      }
    })


    app.post('/payments', verifyJWT, verifyStudent, async(req, res)=>{
      const payment = req.body

      const query = {classId: payment?.classId, studentEmail: payment?.studentEmail}

      const exist = await paymentCollection.findOne(query)

      if(exist){
        return res.send({exist: true})
      }

      const addPayment = await paymentCollection.insertOne(payment)
      
      const deleteSelected = await selectedClassCollection.deleteOne(query)

      if(addPayment.insertedId){

        const classId = payment.classId

        const query = {_id: new ObjectId(classId)}

        const oldClass = await classCollection.findOne(query)

        if(oldClass){
          const updatedClass = {
            $set: {
              students: oldClass.students + 1,
              availableSeats: oldClass.availableSeats - 1
            }
          }

          const result = await classCollection.updateOne(query, updatedClass)
          res.send(result)
        }
      }

    })

    // Instructors

    app.get('/instructors', async(req, res)=>{
      const result = await userCollection.find({role: 'instructor'}).toArray()

      const instructors = []

      for (const i of result) {

        const instructor = i
        const email = i.email

        const query = {instructorEmail: email}

        const classes = await classCollection.find(query).toArray()

        const students = classes.reduce((previousValue, currentValue)=> currentValue.students + previousValue, 0)

        instructor.students = students
        instructor.classes = classes.length

        instructors.push(instructor)

      }

      res.send(instructors)
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send('server running')
})

app.listen(port)