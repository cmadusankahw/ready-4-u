
const User = require('../../models/auth/user.model');
const Customer = require('../../models/auth/customer.model');
const ServiceProvider = require('../../models/auth/serviceprovider.model');
const checkAuth = require('../../middleware/auth-check');


const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require ("multer");


const auth = express();

// multer setup 
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


auth.use(bodyParser.json());
auth.use(bodyParser.urlencoded({ extended: false }));


auth.post('/signup/user', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      user_id: req.body.user_id,
      email: req.body.email,
      user_type: req.body.user_type,
      password: hash,
      state: req.body.state,
    });
    console.log(user);
    user
      .save()
      .then((result) => {
        res.status(200).json({
          message: 'user added successfully!',
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'User signup was not successfull! Please try again!',
        });
      });
  });
});


auth.post('/signup/sprovider', (req, res, next) => {
  const serviceprovider = new ServiceProvider(req.body);
  console.log(serviceprovider);
  serviceprovider
    .save()
    .then((result) => {
      res.status(200).json({
        message: 'Service provider added successfully!',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message:
          'Service provider sign up was not successfull! Please try again!',
      });
    });
});


auth.post('/signup/customer', (req, res, next) => {
  const customer = new Customer(req.body);
  console.log(customer);
  customer
    .save()
    .then((result) => {
      res.status(200).json({
        message: 'Customer added successfully!',
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Customer Signup was not successful! Please try again!',
      });
    });
});


auth.post('/signup/admin', (req, res, next) => {
  const user = new User(req.body);
  console.log(user);
  user
    .save()
    .then((result) => {
      res.status(200).json({
        message: 'Admin added successfully!',
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Admin signup was not successful! Please try again!',
      });
    });
});


auth.post('/profile/img',checkAuth, multer({storage:storage}).array("images[]"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  imagePath = url+ "/images/" +  req.files[0].filename;
  res.status(200).json({
    profilePic: imagePath
  });
});



//edit merchant
auth.post('/customer/edit',checkAuth, (req, res, next) => {
  Customer.updateOne({ user_id: req.userData.user_id}, {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_type: req.body.user_type,
    profile_pic: req.body.profile_pic,
    email: req.body.email,
    contact_no: req.body.contact_no,
    address_line1: req.body.address_line1,
    address_line2: req.body.address_line2,
    gender: req.body.gender,
    location: req.body.location,
  })
  .then((result) => {
    console.log(result);
    res.status(200).json({
      message: 'customer updated successfully!',
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      message: 'Profile Details update unsuccessfull!'
    });
  });
});


//edit event planner
auth.post('/sprovider/edit',checkAuth, (req, res, next) => {
  EventPlanner.updateOne({ user_id: req.userData.user_id}, {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    profile_pic: req.body.profile_pic,
    email: req.body.email,
    contact_no: req.body.contact_no,
    address_line1: req.body.address_line1,
    address_line2: req.body.address_line2,
    postal_code: req.body.postal_code,
    gender: req.body.gender,
    date_of_birth: req.body.date_of_birth,
  })
  .then((result) => {
    res.status(200).json({
      message: 'event planner updated successfully!',
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      message: 'Profile Details update unsuccessfull! Please Try Again!'
    });
  });
});

auth.post('/signin', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({
          message: 'Invalid username or password!',
        });
      }
      fetchedUser = user;
      console.log(user);
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        res.status(401).json({
          message: 'Invalid username or password!',
        });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          user_id: fetchedUser.user_id,
          user_type: fetchedUser.user_type,
        },
        'secret_long_text_asdvBBGH##$$sdddgfg567$33',
        { expiresIn: '1h' }
      );
      res.status(200).json({
        message: 'user authentication successfull!',
        token: token,
        expiersIn: 7200,
        user_type: fetchedUser.user_type,
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: 'Invalid username or password!',
      });
    });
});


auth.get('/last', (req, res, next) => {
  User.find(function (err, users) {
    var lastid;
    if (users.length) {
      lastid = users[users.length - 1].user_id;
    } else {
      lastid = 'U0';
    }
    console.log(lastid);
    if (err) return handleError(err);
    res.status(200).json({
      lastid: lastid,
    });
  });
});


auth.get('/get/sprovider', checkAuth, (req, res, next) => {
  console.log(req.userData);
  ServiceProvider.findOne({ user_id: req.userData.user_id }, function (
    err,
    serviceprovider
  ) {
    if (err)
      return handleError((err) => {
        res.status(500).json({
          message:
            "Couldn't recieve service provider Details! Please check your connetion",
        });
      });
    res.status(200).json({
      message: 'service provider recieved successfully!',
      serviceprovider: serviceprovider,
    });
  });
});


auth.post('/get/sproviders', checkAuth, (req, res, next) => {
  console.log(req.body.category);
  ServiceProvider.find({ isavailable: true, service_category: req.body.category}, function (
    err,
    serviceproviders
  ) {
    if (err)
      return handleError((err) => {
        res.status(500).json({
          message:
            "Couldn't recieve service provider Details! Please retry",
        });
      });
    res.status(200).json({
      message: 'service providers recieved successfully!',
      serviceproviders: serviceproviders,
    });
  });
})


auth.get('/get/customer', checkAuth, (req, res, next) => {
  Customer.findOne({ user_id: req.userData.user_id }, function (err, customer) {
    if (err)
      return handleError((err) => {
        res.status(500).json({
          message:
            "Couldn't recieve customer Details! Please check your connetion",
        });
      });
    res.status(200).json({
      message: 'customer  recieved successfully!',
      customer: customer,
    });
  });
});


auth.get('/get/head', checkAuth, (req, res, next) => {
      res.status(200).json({
        user_type: req.userData.user_type,
        email: req.userData.email,
      });
});


module.exports = auth;
