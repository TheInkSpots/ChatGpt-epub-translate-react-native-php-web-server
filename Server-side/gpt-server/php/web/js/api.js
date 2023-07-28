 function parameters(url) {
    // let paramString = new RegExp('(.*)[#](.*)').exec(url);    
    // if (null == paramString) {
    //     return { 'base': url, 'params': null };
    // }
    let paramString = [];
    if (url.indexOf("#") > -1) {

        paramString[0] = url;
        paramString[1] = url.substring(0, url.indexOf("#"));
        paramString[2] = url.substring(url.indexOf("#") + 1);
    } else {
        return { 'base': url, 'params': null };
    }

    if (isBase64(paramString[2])) {
        paramString[2] = JSON.parse(decodeURIComponent(escape(window.atob(paramString[2]))));
    }else{
        console.log('paramString2 is not ba64'); 
    }

    // if (paramString[2].includes("#")) {
    //     paramString[2] = paramString[2].split("#").join("&");
    // }

    // if (paramString[2].includes("&amp;")) {
    //     var paramList = paramString[2].split("&amp;");
    // } else {
    //     var paramList = paramString[2].split("&");
    // }
    // /*
    // if (paramString[2].includes("#")) {
    //     paramList.concat(paramString[2].split("#"));
    // }
    // */
    // let params = [];

    // for (let i = 0; i < paramList.length; i++) {
    //     let values = paramList[i].split("=");
    //     params[values[0]] = values[1];
    // }
    return { "base": paramString[1], "params": paramString[2] };
}

 function isBase64(str) {
    console.log("isBase64 checking:", str);
    if (str === '' || str.trim() === '') { return false; }
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        console.log("error checking ba64", err );
        return false;
    }
}
function hello() {
    console.log("hello");
    return 'hello2';
}
function _uuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
  