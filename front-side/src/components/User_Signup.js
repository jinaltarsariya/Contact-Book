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
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits !"),
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
    <>
      <Formik
        initialValues={intialValue}
        validationSchema={UserValidation}
        onSubmit={handleUserSignupData}
      >
        <Form>
          <section class="vh-100" style={{ backgroundColor: "#8CB9BD" }}>
            <div class="container">
              <div class="row d-flex justify-content-center align-items-center">
                <div class="col-xl-8">
                  <h3 class="text-white my-4 text-center">Registration Form</h3>
                  <div class="card" style={{ borderRadius: "15px" }}>
                    <div class="card-body pt-4 p-2">
                      <div class="row align-items-center">
                        <div class="col-md-3 ps-5">
                          <h6 class="mb-0">
                            <label htmlFor="username">Username</label>
                          </h6>
                        </div>
                        <div class="col-md-9 pe-5">
                          <Field
                            id="username"
                            name="username"
                            placeholder="Username"
                            class="form-control"
                          />
                          <div className="text-danger">
                            <ErrorMessage name="username" />
                          </div>
                        </div>
                      </div>

                      <hr class="m-3" />

                      <div class="row align-items-center">
                        <div class="col-md-3 ps-5">
                          <h6 class="mb-0">
                            <label htmlFor="email">Email</label>
                          </h6>
                        </div>
                        <div class="col-md-9 pe-5">
                          <Field
                            id="email"
                            name="email"
                            placeholder="example@example.com"
                            class="form-control"
                          />
                          <div className="text-danger">
                            <ErrorMessage name="email" />
                          </div>
                        </div>
                      </div>

                      <hr class="m-3" />

                      <div class="row align-items-center">
                        <div class="col-md-3 ps-5">
                          <h6 class="mb-0">
                            <label htmlFor="mobileNumber">Mobile Number</label>
                          </h6>
                        </div>
                        <div class="col-md-9 pe-5">
                          <Field
                            id="mobileNumber"
                            name="mobileNumber"
                            placeholder="1234567890"
                            class="form-control"
                          />
                          <div className="text-danger">
                            <ErrorMessage name="mobileNumber" />
                          </div>
                        </div>
                      </div>

                      <hr class="m-3" />

                      <div class="row align-items-center">
                        <div class="col-md-3 ps-5">
                          <h6 class="mb-0">
                            <label htmlFor="password">Password</label>
                          </h6>
                        </div>
                        <div class="col-md-9 pe-5">
                          <Field
                            id="password"
                            name="password"
                            placeholder="Password"
                            class="form-control"
                          />
                          <div className="text-danger">
                            <ErrorMessage name="password" />
                          </div>
                        </div>
                      </div>

                      <hr class="m-3" />

                      <div class="row align-items-center">
                        <div class="col-md-3 ps-5">
                          <h6 class="mb-0">
                            <label htmlFor="confirmPassword">
                              Confirm Password
                            </label>
                          </h6>
                        </div>
                        <div class="col-md-9 pe-5">
                          <Field
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            class="form-control"
                          />
                          <div className="text-danger">
                            <ErrorMessage name="confirmPassword" />
                          </div>
                        </div>
                      </div>

                      <hr class="m-3" />

                      <div class="px-5 pb-2">
                        <button
                          type="submit"
                          class="btn btn-primary"
                          id="userSignUpBtn"
                        >
                          Submit
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
    </>
  );
}
