var fs = require('fs');
var path = require('path');

var potentialFilenames = ['LICENSE', 'license.txt', 'README', 'README.md', 'README.markdown'];

var licenseFromString = function(content){
    var licenses = [];
    if (content.indexOf('MIT') > -1) licenses.push('MIT*');
    if (content.indexOf('BSD') > -1) licenses.push('BSD*');
    if (content.indexOf('Apache License') > -1) licenses.push('Apache*');
    if (content.indexOf('Mozilla') > -1) licenses.push('Mozilla*');
    if (content.indexOf('LGPL') > -1) licenses.push('LGPL*');
    if (content.indexOf('Affero') > -1) licenses.push('GPL*');
    if (content.indexOf('GPL') > -1) licenses.push('GPL*');
    if (content.indexOf('Eclipse') > -1) licenses.push('Eclipse*');
    if (content.indexOf('Artistic') > -1) licenses.push('Artistic*');
    if (content.indexOf('DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE') > -1) licenses.push('WTF*');
    return licenses;
}

module.exports = function(packagePath){
    var files = fs.readdirSync(packagePath);
    for (var i = 0; i < potentialFilenames.length; i++){
        for (var j = 0; j < files.length; ++j) {
            // Do a case-insensitive match to find files named
            // Readme.md or other variations
            if (potentialFilenames[i].toLowerCase() === files[j].toLowerCase()) {
                var licenses = licenseFromString(fs.readFileSync(path.resolve(packagePath, files[j]), 'utf8'));
                
                // if only one license is found remove array
                if (licenses && licenses.length === 1) licenses = licenses[0];
                
                return licenses;
            }
        }
    }
    return [];
}
