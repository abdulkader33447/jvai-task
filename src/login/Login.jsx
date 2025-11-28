import { Link } from "react-router";
import img from "../assets/Group 2.png";
import { useState } from "react";
import useAxios from "../hooks/useAxios";

const Login = () => {
  const axios = useAxios();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);

    try {
      const response = await axios.post("login/", { email, password });

      if (response.status === 200) {
        setData(response.data);
        setMessage("Login successful!");
      } else {
        setError(response.data.error || "Login failed. Please try again.");
        setMessage("");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again later.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading....</p>;
  }
  console.log("from login", data);

  return (
    <div className="9/12 mx-auto bg-[#E6FFF2] h-screen">
      <div className="flex items-center justify-center gap-10">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl text-center">Sign in to your account</h1>
            <form className="fieldset" onSubmit={handleLogin}>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                required
              />
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
                required
              />
              <button className="btn bg-[#25D366] text-white mt-4">
                Sign In
              </button>
            </form>
            {message && (
              <p className={error ? "text-red-500" : "text-green-500"}>
                {message}
              </p>
            )}
            <p className="text-center">
              Don’t have an account?{" "}
              <Link to="/register" className="text-green-600 font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        <div>
          <img src={img} alt="Assistant" />
        </div>
      </div>
    </div>
  );
};

export default Login;
