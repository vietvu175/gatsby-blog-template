---
title: 'Misplaced Middleware in Express'
tags: ["nodejs", "express"]
published: true
date: '2018-12-29'
---


Rồi một ngày trời không biển xanh
Rồi một ngày hàng cây vắng tanh
Và cơn gió mang mùa đông tới
Cuốn bay theo đám lá vàng rơi
Bờ cỏ này giọt sương đã tan
Bậc thềm này còn in dấu chân
Mùa đông tới anh chờ em mãi
Lá hoa thu sang nay đã úa tàn
Giờ đây anh biết anh biết đã mất anh rồi đấy
Ngày mùa đông đến nghe vắng xa tiếng mưa phùn rơi


```javascript
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URI || 'mongodb://localhost/dbname' )

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
```

<br>

Nunc blandit purus sit amet justo vehicula, at venenatis ante tempus. Integer sagittis ultrices lorem, ut faucibus erat molestie quis. Phasellus semper orci nisl, egestas maximus risus porta sit amet. Fusce vitae egestas sem. Nunc sagittis, erat sodales maximus tempus, magna diam iaculis ex, ut feugiat odio libero sit amet lectus. Suspendisse elit turpis, volutpat laoreet consequat ac, ultricies eu sem. Donec non orci in justo porta iaculis. Donec pulvinar nunc quis viverra volutpat. Quisque et orci non enim sodales eleifend. Etiam in enim id nulla posuere lacinia. Ut rutrum pharetra nisi quis feugiat. Cras arcu lectus, euismod a lacinia a, cursus vitae magna. Aenean ultricies, enim id pharetra ultricies, ligula lectus congue tellus, ac lobortis ex elit at nulla. Sed lobortis vitae tortor sed laoreet. Praesent porta bibendum ullamcorper:


```javascript
// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

app.post('/api/users/new-user', (req, res) =>{
 const firstName = req.body.first_name;
 const lastName  = req.body.last_name;
 res.json({first_name: firstName, last_name: lastName, "status": "registered"});
})
```
<br>

Integer fermentum euismod risus, vitae fringilla erat condimentum at. Suspendisse luctus egestas dui, eu dictum sem tincidunt sed. Sed efficitur eget orci eu dictum. Etiam faucibus, enim nec tincidunt sollicitudin, diam neque ultricies magna, eget ultrices sem tortor non justo. Vestibulum viverra tincidunt elit sit amet gravida. Morbi sed tempus odio. Nunc efficitur ultricies elit et porta. Praesent finibus placerat felis, vitae efficitur ligula sagittis non. Nam fringilla malesuada ligula ullamcorper dignissim.


```javascript
app.use((req, res, next) => {
  console.log('fire 1')
  return next({status: 404, message: 'not found'})
});

app.post('/api/users/new-user', (req, res) =>{
  console.log('fire 2')
  const firstName = req.body.first_name;
  const lastName  = req.body.last_name;
  res.json({first_name: firstName, last_name: lastName, "status": "registered"});
});

```
<br>

Morbi mauris lacus, vehicula eget ullamcorper et, fringilla at ipsum. Nam tempus felis ex, congue varius urna consectetur eget. Cras tempor condimentum accumsan. In hac habitasse platea dictumst. Nulla pharetra mauris enim, quis dictum ipsum dictum sed. Sed luctus eros volutpat, luctus augue et, tempus ante:


```javascript
Your app is listening on port 3000
fire 1
[object Object]

```
<br>

Sed imperdiet diam id luctus faucibus. Sed ullamcorper suscipit arcu, in dictum lectus ultricies et. Donec accumsan a ipsum sed aliquet. Nulla auctor justo eget tincidunt egestas. Cras blandit, ante vitae facilisis hendrerit, justo mauris fermentum diam, id congue diam velit eu ipsum. Nullam pulvinar auctor tincidunt. Maecenas felis velit, bibendum ac purus nec, cursus lacinia nulla. Sed posuere orci sapien, id accumsan eros feugiat vel. Aenean convallis lacinia orci. In metus elit, iaculis vitae nisi vel, iaculis vehicula mi.


```javascript
// not-found middleware
app.use((req, res, next) => {
  console.log('fire 1')
  return next({status: 404, message: 'not found'})
});

// error-handler middleware
app.use((err, req, res, next) => {
  console.log('fire 2')
  console.log(err);
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
});

app.post('/api/users/new-user', (req, res) =>{
  console.log('fire 3')
  const firstName = req.body.first_name;
  const lastName  = req.body.last_name;
  res.json({first_name: firstName, last_name: lastName, "status": "registered"});
});
```
<br>

Nam elementum augue vel nulla consectetur elementum. Curabitur tincidunt hendrerit justo. Praesent nisl dui, mollis vitae quam eu, dignissim faucibus lorem:


```javascript
Your app is listening on port 3000
fire 1
fire 2
{ status: 404, message: 'not found' }

```
<br>

Sed vitae erat at sem suscipit laoreet nec vel diam. Donec at quam sapien. Nulla quis egestas metus, ut tempus elit. Vivamus placerat diam ac ultrices finibus. Aenean vitae molestie eros. Curabitur pulvinar ornare est volutpat consequat. Vivamus ullamcorper pharetra leo ac volutpat. Curabitur efficitur egestas posuere. Duis ut sagittis diam, sed sollicitudin lectus. Phasellus in lorem maximus, volutpat felis non, fringilla mi. Curabitur in fringilla sem, nec rhoncus elit. Aenean non ante dignissim elit suscipit hendrerit sit amet nec eros. Curabitur feugiat, metus non convallis scelerisque, nisl urna imperdiet velit, eget semper enim ante eget lorem.


```javascript
app.post('/api/users/new-user', (req, res) =>{
  console.log('fire 1')
  const firstName = req.body.first_name;
  const lastName  = req.body.last_name;
  res.json({first_name: firstName, last_name: lastName, "status": "registered"});
});


// Not found middleware
app.use((req, res, next) => {
  console.log('fire 2')
  return next({status: 404, message: 'not found'})
});

// Error Handling middleware
app.use((err, req, res, next) => {
  console.log('fire 3')
  console.log(err);
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})
```
<br>

Nulla pharetra mauris enim, quis dictum ipsum dictum sed. Sed luctus eros volutpat, luctus augue et, tempus ante. Sed imperdiet diam id luctus faucibus. Sed ullamcorper suscipit arcu, in dictum lectus ultricies et. Donec accumsan a ipsum sed aliquet. Nulla auctor justo eget tincidunt egestas:


```javascript
Your app is listening on port 3000
fire 1

```
<br>

 Donec at quam sapien. Nulla quis egestas metus, ut tempus elit. Vivamus placerat diam ac ultrices finibus. Aenean vitae molestie eros. Curabitur pulvinar ornare est volutpat consequat. Vivamus ullamcorper pharetra leo ac volutpat. Curabitur efficitur egestas posuere.


```javascript
{"first_name":"Walter","last_name":"White","status":"registered"}
```
<br>

consectetur elementum.