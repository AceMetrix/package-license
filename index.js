var fs = require('fs');
var path = require('path');

var potentialFilenames = ['LICENSE', 'README', 'README.md', 'README.markdown','license.txt'];

var licenseFromString = function(str){
    if (str.indexOf('MIT') > -1) {
        return 'MIT*';
    } else if (str.indexOf('BSD') > -1) {
        return 'BSD*';
    } else if (str.indexOf('Apache License') > -1) {
        return 'Apache*';
    } else if (str.indexOf('DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE') > -1) {
        return 'WTF*';
    }  
}

module.exports = function(packagePath){
    for (var i = 0; i < potentialFilenames.length; i++){
        var file = potentialFilenames[i];
        if (fs.existsSync(path.resolve(packagePath, file)))
            return licenseFromString(fs.readFileSync(path.resolve(packagePath, file), 'utf8'));
    }
    return null;
}
