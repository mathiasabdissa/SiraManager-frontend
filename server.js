//Install express server
const express = require('express');
const path = require('path');

const app = express();
// Server only the static files form the dist directory
app.use(express.static(__dirname + '/dist/frontend'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname +
        '/dist/frontend/index.html'));
});
app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/frontend/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
