// const dirName = "C:\\Users\\user\\Documents\\FtpTest\\zeroxflow\\views"
// const dirName = "/home/ec2-user/zeroxflow v5/zeroxflow/views"
const dirName ="C:\\Users\\user\\Documents\\blanky\\views"
exports.upper = function(req,res){
    console.log(dirName)
    res.sendFile(dirName + '/index.html');
}

exports.middle = function(req,res){
    res.sendFile(dirName + '/index2.html');
}

exports.lower = function(req,res){
    res.sendFile(dirName + '/index3.html');
}
