import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hook/useAuth";
import { useState } from "react";

const Login = () => {
  const [passwordError, setPasswordError] = useState("");
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setPasswordError(`Password must be 6 characters`);
      return 0;
    }
    setPasswordError("");

    logIn(email, password)
      .then((data) => {
        console.log(data);
        toast.success("Login Successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log("login error -", err);
        toast.error("Please check email and password and try again!");
      });
  };

  return (
    <section className="grid md:grid-cols-2">
      <div className="flex flex-col items-center justify-center gap-5 px-5">
        <h1 className="text-6xl font-extrabold">
          <Link to="/">ECOM</Link>
        </h1>
        <p className="md:w-3/4 text-center">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab natus ut
          culpa asperiores excepturi, laudantium facere ipsum reprehenderit
          veritatis ea ducimus voluptas. Rem reiciendis animi rerum aspernatur
          laboriosam vel.
        </p>
      </div>
      <div>
        <div className="bg-gray-50">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                  Login now
                </h1>
                <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  {passwordError && (
                    <p className="text-red-600 bg-red-100 py-1 px-2 text-sm mt-1">
                      {passwordError}
                    </p>
                  )}
                  {/* <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          aria-describedby="terms"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm text-gray-600">
                        <label
                          htmlFor="terms"
                          className="font-light"
                          >I accept the
                          <Link
                            className="font-medium hover:underline"
                            to="#"
                            >Terms and Conditions</Link></label
                        >
                      </div>
                    </div>  */}
                  <button
                    type="submit"
                    className="w-full text-white bg-gray-800 hover:bg-slate-400 hover:text-gray-800 duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Login
                  </button>
                  <p className="text-sm font-light text-black">
                    Don not have an account?{" "}
                    <Link
                      to="/register"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      {" "}
                      Create now
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
