import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getBook, reserveBook } from "../api/books";
import { useAuth } from "../auth/AuthContext";

export default function BookDetails() {
    const { token } = useAuth();
    const { id } = useParams();

  
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);

const syncBook = async () => {
    const data = await getBook(id);
    setBook(data);
};

useEffect (() => {
    syncBook();
}, [id]);

const tryReserve = async () => {
    setError(null);

    try {
        await reserveBook(token, book.id);
        syncBook();
    } catch (e) {
        setError(e.message);
    }
};

if (!book) return <p>Loading...</p>;

return (
    <article>
        <img src={book.coverimage} alt={book.title} width="120" />
        <h1>{book.title}</h1>
        <p>by {book.author}</p>
        <p>{book.description}</p>
        {token && book.available && (
            <button onClick={tryReserve}>Reserve</button>
        )}
        {error && <p role="alert">{error}</p>}
    </article>
    );
}
