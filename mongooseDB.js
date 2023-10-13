
const mongoose = require("mongoose");

class DatabaseWrapper {
  constructor(db_Url, debug_mode) {
    this.db_Url = db_Url;
    this.debug_mode = debug_mode;
    this.connection = {};
  }

  launch() {
    //Configure Mongoose
    mongoose.connect(this.db_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    this.connection = mongoose.connection;
    mongoose.set("debug", DEV_MODE === "true");
    this.connection.once("open", function() {
      console.log("Connection with MongoDB was successful");
    });


  }
}

module.exports = DatabaseWrapper
