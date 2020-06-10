//model imports
const ServiceCategory = require('../../models/services/s_categories.model');
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

// get methods

//get list of service categories
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


module.exports = service;
