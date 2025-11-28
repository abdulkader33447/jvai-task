import { Link } from "react-router";
// import Login from "../login/Login";
// import Register from "../register/Register";

const Home = () => {
  return (
    <div>
      {/* <Login /> */}
      {/* <Register /> */}
      <h1 className="font-bold text-5xl text-center">Task</h1>
      <div className="flex gap-10 w-6/12 mx-auto items-center">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Home;
