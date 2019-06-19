var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  comment: {
    type: Schema.Types.ObjectId,
    ref: "comment"
  }
});

const article = mongoose.model("article", articleSchema);

module.exports = article;