const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    title: String,
    description: String,
    image: String
})

mongoose.model('Item', itemSchema);