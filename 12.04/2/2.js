const fs = require('fs');
const path = require('path');
const handler = require('./file-handler').handler; 

handler('.','.js');