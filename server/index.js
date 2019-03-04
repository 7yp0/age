const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const port = 8081;
const yellowString = '\x1b[33m%s\x1b[0m';

function logToConsole(emoji, message) {
  console.log(yellowString, message, emoji);
}

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/build', function (req, res) {
  const assetsPath = path.join(__dirname, '../src/assets');


  fs.writeFile(`${assetsPath}/gameState.json`, JSON.stringify(req.body), 'utf8', (err) => {
    if(err) {
        return logToConsole('❌', err);
    }

    logToConsole('🏗', `Build done! File saved to "${assetsPath}"`);

    res.send(true);
  }); 
});


// Start the server
const server = app.listen(port, () => {
  logToConsole(
    '🏃‍', `server running at http://${server.address().address}:${server.address().port}`,
  );
});
