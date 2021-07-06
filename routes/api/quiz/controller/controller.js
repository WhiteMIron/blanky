const dirName = "C:\\Users\\user\\Documents\\blankyV5\\views"


exports.upper = function(req,res){
    res.sendFile(dirName + '/index.html');
}

exports.middle = function(req,res){
    res.sendFile(dirName + '/index2.html');
}

exports.lower = function(req,res){
    res.sendFile(dirName + '/index3.html');
}
