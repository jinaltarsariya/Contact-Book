import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

export default function User_Signup() {
  const [intialValue, setInitialValue] = useState({
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  const history = useHistory();

  const UserValidation = Yup.object().shape({
    username: Yup.string()
      .required("Username is Required !")
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Username must contain only letters and numbers"
      ),
    email: Yup.string()
      .required("Email is Required !")
      .email("Invalid email")
      .matches(
        /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address!"
      ),
    mobileNumber: Yup.string()
      .required("Mobile number is Required !")
      .matches(/^[0-9]{6,10}$/, "Mobile number must be 10 digits !"),
    password: Yup.string()
      .required("Password is Required !")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Confirm password is Required !"),
  });

  const handleUserSignupData = async (values, { resetForm }) => {
    try {
      let postUser = await axios.post(
        "http://localhost:3000/user/signup",
        values
      );

      if (postUser.data.flag === 0) {
        alert(postUser.data.msg);
      } else {
        resetForm();
        alert(postUser.data.msg);
        setTimeout(() => {
          history.push("/");
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
        validationSchema={UserValidation}
        onSubmit={handleUserSignupData}
      >
        <Form>
          <section>
            <div className="container">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-xl-8">
                  <h3 className="text-white my-4 text-center">
                    Registration Form
                  </h3>
                  <div className="card" style={{ borderRadius: "15px" }}>
                    <div className="card-body pt-4 p-2">
                      <div className="row align-items-center">
                        <div className="col-md-3 ps-5">
                          <h6 className="mb-0">
                            <label htmlFor="username" className="form-label">
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

                      <hr className="my-3" />

                      <div className="row align-items-center">
                        <div className="col-md-3 ps-5">
                          <h6 className="mb-0">
                            <label className="form-label" htmlFor="email">
                              Email
                            </label>
                          </h6>
                        </div>
                        <div className="col-md-9 pe-5">
                          <Field
                            id="email"
                            name="email"
                            placeholder="example@example.com"
                            className="form-control"
                          />
                          <div className="text-danger">
                            <ErrorMessage name="email" />
                          </div>
                        </div>
                      </div>

                      <hr className="my-3" />

                      <div className="row align-items-center">
                        <div className="col-md-3 ps-5">
                          <h6 className="mb-0">
                            <label
                              className="form-label"
                              htmlFor="mobileNumber"
                            >
                              Mobile Number
                            </label>
                          </h6>
                        </div>
                        <div className="col-md-9 pe-5">
                          <Field
                            id="mobileNumber"
                            name="mobileNumber"
                            placeholder="1234567890"
                            className="form-control"
                          />
                          <div className="text-danger">
                            <ErrorMessage name="mobileNumber" />
                          </div>
                        </div>
                      </div>

                      <hr className="my-3" />

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

                      <hr className="my-3" />

                      <div className="row align-items-center">
                        <div className="col-md-3 ps-5">
                          <h6 className="mb-0">
                            <label
                              className="form-label"
                              htmlFor="confirmPassword"
                            >
                              Confirm Password
                            </label>
                          </h6>
                        </div>
                        <div className="col-md-9 pe-5">
                          <Field
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="form-control"
                          />
                          <div className="text-danger">
                            <ErrorMessage name="confirmPassword" />
                          </div>
                        </div>
                      </div>

                      <hr className="my-3" />

                      <div className="px-5 pb-2 d-flex justify-content-between">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          id="userSignUpBtn"
                        >
                          Signup
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary ms-1"
                          id="userSignUpBtn"
                        >
                          <a
                            href="/"
                            className="text-light text-decoration-none"
                          >
                            Go to login page
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
