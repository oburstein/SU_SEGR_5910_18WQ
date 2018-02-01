const fs = require('fs'),
  http = require('http'),
  os = require('os');

var interfaces = os.networkInterfaces(),
  ipdata,
  addresses = [];

fs.readFile('./hostip', 'utf8', function (err, data) {
  console.log(data);
  console.log(interfaces);
  ipdata = data;
});

var server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.write("host ip: " + ipdata + " \nother ip addresses: \n");

  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
      var address = interfaces[k][k2];

      if (address.family === "IPv4") {
        response.write(address.address + "\n");
      }
    }
  }

  response.end();
}).listen(8080);
