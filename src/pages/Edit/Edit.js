import React, { useContext, useEffect, useState } from "react";
import "./Edit.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import img from "../../assets/images/profile1.png";
import register from "../../assets/images/register.png";
import Select from "react-select";
import Spiner from "../../components/Spiner/Spiner";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { updateData } from "../../components/context/ContextProvider";
import { editfunc, singleUsergetfunc } from "../../services/Apis";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../services/helper";


const Edit = () => {
  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  const [status, setStatus] = useState("Active");
  const [imgdata, setImgdata] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const { update, setUpdate } = useContext(updateData);

  const navigate = useNavigate();

  const [showspin, setShowSpin] = useState(true);

  const { id } = useParams();

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

  const userProfileGet = async () => {
    const response = await singleUsergetfunc(id);

    if (response.status === 200) {
      setInputData(response.data);
      setStatus(response.data.status);
      setImgdata(response.data.profile);
    } else {
      console.log("error");
    }
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
    } else if (imgdata === "") {
      toast.error("Prfile is Required !");
    }else if (location === "") {
      toast.error("location is Required !");
    } else {
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      data.append("user_profile", image || imgdata);
      data.append("location", location);

      const config = {
        "Content-Type": "multipart/form-data",
      };

      const response = await editfunc(id, data, config);

      if (response.status === 200) {
        setUpdate(response.data);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    userProfileGet();
  }, [id]);

  useEffect(() => {
    if (image) {
      setImgdata("");
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
                  <div className="col-lg-6">
                    <div className="profile_div text-center">
                      <img
                        src={image ? preview : `${BASE_URL}/uploads/${imgdata}`}
                        alt="img"
                        className="profile"
                      />
                    </div>
                    <img src={register} alt="img" className="register" />
                  </div>
                  <div className="col-lg-6">
                    <h4>Registration</h4>
                    <hr />
                    <Row>
                      <Form.Group
                        className="mb-3 col-lg-6"
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
                        className="mb-3 col-lg-6"
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
                        className="mb-3 col-lg-6"
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
                        className="mb-3 col-lg-6"
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
                        className="mb-3 col-lg-6"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Select Your Gender</Form.Label>
                        <Form.Check
                          type={"radio"}
                          label={`Male`}
                          name="gender"
                          value={"Male"}
                          checked={inputdata.gender == "Male" ? true : false}
                          onChange={setInputValue}
                        />
                        <Form.Check
                          type={"radio"}
                          label={`Female`}
                          name="gender"
                          value={"Female"}
                          checked={inputdata.gender == "Female" ? true : false}
                          onChange={setInputValue}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3 col-lg-6"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Select Your Status</Form.Label>
                        <Select
                          options={options}
                          defaultValue={status}
                          onChange={setStatusValue}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3 col-lg-6"
                        controlId="formBasicEmail"
                      >
                        <Form.Label>Select Your Profile</Form.Label>
                        <Form.Control
                          type="file"
                          name="user_profile"
                          placeholder="Select Your Profile"
                          onChange={setProfile}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3 col-lg-6"
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

                      <Button
                        className="col-lg-3"
                        variant="primary"
                        type="submit"
                        size="sm"
                        onClick={submitUserData}
                      >
                        Submit
                      </Button>
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

export default Edit;
