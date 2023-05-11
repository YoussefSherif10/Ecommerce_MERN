const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    title: String,
    description: String,
    image: String,
    count: {
        type: Number,
        default: 0
    }
})

mongoose.model('Item', itemSchema);