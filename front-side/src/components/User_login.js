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
    <>
      <Formik
        initialValues={intialValue}
        validationSchema={UserLoginValidation}
        onSubmit={handleUserLoginData}
      >
        <Form>
          <section class="vh-100" style={{ backgroundColor: "#8CB9BD" }}>
            <div class="container">
              <div class="row d-flex justify-content-center align-items-center">
                <div class="col-xl-7">
                  <h2 class="text-white mt-5 mb-3 text-center">Login Form</h2>

                  <div class="card" style={{ borderRadius: "15px" }}>
                    <div class="card-body p-5">
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

                      <hr class="m-4" />

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

                      <hr class="m-4" />

                      <div class="px-5 mt-4">
                        <button
                          type="submit"
                          class="btn btn-primary"
                          id="userSignUpBtn"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-center mt-3">
                    <a href="/signup" className="text-dark">
                      Sign up
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          </section>
        </Form>
      </Formik>
    </>
  );
}
