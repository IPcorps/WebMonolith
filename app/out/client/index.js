MONO.wsMono.on("connect",(async()=>console.log("The socket is connected"))),MONO.wsMono.on("upds:createMap",((o,n)=>{console.log(o),console.log(n)}));