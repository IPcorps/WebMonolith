"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.create=void 0;const fs_1=__importDefault(require("fs")),http_1=__importDefault(require("http"));function create(e){return http_1.default.createServer((function(e,t){let r,s;switch(e.url){case"/":r=fs_1.default.readFileSync(`${process.cwd()}/index.html`),s="text/html";break;case"/index.css":r=fs_1.default.readFileSync(`${process.cwd()}/index.css`),s="text/css";break;default:if(!fs_1.default.existsSync(process.cwd()+e.url))return;r=fs_1.default.readFileSync(process.cwd()+e.url),s="text/javascript"}t.writeHead(200,{"Content-Type":s,"Content-Length":r.length}).end(r)})).listen(e.port)}exports.create=create;