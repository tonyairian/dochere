const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://tonyairian98:ashique2@cluster0.r6aii2l.mongodb.net/dochere",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

// ("mongodb://localhost:27017/my_project");
// mongodb://localhost:27017
