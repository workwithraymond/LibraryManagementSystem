const express = require('express');
const app = express();
const PORT = 3000;


const books = [{
    bookName: "Rudest Book Ever",
    bookAuthor: "Shwetabh Gangwar",
    bookPages: 200,
    bookPrice: 240,
    bookState: "Available"
},
{
    bookName: "Do Epic Shit",
    bookAuthor: "Ankur Wariko",
    bookPages: 200,
    bookPrice: 240,
    bookState: "Available"
}
]


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render("index", { data: books })
}),

app.post("/", (req, res) => {
    const inputBookName = req.body.bookName
    const inputBookAuthor = req.body.bookAuthor
    const inputBookPages = req.body.bookPages
    const inputBookPrice = req.body.bookPrice
    
    books.push({
        bookName: inputBookName,
        bookAuthor: inputBookAuthor,
        bookPages: inputBookPages,
        bookPrice: inputBookPrice,
        bookState: "Available"
    })
    
    res.render("index", {
        data: books
    })
 }),

 app.post('/issue', (req, res) => {
    var requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName == requestedBookName) {
            book.bookState = "Issued";
        }
    })
    res.render("index", {
        data: books
    })
 }),

 app.post('/return', (req, res) => {
    var requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName == requestedBookName) {
            book.bookState = "Available";
        }
    })
    res.render("index", {
        data: books
    })
 })

 app.post('/delete', (req, res) => {
    var requestedBookName = req.body.bookName;
    var j = 0;
    
    books.forEach(book => {
        j = j + 1;
        if (book.bookName == requestedBookName) {
            books.splice((j - 1), 1)
        }
    })
    
    res.render("index", {
        data: books
    })
 })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})