var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,r,i){void 0===i&&(i=r),Object.defineProperty(e,i,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,i){void 0===i&&(i=r),e[i]=t[r]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&__createBinding(t,e,r);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","fs","https","http","./appSettings","./mime"],e)}((function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.create=void 0;const r=__importDefault(e("fs")),i=__importDefault(e("https")),n=__importDefault(e("http")),o=__importStar(e("./appSettings")),u=__importStar(e("./mime"));t.create=function(){let e=i.default,t={key:r.default.readFileSync("../server/crt/localhost.d.key"),cert:r.default.readFileSync("../server/crt/localhost.crt")};return o.settings.https||(e=n.default,t={}),e.createServer(t,((e,t)=>{let i,n;"/"===e.url&&(e.url="/index.html");const o=process.cwd()+e.url;if(r.default.existsSync(o)){i=r.default.readFileSync(o);const e=o.match(/[^.]*$/)?.[0];n=u.mime[e||""]}else i=Buffer.from("Hmm...something strange has happened &#129300"),n="text/html";t.writeHead(200,{"Content-Type":n,"Content-Length":i.length}).end(i)})).listen(o.settings.port)}}));