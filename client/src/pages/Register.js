import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../redux/features/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password, firstName, lastName, confirmPassword } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password should match");
    }
    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(register({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-3x" />
        <h4>Sign Up</h4>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3">
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide your first name"
              invalid
            >
              <MDBInput
                label="First Name"
                type="text"
                name="firstName"
                value={firstName}
                onChange={onInputChange}
                id="validationCustom01"
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide your last name"
              invalid
            >
              <MDBInput
                label="Last Name"
                type="text"
                name="lastName"
                value={lastName}
                onChange={onInputChange}
                id="validationCustom02"
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide your email"
              invalid
            >
              <MDBInput
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={onInputChange}
                id="validationCustom03"
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide your password"
              invalid
            >
              <MDBInput
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={onInputChange}
                id="validationCustom04"
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide your  confirm password"
              invalid
            >
              <MDBInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onInputChange}
                id="validationCustom04"
                required
              />
            </MDBValidationItem>

            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already have an account ? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
