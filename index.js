const { readdirSync } = require('fs');
const path = require( 'path' );

const relativePath = path.relative('' ,'/Users/arielrahmane/Documents/Ariel/Libros/Books/A-L');

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

console.log(getDirectories(relativePath));