import { Link, useNavigate } from "react-router";
import img from "../assets/Group 2.png";
import { useState } from "react";
import useAxios from "../hooks/useAxios";

const Login = () => {
  const axios = useAxios();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [chatSessions, setChatSessions] = useState([]);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);

    try {
      const response = await axios.post("login/", { email, password });

      if (response.status === 200) {
        const accessToken = response?.data?.access;

        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", response.data.refresh);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setChatSessions(response.data.chat_sessions || []);

        setData(response.data);
        setMessage("Login successful!");

        if (accessToken) {
          navigate("/chat", {
            state: { chatSessions: response.data.chat_sessions || [] },
          });
        }
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
    return (
      <p className="9/12 mx-auto bg-linear-to-r from-green-50 to-green-100 flex items-center justify-center h-screen">
        Loading....
      </p>
    );
  }

  console.log("from login", data);
  console.log("chatSessions state:", chatSessions);

  return (
    <div className="9/12 mx-auto bg-linear-to-r from-green-50 to-green-100 h-screen">
      <div className="flex items-center justify-center gap-10">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl text-center">Sign in to your account</h1>

            {/* login form */}
            <form className="fieldset" onSubmit={handleLogin}>
              <h1>{data?.user?.email}</h1>
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
