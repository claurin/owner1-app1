const fetchApi = async () => {

    const url = document.getElementById("inApi").value;
    const start = new Date();

    try {
        const response = await fetch(url);
        if(response.status >= 400) 
            handleError(await response.json(),start);
        else
            handleData(await response.json(),start); 
    }
    catch (err) { handleError(err,start); }                    
};
const fetchApi2 = async () => {

    
    const url = document.getElementById("inApi2").value;
    const start = new Date();
    const options = { "headers": { "authorization": connection.authToken() }};

    try {
        const response = await fetch(url,options);
        if(response.status >= 400) 
            handleError(await response.json(),start);
        else
            handleData(await response.json(),start); 
    }
    catch (err) { handleError(err,start); }                    
};        
const clearResp = () => {
    document.getElementById("response").innerHTML = '';
};

const handleData = (data,start) => { 
    if(data) {

        if(document.getElementById("chkAuto").checked) clearResp();

        document.getElementById("response").appendChild(document.createElement('p'))
            .innerHTML = `(${(new Date() - start)}ms): ${prettify(data)}`;
    }
};
const handleError = (err,start) => { 
    var errMsg = "";
    var browserTypeErrors = [
        "TypeError: NetworkError when attempting to fetch resource.",
        "TypeError: Failed to fetch"
    ];
    if(err && browserTypeErrors.includes( err.toString())) {
        errMsg = prettify({
            "Check console for possible network errors": {
                "DNS": 'Unresolved',
                "Server":'Unavailable, Timeout',
                "Header": 'Causes server to ignore, CORS',
                "Browser": 'Aborted for navigation'
            }
        });
    } else {
        errMsg = prettify(err);
    }
    var child = document.createElement('p');
    child.classList.add("is-error");

    if(document.getElementById("chkAuto").checked) clearResp();
    
    document.getElementById("response").appendChild(child)
        .innerHTML = `(${(new Date() - start)}ms): ${errMsg}`;
};   
const prettify = jsonObj => {
    return JSON.stringify(jsonObj, null, 2)
}  

const initialize = (() => {
    document.getElementById("inApi").value = `${location.href}api`;
    document.getElementById("inApi2").value = `${location.href}api`;
})();

connection.connect({
    badge: 'user',
    verbose: true,
    onConnect: () => {
        btnDisconnect = document.getElementById("btnDisconnect");
        btnDisconnect.classList.remove('hidden');
    }
});