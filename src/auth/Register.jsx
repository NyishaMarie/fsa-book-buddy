import {useState} from "react";
import {useAuth} from "./AuthContext";
import {Link, useNavigate} from "react-router";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const tryRegister = async (formData) => {
    setError(null);

    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await register({ email, password });
      navigate("/books");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Register for an account</h1>
      <form action={tryRegister}>
        <label>
          Username
          <input type="text" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Register</button>
        {error && <p role="alert">{error}</p>}
      </form>
        <Link to="/login">Already have an account? Log in here.</Link>
    </>
  );
}
