import { Link } from "react-router";
// import Login from "../login/Login";
// import Register from "../register/Register";

const Home = () => {
  return (
    <div className="bg-linear-to-r from-green-50 to-green-100 h-screen space-y-10 flex flex-col justify-center">
      {/* <Login /> */}
      {/* <Register /> */}
      <h1 className="font-bold text-5xl text-center">Task</h1>
      <div className="flex gap-10 w-6/12 mx-auto justify-center items-center">
        <Link className="btn" to="/login">Login</Link>
        <Link className="btn" to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Home;
