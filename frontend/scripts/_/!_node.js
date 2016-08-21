/*
if (!this.setImmediate && this.Promise) this.setImmediate = function(func) {
    new Promise(function(resolve){
      resolve();
    }).then(func);
};

var prefix = path.basename(file.relative, path.extname(file.relative));

path.exists(dir, function(exists) { 
    if (exists) { 
        console.log('exist ', dir);
    }
}); 

result.warnings().forEach(function (warn) {
    process.stderr.write(warn.toString());
});

if ( result.map ) {
    fs.writeFile(opts.to + '.map', result.map.toString());
}
*/

/*
return fs.readdirSync(pattern).filter(function(file){
    return fs.statSync(path.join(pattern, file)).isDirectory();
});
*/


/*
path.exists('foo.txt', function(exists) { 
  if (exists) { 
    // do something 
  } 
}); 

// or 

if (path.existsSync('foo.txt')) { 
  // do something 
} 

if (fs.existsSync('/etc/file')) {
    console.log('Found file');
}

stats = fs.statSync(path);

fs.stat(path, (err, stats) => {
    if ( !stats.isFile(filename) ) { // do this 
}
*/
