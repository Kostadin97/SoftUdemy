const express = require('express');
const routes = require('./routes');
const port = process.env.PORT || 3000;

const app = express();

require('./config/express')(app);
require('./config/mongoose')(app);

app.use(routes);

app.listen(port, () => console.log(`Server is listening on port ${port}`));

