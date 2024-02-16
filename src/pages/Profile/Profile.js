import React,{useState,useEffect} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Spiner from "../../components/Spiner/Spiner";
import "./Profile.css";
import profile_page from "../../assets/images/profile-page.png";
import { useNavigate, useParams } from "react-router-dom";
import { singleUsergetfunc } from "../../services/Apis";
import { BASE_URL } from "../../services/helper";
import moment from "moment"

const Profile = () => {
  const [userprofile,setUserProfile] = useState({});
  const [showspin, setShowSpin] = useState(true);
  const navigate = useNavigate();

  const {id} = useParams();

  const userProfileGet = async()=>{
    const response = await singleUsergetfunc(id);
    
    if(response.status === 200){
      setUserProfile(response.data)
    }else{
      console.log("error");
    }
  }

  useEffect(() => {
    userProfileGet();
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [id])
  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container">
          <Row>
            <div className="col-lg-4" style={{ textAlign: "center" }}>
              <Card style={{ width: "100%" }} className="shadow mt-3 p-3">
                <Card.Img
                  variant="top"
                  src={`${BASE_URL}/uploads/${userprofile.profile}`}
                  style={{ width: "150px", alignSelf: "center" }}
                />
                <Card.Body>
                  <Card.Title>{userprofile.fname + userprofile.lname}</Card.Title>
                  <Card.Text>
                    <p className="text-muted mb-1">Full Stack Developer</p>
                  </Card.Text>
                  <Button variant="primary">Massage</Button>{" "}
                  <Button variant="outline-primary">Follow</Button>{" "}
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-8">
              <Card style={{ width: "100%" }} className="shadow mt-3 p-3">
                <Card.Body>
                  <Row>
                    <div className="col-lg-6">
                      <Card.Img
                        variant="top"
                        src={profile_page}
                        style={{ width: "300px", height: "300px" }}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Card.Title>Name</Card.Title>
                      <Card.Text>{userprofile.fname + userprofile.lname}</Card.Text>
                      <Card.Title>Phone No.</Card.Title>
                      <Card.Text>{userprofile.mobile}</Card.Text>
                      <Card.Title>Email</Card.Title>
                      <Card.Text>{userprofile.email}</Card.Text>
                      <Card.Title>Location</Card.Title>
                      <Card.Text>{userprofile.location}</Card.Text>
                      <Card.Title>Created Date</Card.Title>
                      <Card.Text>{moment(userprofile.datecreated).format("DD-MM-YYYY")}</Card.Text>
                      <Button variant="primary" href='/'>Back User List</Button>
                    </div>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </Row>
        </div>
      )}
    </>
  );
};

export default Profile;
