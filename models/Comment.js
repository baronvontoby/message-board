var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({

  title: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

var Article = mongoose.model("Comment", CommentSchema);

module.exports = Article;