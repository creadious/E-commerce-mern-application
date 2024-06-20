import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../hook/useAuth";
import { useState } from "react";
import { searchWord } from "../../utils/searchWords";

const Register = () => {
  const [passwordError, setPasswordError] = useState("");
  const { createUser, addNamePhoto } = useAuth();

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const gender = form.gender.value;
    const password = form.password.value;

    if (password.length < 6) {
      setPasswordError(`Password must be 6 characters`);
      return 0;
    }
    setPasswordError("");

    const userInfo = { firstName, lastName, email, gender, password };

    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        addNamePhoto(loggedUser, firstName).then(() => {
          axios
            .post("http://localhost:8000/api/v1/users/register", userInfo)
            .then((res) => {
              const userData = res.data;
              console.log(userData);
              toast.success("User create successfully");
              navigate("/");
            })
            .catch((err) => {
              console.log("backend error -", err);
            });
        });
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        const emailExist = searchWord(errorMessage, "email-already-in-use");
        if (emailExist) {
          return toast.error("Email already exist.");
        }
        console.error(`Registration error (${errorCode}) :`, errorMessage);
        toast.error("Registration failed. " + errorMessage);
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
                  Create an account
                </h1>
                <form
                  onSubmit={handleRegister}
                  className="space-y-4 md:space-y-6"
                >
                  <div className="flex gap-2 justify-between">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-medium"
                      >
                        First Name
                      </label>
                      <input
                        type="name"
                        name="firstName"
                        id="firstName"
                        className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-medium"
                      >
                        Last Name
                      </label>
                      <input
                        type="name"
                        name="lastName"
                        id="lastName"
                        className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Paul"
                        required
                      />
                    </div>
                  </div>
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
                      required
                    />
                  </div>
                  <div className="">
                    <label
                      htmlFor="gender"
                      className="block mb-2 text-sm font-medium"
                    >
                      Gender
                    </label>
                    <div className="flex gap-4">
                      <div>
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="male"
                          required
                        />
                        <label htmlFor="male" className="cursor-pointer">
                          Male
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="female"
                          name="gender"
                          value="female"
                          required
                        />
                        <label htmlFor="female" className="cursor-pointer">
                          Female
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="others"
                          name="gender"
                          value="others"
                          required
                        />
                        <label htmlFor="others" className="cursor-pointer">
                          Others
                        </label>
                      </div>
                    </div>
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
                      autoComplete="false"
                      className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                    {passwordError && (
                      <p className="text-red-600 bg-red-100 py-1 px-2 text-sm mt-1">
                        {passwordError}
                      </p>
                    )}
                  </div>
                  <div className="flex items-start">
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
                      <label htmlFor="terms" className="font-light">
                        I accept the{" "}
                        <Link className="font-medium hover:underline" to="#">
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-gray-800 hover:bg-slate-400 hover:text-gray-800 duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Register
                  </button>
                  <p className="text-sm font-light text-black">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
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

export default Register;
