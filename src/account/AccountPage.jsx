import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { returnBook } from "../api/books";

export default function AccountPage() {
    const { token, getMe } = useAuth();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const syncUser = async () => {
        const data = await getMe();
        setUser(data);
    };

    useEffect(() => {
        if (token) syncUser();
    }, [token]);

    const tryReturn = async (reservationId) => {
        setError(null);
        try {
            await returnBook(token, reservationId);
            syncUser();
        } catch (e) {
            setError(e.message);
        }
    };

    if (!token) {
        return (
            <p>
                Please <Link to="/login">log in</Link> or{" "}
                <Link to="/register">register</Link> to view your account.
            </p>
        );
    }

    if (!user) return <p>Loading...</p>;

    return (
        <>
            <h1>
                {user.firstname} {user.lastname}
            </h1>
            <p>{user.email}</p>

            <h2>Your reservations</h2>
            <ul>
                {user.reservations.map((reservation) => (
                    <li key={reservation.id} className="reservation-item">
                        {reservation.title}
                        <button onClick={() => tryReturn(reservation.id)}>Return</button>
                    </li>
                ))}
            </ul>
            {error && <p role="alert">{error}</p>}
        </>
    );
}