const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    trim: true,
    minlength:[ 3, 'Minimum allowed 3 characters'],
    maxlength:[50, 'Maximum allowed is 50 characters']
  },
  genre: {
    type: String,
    required: true,
    trim: true,
    enum: {
        values: ['Romance', 'Fiction', 'Psychology', 'Historical', 'Adventure'],
        message: 'Genre must be one of the following: Romance, Fiction, Psychology, Historical, Adventure'
      }
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength:[ 5, 'Minimum allowed 5 characters'],
    maxlength:[100, 'Maximum allowed is 100 characters']
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  images: {
    type: String,
    default: "",
  },
});


const BookModel = mongoose.model('book', BookSchema);
module.exports= BookModel