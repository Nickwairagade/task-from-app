import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown,faDownload,faUser} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import Spiner from "../../components/Spiner/Spiner";
import {
  addData,
  dltdata,
  updateData,
} from "../../components/context/ContextProvider";
import Alert from "react-bootstrap/Alert";
import Tables from "../../components/Tables/Tables";
import "./Home.css";
import {
  usergetfunction,
  deletfunc,
  exporttocsvfunc,
} from "../../services/Apis";
import { toast } from "react-toastify";

const Home = () => {
  const [userdata, setUserdata] = useState([]);
  const [showspin, setShowSpin] = useState(true);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { useradd, setUseradd } = useContext(addData);
  const { update, setUpdate } = useContext(updateData);
  const { deletedata, setDeletedata } = useContext(dltdata);

  const navigate = useNavigate();

  const adduser = () => {
    navigate("/register");
  };

  // Get User
  const userGet = async () => {
    const response = await usergetfunction(search, gender, status, sort, page);
    // console.log(response);
    if (response.status === 200) {
      setUserdata(response.data.usersdata);
      setPageCount(response.data.Pagination.pageCount);
    } else {
      console.log("Error for get user data");
    }
  };

  // User Delete
  const deleteUser = async (id) => {
    const response = await deletfunc(id);
    if (response.status === 200) {
      userGet();
      setDeletedata(response.data);
    } else {
      toast.error("error");
    }
  };

  // export user
  const exportuser = async () => {
    const response = await exporttocsvfunc();
    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank");
    } else {
      toast.error("error !");
    }
  };
  // pagination
  // handle prev btn
  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  // handle next btn
  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [search, gender, status, sort, page]);
  return (
    <>
      {useradd ? (
        <Alert variant="success" onClose={() => setUseradd("")} dismissible>
          {useradd.fname.toUpperCase()} Succesfully Added
        </Alert>
      ) : (
        ""
      )}

      {update ? (
        <Alert variant="primary" onClose={() => setUpdate("")} dismissible>
          {update.fname.toUpperCase()} Succesfully Update
        </Alert>
      ) : (
        ""
      )}

      {deletedata ? (
        <Alert variant="danger" onClose={() => setDeletedata("")} dismissible>
          {deletedata.fname.toUpperCase()} Succesfully Delete
        </Alert>
      ) : (
        ""
      )}

      <div className="container">
        <div className="main_div">
          {/* search bar */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit"  style={{borderRadius: "0"}}>Submit</Button>
                </Col>
              </Row>
            </div>
            <div className="add_btn">
              <Col xs="auto" >
                <Button type="" className="" onClick={adduser}  style={{borderRadius: "0"}}>
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ marginRight: "8" + "px" }}
                  />
                  Add User
                </Button>
              </Col>
            </div>
          </div>
          {/* Export Gender And Status */}
          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_btn">
              <Col xs="auto">
                <Button
                  type=""
                  className="export_csv"
                  variant="success"
                  onClick={exportuser}
                  style={{borderRadius: "0"}}
                >
                  Export To CSV {" "}
                  <FontAwesomeIcon icon={faDownload} />
                </Button>
              </Col>
            </div>
            <div className="filter_gender">
              <div className="filter">
                <h5>Filter By Gender</h5>
                <div className="gender d-flex justify-content-around ">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="gender"
                    value={"All"}
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                    style={{marginRight: "5" + "px"}}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    onChange={(e) => setGender(e.target.value)}
                    style={{marginRight: "5" + "px"}}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Short By Value */}
            <div className="filter_Newold">
              <Dropdown className="text-center">
                <Dropdown.Toggle variant="success" id="dropdown-basic"  style={{borderRadius: "0"}}>
                  Short By Value {" "}
                  <FontAwesomeIcon icon={faChevronDown} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("new")}>
                    New
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>
                    Old
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {/* Short By Status */}
            <div className="filter-status">
              <div className="status">
                <h5>Filter By Status</h5>
                <div className="status-radio d-flex justify-content-around flex-wrap">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    onChange={(e) => setStatus(e.target.value)}
                    defaultChecked
                    style={{marginRight: "5" + "px"}}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"Active"}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{marginRight: "5" + "px"}}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"InActive"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showspin ? (
          <Spiner />
        ) : (
          <Tables
            userdata={userdata}
            deleteUser={deleteUser}
            userGet={userGet}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};

export default Home;
