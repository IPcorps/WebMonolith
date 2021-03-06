
/**
 * APPLICATION SCRIPT (CLIENT)
 */

import MONO from "./wm/mono"; // -DEL

// ACCESS TO LIFECYCLE STAGES WITH APPLICATION INITIALIZATION ===

// 1. At the start, it is possible to use:
//      - MONO.mWS to create your own web socket connection
//      - MONO.mDX to create your own IndexedDB database

(async () => {

    /**
     * STEP 1. CREATING A MONO WEB SOCKET CONNECTION TO THE RESOURCE SERVER AND GETTING A RESOURCE MAP
     */
    const ws = await MONO.initWS().catch(console.log);

    if (!ws) console.log("ws: offline mode");

    // 2. Here it also becomes possible to use:
    //      - MONO.wsMono or the returned result for requests to the resource server via the Mono working socket
    //      - MONO.paramsWS an object with data received from the server
    //          - MONO.paramsWS.online network availability
    console.log("MONO.paramsWS.online:", MONO.paramsWS.online);

    // Getting the update metadata
    if (ws) {

        // @ts-ignore
        const wsArrMeta = await MONO.wsGetUpdMeta().catch(console.log);
        console.log("ws: metadata received for updating");

        // 3. Additionally available for use:
        //          - MONO.paramsWS.devMode to get the application operation mode (development/production)
        console.log("MONO.paramsWS.devMode:", MONO.paramsWS.devMode);
        //          - MONO.paramsWS.arrMetaFiles full map of server resource metadata (IMeta[])
        console.log("MONO.paramsWS.arrMeta:", MONO.paramsWS.arrMeta);

    }

    /**
     * STEP 2. READING (CREATING) A MONO INDEXEDDB DATABASE AND UPDATING (CREATING) A RESOURCE MAP WITH A STATUS FLAG
     */
    // @ts-ignore
    const dx = await MONO.initDX().catch(console.log);

    // 4. Here it also becomes possible to use:
    //      - MONO.dxMono or the returned result for accessing the mono database, which is called "Mono"
    //      - MONO.paramsDX intermediate data object
    //          - MONO.paramsDX.arrMap array of metadata prepared for updating
    console.log("MONO.paramsDX.arrMap:", MONO.paramsDX.arrMap);
    //          - MONO.paramsDX.sizeUpd the size of the downloaded data during the update
    console.log("MONO.paramsDX.sizeUpd:", MONO.paramsDX.sizeUpd);


    /**
     * STEP 3. THE APPLICATION UPDATE PROCESS
     */

    // Configuring the callback function that tracks the update progress via the MONO.paramsUpd settings object
    MONO.paramsUpd.cb = (sizeProgress, sizeUpd) => {

        console.log(`Received ${sizeProgress} out of ${sizeUpd}`);

        // 5. Direct access to the download progress variables is also possible here
        //      - MONO.paramsUpd.sizeProgress the current amount of downloaded data
        console.log("MONO.paramsUpd.sizeProgress:", MONO.paramsUpd.sizeProgress);
        //      - MONO.paramsUpd.sizeUpd total amount of data to download
        console.log("MONO.paramsUpd.sizeUpd:", MONO.paramsUpd.sizeUpd);

    }

    // Starting the update process
    // @ts-ignore
    const upd = await MONO.updateMono().catch(console.log);

    // 6. Here the updated data in indexeddb becomes available, and in addition:
    //      - MONO.paramsUpd.sizeRes the size of resources in IndexedDB (excluding overhead)
    console.log("MONO.paramsUpd.sizeRes:", MONO.paramsUpd.sizeRes);


    /**
     * STEP 4. SETTING UP A SERVICE WORKER
     */

    // If the operation of the application after installation does not require the Internet,
    // it is possible to install a service worker for full offline work.
    MONO.setSW();

    // >>> FROM THIS MOMENT ON, THE ENVIRONMENT IS RELEVANT AND THE APPLICATION CODE CAN BE WRITTEN <<<

    console.log("Start the application (client)");

    // Getting an object of information about the application and quotas
    // (to transfer additional data to the application, they can be included in the info.json file.
    // They will become available after the next resource update in the object received by calling MONO.getInfo())

    // Getting data from the info file
    const infoBlob = await MONO.get("info.json");
    if (infoBlob) {
        const infoText = await infoBlob.text();
        const infoObject = await JSON.parse(infoText);
        // Getting data about the storage
        const storData = await navigator.storage.estimate();
        // Getting data about the size of resources without metadata
        const sizeRes = MONO.paramsUpd.sizeRes;

        // Displaying information about the application
        console.log(({ ...infoObject, ...storData, sizeRes }));
    }

})();
