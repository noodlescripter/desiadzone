const express = require('express');
const cors = require('cors');
const dbconfig = require('./database/connection.js');
const { info } = require('console');

const app = express();

//use cors middleware to allow cross-origin requests localhost
app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//post ads
app.post('/ads/posting', async function(req, res){
      try{
            const {isUserLoggedIn, address, city, state, zipCode, decription, category, phoneNumber, price}  = req.body;
            if(!isUserLoggedIn){
                  if(isUserLoggedIn === true){
                        console.log("req body:", req.body)
                  }
            }
            console.log(req.body)
      } catch(err){

      }
})

app.listen(5000, async () => {
      try {
            info('Server is running on port 5000');
            //await dbconfig();
      } catch (err) {

      }
});