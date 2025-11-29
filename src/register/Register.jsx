import { Link, useNavigate } from "react-router";
import img from "../assets/Group 2.png";
import { useState } from "react";
import useAxios from "../hooks/useAxios";

const Register = () => {
  const axios = useAxios();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerData = {
      full_name: e.target.full_name.value,
      phone_number: e.target.phone_number.value,
      email: e.target.email.value,
      address: e.target.address.value,
      password: e.target.password.value,
    };

    console.log(registerData, "from register");

    setLoading(true);

    try {
      const response = await axios.post("register/", registerData);

      if (response.status === 201) {
        setData(response.data);
        setMessage("Registration successful!");

        setError(null);
        setMessage("");

        navigate("/login")
      } else {
        setError(
          response.data.error || "Registration failed. Please try again."
        );
        setMessage("");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("An error occurred. Please try again later.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  // if (loading) {
  //   return <p>Loading....</p>;
  // }

  // if (error) {
  //   return <p>user not found,{error}</p>;
  // }
  console.log("from register", data);

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-green-50 to-green-100">
      <div className="w-full max-w-4xl flex justify-between bg-white shadow-lg rounded-lg p-8">
        {/* Form Section */}
        <div className="w-1/2">
          <h1 className="text-3xl font-semibold text-green-600 mb-4">
            Create Your Account
          </h1>
          <form className="space-y-4" onSubmit={handleRegister}>
            {loading && <p className="text-blue-500">Processing...</p>}

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              className="input input-bordered w-full p-3 rounded-md"
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              className="input input-bordered w-full p-3 rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="input input-bordered w-full p-3 rounded-md"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="input input-bordered w-full p-3 rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full p-3 rounded-md"
            />
            {/* <div className="flex items-center">
              <input
                type="checkbox"
                name="privacy"
                id="privacy"
                className="checkbox"
              />
              <label htmlFor="privacy" className="ml-2 text-sm text-gray-600">
                You agree to our friendly privacy policy.
              </label>
            </div> */}
            <button
              disabled={loading}
              type="submit"
              className="btn bg-green-600 text-white w-full py-3 rounded-md">
              Create Account
            </button>
            {message && (
              <p className={error ? "text-red-500" : "text-green-500"}>
                {message}
              </p>
            )}
            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 font-semibold">
                Log In
              </Link>
            </p>
          </form>
        </div>

        {/* Chatbot Section */}
        <div className="ml-10">
          <img src={img} alt="Assistant" className="" />
        </div>
      </div>
    </div>
  );
};

export default Register;
