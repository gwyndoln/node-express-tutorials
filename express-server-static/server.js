const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(cors());
app.use('/images', express.static('images'));
app.use('/:file', function(req, res, next){
    
    const options = {
        root: path.join(__dirname)
    };
    
    const fileName = req.params.file;
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
            next();
        }
    });
});


app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});
