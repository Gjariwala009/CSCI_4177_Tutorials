const http = require('http');

const port = process.env.PORT || 3000;

let users = [
  { email: 'abc@abc.ca', firstName: 'ABC', id: '5abf6783' },
  { email: 'xyz@xyz.ca', firstName: 'XYZ', id: '5abf674563' },
];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/users') {
    res.statusCode = 200;
    res.end(JSON.stringify({
      message: 'Users retrieved',
      success: true,
      users: users
    }));
  } else if (req.method === 'POST' && req.url === '/add') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        console.log('Received body:', body);  // Debug log
        const newUser = JSON.parse(body);
        newUser.id = Date.now().toString();
        users.push(newUser);
        res.statusCode = 201;
        res.end(JSON.stringify({
          message: 'User added',
          success: true,
          user: newUser
        }));
      } catch (error) {
        console.error('Error parsing JSON:', error);  // Debug log
        res.statusCode = 400;
        res.end(JSON.stringify({
          message: 'Invalid JSON',
          success: false
        }));
      }
    });
  } else if (req.method === 'PUT' && req.url.startsWith('/update/')) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        console.log('Received body:', body);  // Debug log
        const updatedData = JSON.parse(body);
        const userId = req.url.split('/')[2];
        console.log('Looking for user with ID:', userId);  // Debug log
        console.log('Current users:', users.map(user => user.id));  // Debug log
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
          const user = users[userIndex];
          if (updatedData.email) user.email = updatedData.email;
          if (updatedData.firstName) user.firstName = updatedData.firstName;
          res.statusCode = 200;
          res.end(JSON.stringify({
            message: 'User updated',
            success: true
          }));
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({
            message: 'User not found',
            success: false
          }));
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);  // Debug log
        res.statusCode = 400;
        res.end(JSON.stringify({
          message: 'Invalid JSON',
          success: false
        }));
      }
    });
  } else if (req.method === 'GET' && req.url.startsWith('/user/')) {
    const userId = req.url.split('/')[2];
    console.log('Searching for user with ID:', userId);  // Debug log
    const user = users.find(user => user.id === userId);
    if (user) {
      res.statusCode = 200;
      res.end(JSON.stringify({
        success: true,
        user: user
      }));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({
        message: 'User not found',
        success: false
      }));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({
      message: 'Not Found',
      success: false
    }));
  }
});

server.listen(port, () => {
  console.log(`Server running`);
});