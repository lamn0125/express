const express = require('express')
const app = express()
const port = 3000

const restaurantList = require('./restaurant.json')
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', {restaurants: restaurantList.results})
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => 
    restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', {restaurant: restaurant})
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const includesKeyword = (str) => {
    return str.toLowerCase().includes(keyword.toLowerCase())
  }
  const restaurants = restaurantList.results.filter(restaurant => {
    return includesKeyword(restaurant.name) || includesKeyword(restaurant.category)
  })

  res.render('index', { restaurants: restaurants })
})



app.listen(port, () => {
  console.log(`Express running on localhost:${port}`)
})