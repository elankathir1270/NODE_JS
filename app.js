//core modules
const readline = require("readline");
const fs = require("fs");
const urlReq = require("url");
const http = require("http");
const events = require("events");

//custom/user_define modules
const replaceHtml = require("./modules/replaceHtml");
const user = require("./modules/user");

//reading Input and writing output

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("please enter your name", (value) => {
//   console.log("you entered " + value);
//   rl.close();
// });

// rl.on("close", () => {
//   console.log("Interface closed");
//   process.exit(0);
// });

//reading and writing file synchronously

// let textIn = fs.readFileSync("./file/test.txt", "utf-8");
// console.log(textIn);

// let content = `content from text.txt ${textIn}, \n Date created: ${new Date()}`;
// fs.writeFileSync("./file/output.txt", content);

//reading and writing file asynchronously

// fs.readFile("./file/start.txt", "utf-8", (err1, data1) => {
//   console.log(data1);
//   fs.readFile(`./file/${data1}.txt`, "utf-8", (err2, data2) => {
//     console.log(data2);
//     fs.readFile("./file/append.txt", "utf-8", (err3, data3) => {
//       console.log(data3);
//       fs.writeFile(
//         "./file/output.txt",
//         `${data2}\n\n${data3}\n Date created: ${new Date()}`,
//         () => {
//           console.log("file written successfully");
//         }
//       );
//     });
//   });
// });
// console.log("reading file...");

//creating simple web server

// const html = fs.readFileSync("./template/index.html", "utf-8");
// //Transforming Json to Html
// const products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));
// const productsListHtml = fs.readFileSync(
//   "./template/productsList.html",
//   "utf-8"
// );
// const productDetailsHtml = fs.readFileSync(
//   "./template/productDetails.html",
//   "utf-8"
// );

// function replaceHtml(template, product) {
//   let output = template.replace("%NAME%", product.name);
//   output = output.replace("{{%MODELNAME%}}", product.modeName);
//   output = output.replace("{{%MODELNO%}}", product.modelNumber);
//   output = output.replace("{{%SIZE%}}", product.size);
//   output = output.replace("{{%CAMERA%}}", product.camera);
//   output = output.replace("{{%PRICE%}}", product.price);
//   output = output.replace("{{%COLOR%}}", product.color);
//   output = output.replace("{{%ID%}}", product.id);
//   output = output.replace("{{%DOM%}}", product.ROM);
//   output = output.replace("{{%DESC%}}", product.Description);

//   return output;
// }

//create a server
// const serverr = http.createServer((request, response) => {
//   /*the callback function will be executed whenever a new request hits the server
//     and receives req and res objects.
//     and also createServer method return a server object.
//     */
//   //response.end("Hello from server!");
//   //response.end(html);

//   const { pathname: path, query } = urlReq.parse(request.url, true);

//   if (path.toLocaleLowerCase() == "/" || path.toLocaleLowerCase() == "/home") {
//     response.writeHead(200, {
//       "Content-Type": "text/html",
//       "my-header": "hello world",
//     }),
//       response.end(html.replace("{{%CONTENT%}}", "you are in home page"));
//   } else if (path.toLocaleLowerCase() == "/about") {
//     response.writeHead(200);
//     response.end(html.replace("{{%CONTENT%}}", "you are in about page"));
//   } else if (path.toLocaleLowerCase() === "/products") {
//     if (!query?.id) {
//       let productHtmlArray = products.map((prod) => {
//         return replaceHtml(productsListHtml, prod);
//       });

//       response.writeHead(200, { "Content-Type": "text/html" });
//       response.end(productHtmlArray.join(","));
//       //console.log(productHtmlArray.join(","));
//     } else {
//       const prod = products[query.id];
//       const productDetailHtml = replaceHtml(productDetailsHtml, prod);
//       response.end(productDetailHtml);
//     }
//   } else {
//     response.writeHead(404);
//     response.end(html.replace("{{%CONTENT%}}", "error 404: page not found"));
//   }

//   console.log("A new request received");
// });

const server = http.createServer();
//this server object inherits from eventemitter class

// server.on("request", (request, response) => {
//   const { pathname: path, query } = urlReq.parse(request.url, true);

//   if (path.toLocaleLowerCase() == "/" || path.toLocaleLowerCase() == "/home") {
//     response.writeHead(200, {
//       "Content-Type": "text/html",
//       "my-header": "hello world",
//     }),
//       response.end(html.replace("{{%CONTENT%}}", "you are in home page"));
//   } else if (path.toLocaleLowerCase() == "/about") {
//     response.writeHead(200);
//     response.end(html.replace("{{%CONTENT%}}", "you are in about page"));
//   } else if (path.toLocaleLowerCase() === "/products") {
//     if (!query?.id) {
//       let productHtmlArray = products.map((prod) => {
//         return replaceHtml(productsListHtml, prod);
//       });

//       response.writeHead(200, { "Content-Type": "text/html" });
//       response.end(productHtmlArray.join(","));
//       //console.log(productHtmlArray.join(","));
//     } else {
//       const prod = products[query.id];
//       const productDetailHtml = replaceHtml(productDetailsHtml, prod);
//       response.end(productDetailHtml);
//     }
//   } else {
//     response.writeHead(404);
//     response.end(html.replace("{{%CONTENT%}}", "error 404: page not found"));
//   }

//   console.log("A new request received");
// });

//start the server

server.listen(8000, "127.0.0.1", () => {
  console.log("server has started");
});

// event emitting and handling custom events

// let myEmitter = new user();

// myEmitter.on("userCreated", (id, name) => {
//   console.log(`new user ${name} with ${id} created`);
// });

// myEmitter.on("userCreated", (id, name) => {
//   console.log(`new user ${name} with ${id} added in DB`);
// });

// myEmitter.emit("userCreated", 101, "srk");

//understanding streams
//solution 1: without readable and writable stream
// server.on("request", (req, res) => {
//   fs.readFile("./file/large-file.txt", (err, data) => {
//     if (err) {
//       res.end("something went wrong");
//     }
//     res.end(data);
//   });
// });

//solution 2: using readable and writable stream

// server.on("request", (req, res) => {
//   let rs = fs.createReadStream("./file/large-file.txt");

//   rs.on("data", (chunk) => {
//     res.write(chunk);
//   });

//   rs.on("end", () => {
//     res.end();
//   });

//   rs.on("error", (err) => {
//     res.end(err.message);
//   });
// });

//solution 3: using pipe method

server.on("request", (req, res) => {
  let rs = fs.createReadStream("./file/large-file.txt");

  rs.pipe(res);
  //readableSource.pipe(writableDest)
});
