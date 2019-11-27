var fs = require('fs');
var uuid = require('uuid/v1');

let upload = (base64Data) => {
	try
    {
        base64Data = base64Data.replace(/^data:([A-Za-z-+/]+);base64,/, "");
        let path = "images/" + uuid() + '.jpeg';
		require("fs").writeFileSync('public/' + path, base64Data, {encoding: 'base64'});
		return path;

    }
    catch(error)
    {
        console.log('ERROR:', error);
        return null;
    }
}

module.exports = upload;