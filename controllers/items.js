const mongoose = require('mongoose');
const Item = mongoose.model('Item');

const getItems = async (req, res) => {
  let items;
  try {
      items = await Item.find({}).exec();
      res.status(200).json(items);
  } catch {
      return res.status(500).json({"msg": "No items found for this user"});
  }
}

module.exports = {getItems};