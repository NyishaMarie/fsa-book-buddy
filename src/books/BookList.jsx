import { Link } from "react-router";

export default function BookList({ books }) {
return (
    <ul>
      {books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </ul>
  );
}

function BookListItem({ book }) {
return (
    <li>
        <Link to={"/books/" + book.id}>
            <img src={book.coverimage} alt={book.title} width="80" />
            <h3>{book.title}</h3>
        </Link>
            <p>{book.author}</p>
            <p>{book.description}</p>
    </li>
  );
}