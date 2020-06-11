//model imports
const ServiceCategory = require('../../models/services/s_categories.model');
const Order = require ('../../models/services/order.model');
const checkAuth = require('../../middleware/auth-check');

//dependency imports
const express = require('express');
const bodyParser = require('body-parser');

//express app declaration
const service = express();
const multer = require ("multer");


// multer setup for image upload
const MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg',
    'image/gif' : 'gif'
  };
  const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error= new Error("Invalid Image");
      if(isValid){
        error=null;
      }
      cb(error,"src/assets/images");
    },
    filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + '-' + Date.now() + '.' + ext);
    }
  });
  
  

//middleware
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({ extended: false }));


service.get('/cat', (req, res, next) => {
    ServiceCategory.find(function (err, services) {
      console.log(services);
      if (err) return handleError(err => {
          console.log(err);
        res.status(500).json(
          { message: 'No Service Categories Found! Please try again!'}
          );
      });
      res.status(200).json(
        {
          message: 'Categories list recieved successfully!',
          categories: services
        }
      );
    });
  });

  service.get('/order/get/:id', (req, res, next) => {
    Order.findOne({order_id: req.params.id} ,function (err, order) {
      console.log(order);
      if (err) return handleError(err => {
          console.log(err);
        res.status(500).json(
          { message: 'No  Orders Found! Please try again!'}
          );
      });
      res.status(200).json(
        {
          message: ' Order recieved successfully!',
          order: order
        }
      );
    });
  });



service.post('/order/add',checkAuth, (req, res, next) => {
  var lid;
  Order.find(function (err, services) {
    if(services.length){
      lid = services[services.length-1].order_id;
    } else {
      lid= 'ORDER0';
    }
    let mId = +(lid.slice(5));
    ++mId;
    lid = 'ORDER' + mId.toString();
    console.log(lid);
    if (err) return handleError(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error occured while getting order ID!'
      });
    });
  }).then( () => {
  const reqOrder = req.body;
  reqOrder['order_id']= lid;
  reqOrder['customer']= {
    user_id: req.userData.user_id,
    customer_name: req.userData.user_id,
    email: req.userData.email,
  }
  const newOrder = new Order(reqOrder);
  console.log(newOrder);
  newOrder.save()
  .then(result => {
      res.status(200).json({
        message: 'order added successfully!',
        result: result
      });
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message: 'Order was unsuccessfull! Please try Again!'
      });
    });
  });
});


service.post('/order/img',checkAuth, multer({storage:storage}).array("images[]"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  let imagePaths = [];
  for (let f of req.files){
    imagePaths.push(url+ "/images/" + f.filename);
  }
  res.status(200).json({imagePaths: imagePaths});

});


module.exports = service;
