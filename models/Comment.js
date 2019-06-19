var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var commentSchema = new Schema({

  title: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;