---
title: 'Misplaced Middleware in Express'
categories: ["New post"]
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

