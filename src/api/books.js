const API = import.meta.env.VITE_API;

//Fetches an array of all books
export async function getBooks() {
    try {
        const response = await fetch(API + "/books");
        const result = await response.json();
    return result;
    } catch (e) {
        console.error(e);
    return [];
    }
}

//Fetches a single book by its ID
export async function getBook(id) {
    try {
        const response = await fetch(API + "/books/" + id);
        const result = await response.json();
    return result;
    } catch (e) {
        console.error(e);
    return null;
    }
}

//Reserves a book for the logged in user

export async function reserveBook(token, bookId) {
    if (!token) {
        throw Error("You must be signed in to reserve a book.");
    }

const response = await fetch(API + "/reservations", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    },
        body: JSON.stringify({ bookId }),
});

    if (!response.ok) {
        const result = await response.json();
        throw Error(result.message);
    }
}

//Returns (deletes) a reservation for the logged in user

export async function returnBook(token, reservationId) {
    if (!token) {
        throw Error("You must be signed in to return a book.");
    }

const response = await fetch(API + "/reservations/" + reservationId, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
});

    if (!response.ok) {
        const result = await response.json();
        throw Error(result.message);
    }
}