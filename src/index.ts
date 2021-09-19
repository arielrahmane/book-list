require('dotenv').config()
const fs = require('fs');
const path = require( 'path' );
interface Book {
    title: string;
    author: string;
    files: [];
}

const AL = path.relative('' , process.env.AL_PATH);
const MZ = path.relative('' ,process.env.MZ_PATH);
let booksStr = '';
let books = [] as Book[];

function getData(source: string): void {
    fs.readdirSync(source, { withFileTypes: true })
        .filter((dirent: any) => dirent.isDirectory())
        .map((dir: any) => {
            const authorName = dir.name;
            const authorDir = source + '/' + authorName;
            fs.readdirSync(authorDir, { withFileTypes: true })
                .filter((dirent: any) => dirent.isDirectory())
                .map((book: any) => {
                    const bookDir = authorDir + '/' + book.name;
                    let data = {
                        title: book.name,
                        author: authorName,
                        files: fs.readdirSync(bookDir, { withFileTypes: true }).map((file: any) => file.name)
                    } as Book;
                    books.push(data);
                })
        })
}

getData(AL);
getData(MZ);
fs.writeFile('books.json', JSON.stringify(books), function (err: any) {
    if (err) return console.log(err);
    console.log('succesfully written');
});