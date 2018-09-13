var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  const Ebay = require("ebay-node-api");
 
  let ebay = new Ebay({
      clientID: "XinChen-TestSyst-PRD-c1c8569b9-73b085bf",
      clientSecret: 'PRD-1c8569b96fff-8552-47b2-adae-34a1',
      body: {
          grant_type: "client_credentials",
          scope: 'https://api.ebay.com/oauth/api_scope'
      }
  });
    // Get access token and pass it to this method
  ebay.getAccessToken()
  .then((data) => {
      ebay.getItem('v1|112994084324|0').then((dataA) => {
          console.log(dataA);    

          ebay.getItem('v1|273340846287|0').then((dataB) => {
                console.log(dataB);
                res.render('index', {
                    title: 'EBAY',
                    id_A: dataA.itemId,
                    title_A: dataA.title,
                    price_A: dataA.price.convertedFromValue,
                    image_A: dataA.image.imageUrl,
                    id_B: dataB.itemId,
                    title_B: dataB.title,
                    price_B: dataB.price.convertedFromValue,
                    image_B: dataB.image.imageUrl
                });         
            })
        });         
    })      
});


module.exports = router;
