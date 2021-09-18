const fs = require('fs');
const path = require( 'path' );

const AL = path.relative('' ,'/Users/arielrahmane/Documents/Ariel/Libros/Books/A-L');
const MZ = path.relative('' ,'/Users/arielrahmane/Documents/Ariel/Libros/Books/m-z');
let books = '';

const getBooks = (path, directory) => {
    const source = `${path}/${directory}`;
    return fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}

const getAuthors = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => {
        const b = getBooks(source, dirent.name);
        b.map(i => books += i + `\n`);
    });

getAuthors(AL);
getAuthors(MZ);


setTimeout(() => {
    fs.writeFile('books.txt', books, function (err) {
        if (err) return console.log(err);
        console.log('succesfully written');
    });
}, 2000);