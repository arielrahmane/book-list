const fs = require('fs');
const path = require( 'path' );

const AL = path.relative('' ,'/Users/arielrahmane/Documents/Ariel/Libros/Books/A-L');
const MZ = path.relative('' ,'/Users/arielrahmane/Documents/Ariel/Libros/Books/m-z');
let books = '';
let booksObj = {};

const getBooks = (path: string, directory: string) => {
    const source = `${path}/${directory}`;
    return fs.readdirSync(source, { withFileTypes: true })
        .filter((dirent: any) => dirent.isDirectory())
        .map((dirent: any) => dirent.name);
}

const getAuthors = (source: string) => {
    return new Promise<void>((resolve, reject) => {
        fs.readdirSync(source, { withFileTypes: true })
            .filter((dirent: any) => dirent.isDirectory())
            .map((dirent: any) => {
                const b = getBooks(source, dirent.name);
                b.map((i: string) => books += i + `\n`);
            });
        resolve();
    })
}

getAuthors(AL);
getAuthors(MZ);


setTimeout(() => {
    fs.writeFile('books.txt', books, function (err: any) {
        if (err) return console.log(err);
        console.log('succesfully written');
    });
}, 2000);