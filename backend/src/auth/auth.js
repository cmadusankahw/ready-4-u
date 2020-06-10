//model imports
const User = require('../../models/auth/user.model');
const Customer = require('../../models/auth/customer.model');
const ServiceProvider = require('../../models/auth/serviceprovider.model');
const checkAuth = require('../../middleware/auth-check');

//dependency imports
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//express app declaration
const auth = express();

//middleware
auth.use(bodyParser.json());
auth.use(bodyParser.urlencoded({ extended: false }));

// signup user
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

// signup serviceprovider
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

// signup customer
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

// signup admin
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

//login user
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
      // json web token here
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

//get last user ID
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

// get service provider logged in
auth.get('/get/sp', checkAuth, (req, res, next) => {
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

// get customer logged in
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

// get header details
auth.get('/get/head', checkAuth, (req, res, next) => {
      res.status(200).json({
        user_type: req.userData.user_type,
        email: req.userData.email,
      });
});


module.exports = auth;
