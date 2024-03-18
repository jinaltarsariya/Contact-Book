import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function User_login() {
  const [intialValue, setInitialValue] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  const UserLoginValidation = Yup.object().shape({
    username: Yup.string().required("Username is Required !"),
    password: Yup.string().required("Password is Required !"),
  });

  const handleUserLoginData = async (values, { resetForm }) => {
    try {
      let postUser = await axios.post(
        "http://localhost:3000/user/login",
        values
      );

      if (postUser.data.flag === 0) {
        alert(postUser.data.msg);
      } else {
        localStorage.setItem("UserToken", postUser.data.data);
        resetForm();
        alert(postUser.data.msg);
        setTimeout(() => {
          history.push("/contact");
        }, 1500);
      }
    } catch (error) {
      console.log("errror ----> ", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#8CB9BD", minHeight: "100vh" }}>
      <Formik
        initialValues={intialValue}
        validationSchema={UserLoginValidation}
        onSubmit={handleUserLoginData}
      >
        <Form>
          <section>
            <div className="container">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-xl-7">
                  <h2 className="text-white mt-5 mb-3 text-center">
                    Login Form
                  </h2>

                  <div className="card" style={{ borderRadius: "15px" }}>
                    <div className="card-body p-5">
                      <div className="row align-items-center">
                        <div className="col-md-3 ps-5">
                          <h6 className="mb-0">
                            <label className="form-label" htmlFor="username">
                              Username
                            </label>
                          </h6>
                        </div>
                        <div className="col-md-9 pe-5">
                          <Field
                            id="username"
                            name="username"
                            placeholder="Username"
                            className="form-control"
                          />
                          <div className="text-danger">
                            <ErrorMessage name="username" />
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />

                      <div className="row align-items-center">
                        <div className="col-md-3 ps-5">
                          <h6 className="mb-0">
                            <label className="form-label" htmlFor="password">
                              Password
                            </label>
                          </h6>
                        </div>
                        <div className="col-md-9 pe-5">
                          <Field
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="form-control"
                          />
                          <div className="text-danger">
                            <ErrorMessage name="password" />
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />

                      <div className="px-5 mt-4 d-flex justify-content-between">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          id="userSignUpBtn"
                        >
                          Login
                        </button>

                        <button
                          type="submit"
                          className="btn btn-primary ms-1"
                          id="userSignUpBtn"
                        >
                          <a
                            href="/signup"
                            className="text-light text-decoration-none"
                          >
                            Go to signup page
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Form>
      </Formik>
    </div>
  );
}
