const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const firmownerSchema = mongoose.Schema(
  {
    user_id: { type: String, required: true, unique: true },
    user_type: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    profile_pic: { type: String },
    nic: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact_no: { type: String, required: true },
    distric: { type: String, required: true },
    town: { type: String, required: true },
    firm_reg_no: { type: String, required: true, unique: true },
    firm_name: { type: String, required: true },
    address_line1: { type: String, required: true },
    address_line2: { type: String },
    gender: { type: String, required: true, default: 'none' },
    date_of_birth: { type: String },
    reg_date: { type: String, required: true },
  },
  { collection: 'FirmOwner' }
);

firmownerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('FirmOwner', firmownerSchema);
