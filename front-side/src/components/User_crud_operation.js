import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";

export default function User_crud_operation() {
  const [contactData, setContactData] = useState([]);
  const [updateContact, setUpdateContact] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    mobileNumber: "",
  });

  const ContactValidation = Yup.object().shape({
    name: Yup.string()
      .required("Contact Name is required")
      .min(2, "Too Short!")
      .max(30, "Too Long!"),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{6,10}$/, "Mobile Number must be 10 digits")
      .required("Mobile Number is required"),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const headerToken = {
        headers: {
          token: localStorage.getItem("UserToken"),
        },
      };
      const response = await axios.get(
        "http://localhost:3000/contact",
        headerToken
      );
      setContactData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContactData = async (values, { resetForm }) => {
    try {
      if (isUpdateMode) {
        handleContactUpdate(values, { resetForm });
      } else {
        const headerToken = {
          headers: {
            token: localStorage.getItem("UserToken"),
          },
        };

        let response = await axios.post(
          "http://localhost:3000/contact/create",
          values,
          headerToken
        );

        setContactData([...contactData, response.data.data]);
        resetForm();
        fetchData();
      }
    } catch (error) {
      console.log("error ---> ", error.message);
    }
  };

  const handleContactUpdate = async (values, { resetForm }) => {
    try {
      const headerToken = {
        headers: {
          token: localStorage.getItem("UserToken"),
        },
      };
      let response = await axios.put(
        `http://localhost:3000/contact/update?contactId=${values._id}`,
        values,
        headerToken
      );

      setContactData((contactData) =>
        contactData.map((value) =>
          value._id === values._id ? response.data : value
        )
      );

      if (response.data.flag === 0) {
        alert(response.data.msg);
      }
      setUpdateContact(null);
      resetForm();
      fetchData();
    } catch (error) {
      console.log("error ---> ", error);
    }
  };

  const handleContactDelete = async (values) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (!confirmDelete) {
        return;
      }
      const headerToken = {
        headers: {
          token: localStorage.getItem("UserToken"),
        },
      };

      await axios.delete(
        `http://localhost:3000/contact/delete?contactId=${values._id}`,
        headerToken
      );
      fetchData();
    } catch (error) {
      console.log("Error deleting user:", error.message);
    }
  };

  return (
    <div style={{ backgroundColor: "#8CB9BD", minHeight: "100vh" }}>
      <div className="container py-5">
        <div className="border border-3 p-3">
          <h3 className="text-center text-decoration-underline mb-3">
            Add Contact
          </h3>
          <Formik
            initialValues={updateContact ? updateContact : initialValues}
            onSubmit={updateContact ? handleContactUpdate : handleContactData}
            validationSchema={ContactValidation}
            enableReinitialize={true}
          >
            <Form className="row g-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Contact Name
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Contact Name"
                  className="form-control"
                />
                <div className="text-danger">
                  <ErrorMessage name="name" />
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="mobileNumber" className="form-label">
                  Mobile Number
                </label>
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

              <div className="col-12">
                <button type="submit" className="btn btn-dark mt-3">
                  Add Contact
                </button>
              </div>
            </Form>
          </Formik>
        </div>

        <div className="border border-3 p-3 mt-5 mb-3">
          <h3 className="text-center text-decoration-underline mb-3">
            Contact List
          </h3>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Contact Name</th>
                  <th scope="col">Mobile Number</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {contactData && contactData.length > 0 ? (
                  contactData.map((value, index) => {
                    return (
                      <tr key={value._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{value.name}</td>
                        <td>{value.mobileNumber}</td>
                        <td>
                          {new Date(value.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          ) +
                            ", " +
                            new Date(value.createdAt).toLocaleTimeString(
                              "en-US"
                            )}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-dark m-1"
                            onClick={() => setUpdateContact(value)}
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            className="btn btn-dark m-1"
                            onClick={() => handleContactDelete(value)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="text-center">
                    <td colSpan="5">
                      <h3 className="py-3">No Contact available</h3>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
