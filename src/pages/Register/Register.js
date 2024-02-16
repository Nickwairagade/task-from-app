import React, { useContext, useEffect, useState } from "react";
import "./Register.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import img from "../../assets/images/profile1.png";
import register from "../../assets/images/register.png";
import { registerfunc } from "../../services/Apis";
import Spiner from "../../components/Spiner/Spiner";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { addData } from "../../components/context/ContextProvider";
import UploadFile from "../../components/UploadFile/UploadFile";

const Register = () => {
  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [showspin, setShowSpin] = useState(true);

  const navigate = useNavigate();

  const { useradd, setUseradd } = useContext(addData);

  // status optios
  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  // status set
  const setStatusValue = (e) => {
    setStatus(e.value);
  };

  // profile set
  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  //submit userdata
  const submitUserData = async (e) => {
    e.preventDefault();

    const { fname, lname, email, mobile, gender, location } = inputdata;

    if (fname === "") {
      toast.error("First name is Required !");
    } else if (lname === "") {
      toast.error("Last name is Required !");
    } else if (email === "") {
      toast.error("Email is Required !");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !");
    } else if (mobile === "") {
      toast.error("Mobile is Required !");
    } else if (mobile.length > 10) {
      toast.error("Enter Valid Mobile!f");
    } else if (gender === "") {
      toast.error("Gender is Required !");
    } else if (status === "") {
      toast.error("Status is Required !");
    } else if (image === "") {
      toast.error("Prfile is Required !");
    } else if (location === "") {
      toast.error("location is Required !");
    } else {
      console.log(image);

      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      data.append("user_profile", image);
      data.append("location", location);

      const config = {
        "Content-Type": "multipart/form-data",
      };

      const response = await registerfunc(data, config);

      if (response.status === 200) {
        setInputData({
          ...inputdata,
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: "",
        });
        setStatus("");
        setImage("");
        setUseradd(response.data);
        navigate("/");
      } else {
        toast.error("Error!");
      }
    }
  };

  // Add And Remove

  const [serviceList, setServiceList] = useState([{ service: "" }]);

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };

  // Hide and show Select option
  const [showhide, setShowhide] = useState("");

  const handleshowhide = (event) => {
    const getuser = event.target.value;
    setShowhide(getuser);
  };

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }

    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [image]);

  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container">
          <Card className="shadow mt-3 p-3">
            <div className="profile_div">
              <Form>
                <Row>
                  <div className="">
                    <div className="mb-3">
                      <h2 style={{ color: "#0099ff" }}>Personal Information</h2>
                    </div>
                    <Row>
                      <Form.Group
                        className="mb-3 col-lg-4 col-md-6"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="fname"
                          value={inputdata.fname}
                          onChange={setInputValue}
                          placeholder="Enter First Name"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3 col-lg-4 col-md-6"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Last Name </Form.Label>
                        <Form.Control
                          type="text"
                          name="lname"
                          value={inputdata.lname}
                          onChange={setInputValue}
                          placeholder="Enter Last Name"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3 col-lg-4 col-md-6"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={inputdata.email}
                          onChange={setInputValue}
                          placeholder="Enter email"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3 col-lg-4 col-md-6"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                          type="number"
                          name="mobile"
                          value={inputdata.mobile}
                          onChange={setInputValue}
                          placeholder="Enter Mobile Number"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3 col-lg-4 col-md-6"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Enter Your Location</Form.Label>
                        <Form.Control
                          type="text"
                          name="location"
                          value={inputdata.location}
                          onChange={setInputValue}
                          placeholder="Enter Your Location"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3 col-lg-4 col-md-6"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Select Your Gender</Form.Label>
                        <Form.Check
                          type={"radio"}
                          label={`Male`}
                          name="gender"
                          value={"Male"}
                          onChange={setInputValue}
                        />
                        <Form.Check
                          type={"radio"}
                          label={`Female`}
                          name="gender"
                          value={"Female"}
                          onChange={setInputValue}
                        />
                      </Form.Group>
                    </Row>
                    <hr />
                    <Row>
                      <div className="mb-3">
                        <h2 style={{ color: "#0099ff" }}>Education</h2>
                      </div>
                      <Form.Group
                        className="mb-3 col-lg-5 col-md-4"
                        controlId="formBasicEmail"
                      >
                        <div className="col-sm-6 col-lg-12 ">
                          <div className="col-md-10 col-lg-12 mb-3">
                            <Form.Label>Select Your Education</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              name="education"
                              className="form-control"
                              controlId="formBasicEmail"
                              onChange={(e) => {
                                handleshowhide(e);
                                setStatusValue(e);
                              }}
                            >
                              <option value="">Select Education</option>
                              <option value="1">SSC</option>
                              <option value="2">HSC</option>
                              <option value="3">Diploma</option>
                              <option value="4">UG</option>
                              <option value="5">PG</option>
                            </Form.Select>
                          </div>

                          {showhide === "1" && (
                            <div className="col-md-12 col-lg-12 form-group">
                              <Form.Group
                                className="mb-3 col-lg-12 col-md-6"
                                controlId="formBasicEmail"
                              >
                                <div className="mb-3">
                                  <Form.Check
                                    type="radio"
                                    label="Science"
                                    name="radioGroup"
                                    id="option1"
                                    inline
                                    defaultChecked
                                  />
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="Arts"
                                    name="radioGroup"
                                    id="option2"
                                  />
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="Commerce"
                                    name="radioGroup"
                                    id="option3"
                                  />
                                </div>
                              </Form.Group>
                            </div>
                          )}

                          {showhide === "2" && (
                            <div className="col-md-12 col-lg-12 form-group">
                              <Form.Group
                                className="mb-3 col-lg-12 col-md-6"
                                controlId="formBasicEmail"
                              >
                                <div className="mb-3">
                                  <Form.Check
                                    type="radio"
                                    label="Engineeing"
                                    name="radioGroup"
                                    id="option1"
                                    inline
                                    defaultChecked
                                  />
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="Medical"
                                    name="radioGroup"
                                    id="option2"
                                  />
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="BSC"
                                    name="radioGroup"
                                    id="option3"
                                  />
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="BBA"
                                    name="radioGroup"
                                    id="option3"
                                  />
                                </div>
                              </Form.Group>
                            </div>
                          )}

                          {showhide === "3" && (
                            <div className="col-md-12 col-lg-12 form-group">
                              <Form.Group
                                className="mb-3 col-lg-12 col-md-6"
                                controlId="formBasicEmail"
                              >
                                <div className="mb-3">
                                  <Form.Check
                                    type="radio"
                                    label="Engineeing"
                                    name="radioGroup"
                                    id="option1"
                                    inline
                                    defaultChecked
                                  />
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="BBA"
                                    name="radioGroup"
                                    id="option2"
                                  />
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="BSC"
                                    name="radioGroup"
                                    id="option3"
                                  />
                                </div>
                              </Form.Group>
                            </div>
                          )}

                          {showhide === "4" && (
                            <div className="col-md-12 col-lg-12 form-group">
                              <Form.Group
                                className="mb-3 col-lg-12 col-md-6"
                                controlId="formBasicEmail"
                              >
                                <div className="mb-3">
                                  <Form.Check
                                    type="radio"
                                    label="M Tech."
                                    name="radioGroup"
                                    id="option1"
                                    inline
                                    defaultChecked
                                  />
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="MBA"
                                    name="radioGroup"
                                    id="option2"
                                  />
                                  <Form.Check
                                    inline
                                    type="radio"
                                    label="MD"
                                    name="radioGroup"
                                    id="option3"
                                  />
                                </div>
                              </Form.Group>
                            </div>
                          )}

                          {showhide === "5" && (
                            <div className="col-md-12 col-lg-12 form-group">
                              <Form.Group
                                className="mb-3 col-lg-12 col-md-6"
                                controlId="formBasicEmail"
                              >
                                <div className="mb-3">
                                  <Form.Check
                                    type="radio"
                                    label="PhD."
                                    name="radioGroup"
                                    id="option1"
                                    inline
                                    defaultChecked
                                  />
                                </div>
                              </Form.Group>
                            </div>
                          )}
                        </div>
                      </Form.Group>

                      <Form.Group
                        className="mb-3 col-lg-4 col-md-6"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Select Your Status</Form.Label>
                        <Select options={options} onChange={setStatusValue} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3 col-lg-4 col-md-4"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Select Your Profile</Form.Label>
                        <Form.Control
                          type="file"
                          name="user_profile"
                          placeholder="Enter Your Profile Image"
                          onChange={setProfile}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3 col-lg-1 col-md-4"
                        controlId="formBasicEmail"
                      >
                        <div className="profile_div text-center">
                          <img
                            src={preview ? preview : img}
                            alt="img"
                            className="profile"
                          />
                        </div>
                      </Form.Group>
                      <Form.Group
                        className="mb-3 col-lg-4 col-md-4"
                        controlId="formBasicEmail"
                      >
                        <div className="form-field">
                          <label htmlFor="service">Service</label>
                          {serviceList.map((singleService, index) => (
                            <div key={index} className="services">
                              <div className="first-division">
                                <input
                                  name="service"
                                  type="text"
                                  id="service"
                                  value={singleService.service}
                                  onChange={(e) =>
                                    handleServiceChange(e, index)
                                  }
                                  required
                                />
                                {serviceList.length - 1 === index &&
                                  serviceList.length < 4 && (
                                    <button
                                      type="button"
                                      onClick={handleServiceAdd}
                                      className="add-btn"
                                    >
                                      <span>Add a Service</span>
                                    </button>
                                  )}
                              </div>
                              <div className="second-division">
                                {serviceList.length !== 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleServiceRemove(index)}
                                    className="remove-btn"
                                  >
                                    <span>Remove</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </Form.Group>
                    </Row>
                    <hr />
                    <Row>
                      <div className="mb-3">
                        <h2 style={{ color: "#0099ff" }}>Upload Document</h2>
                      </div>
                      <UploadFile />
                    </Row>
                    <Row>
                      <Form.Group>
                        <Button
                          className="col-lg-3"
                          variant="primary"
                          type="submit"
                          size="sm"
                          style={{
                            borderRadius: "0",
                            backgroundColor: "#002b80",
                          }}
                          onClick={submitUserData}
                        >
                          SUBMIT
                        </Button>
                      </Form.Group>
                    </Row>
                  </div>
                </Row>
              </Form>
            </div>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  );
};

export default Register;
