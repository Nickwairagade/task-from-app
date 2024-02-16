import React from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import Paginations from "../Pagination/Paginations";
import { BASE_URL } from "../../services/helper";
import { NavLink } from "react-router-dom";
import { statuschangefunc } from "../../services/Apis";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faEye,
  faPencil,
  faTrash,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import "./table.css";

const Tables = ({
  userdata,
  deleteUser,
  userGet,
  handlePrevious,
  handleNext,
  page,
  pageCount,
  setPage,
}) => {
  const handleChange = async (id, status) => {
    const response = await statuschangefunc(id, status);

    if (response.status === 200) {
      userGet();
      toast.success("Status Updated");
    } else {
      toast.error("error ");
    }
  };

  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className="shadow">
              <Table className="align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>&nbsp;&nbsp;Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.length > 0 ? (
                    userdata.map((element, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1 + (page - 1) * 4}</td>
                            <td>{element.fname + element.lname}</td>
                            <td>{element.email}</td>
                            <td>{element.gender == "Male" ? "M" : "F"}</td>
                            <td className="d-flex align-items-center">
                              <Dropdown className="text-center">
                                <Dropdown.Toggle
                                  className="dropdown_btn"
                                  id="dropdown-basic"
                                >
                                  <Badge
                                    bg={
                                      element.status == "Active"
                                        ? "primary"
                                        : "danger"
                                    }
                                    style={{
                                      fontSize: "12" + "px",
                                      padding: "10" + "px",
                                      borderRadius: "0"
                                    }}
                                  >
                                    {element.status}{" "}
                                    <FontAwesomeIcon
                                      icon={faAngleDown}
                                      style={{ fontSize: "12" + "px" }}
                                    />
                                  </Badge>
                                </Dropdown.Toggle>
                                <Dropdown.Menu >
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleChange(element._id, "Active")
                                      
                                    }
                                  >
                                    Active
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleChange(element._id, "InActive")
                                    }
                                  >
                                    InActive
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            <td className="img_parent">
                              <img
                                src={`${BASE_URL}/uploads/${element.profile}`}
                                alt="img"
                              />
                            </td>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="light"
                                  className="action"
                                  id="dropdown-basic"
                                >
                                  <FontAwesomeIcon icon={faEllipsisVertical} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/userprofile/${element._id}`}
                                      className="text-decoration-none"
                                    >
                                      <Button variant="success"  style={{borderRadius: "0"}}>
                                        <FontAwesomeIcon
                                          icon={faEye}
                                          style={{ color: "#fff" }}
                                        />
                                      </Button>{" "}
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/edit/${element._id}`}
                                      className="text-decoration-none"
                                    >
                                      <Button variant="primary"  style={{borderRadius: "0"}}>
                                        <FontAwesomeIcon
                                          icon={faPencil}
                                          style={{ color: "#fff" }}
                                        />
                                      </Button>{" "}
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <div
                                      onClick={() => deleteUser(element._id)}
                                    >
                                      <Button variant="danger"  style={{borderRadius: "0"}}>
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                          style={{ color: "#fff" }}
                                        />
                                      </Button>{" "}
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <div className="no_data text-center">NO Data Found</div>
                  )}
                </tbody>
              </Table>
              <Paginations
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div>
    </>
  );
};

export default Tables;
