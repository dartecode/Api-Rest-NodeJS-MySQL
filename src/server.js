const express = require('express');
const app = express();

//Settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(express.json());

//Routes
app.use(require('./routes/routes'));

app.listen(app.get('port'), () => {
    console.log('Server on Port', app.get('port'));
});