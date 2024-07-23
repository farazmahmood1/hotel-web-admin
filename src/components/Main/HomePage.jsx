import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../Sourcefiles/BaseUrl";
import axios from "axios";
import productImage from "../Sourcefiles/Images/shopItems.png";
import baseUrlImages from '../Sourcefiles/BaseUrlImages'

const HomePage = () => {
  const [roleID, setRoleID] = useState("");
  const [isInvested, setIsInvested] = useState("0");
  const [packageDetails, setPackageDetails] = useState([]);

  const [loader, setLoader] = useState(false)

  useEffect(() => {
    SetLocalLogin();
  }, []);

  async function SetLocalLogin() {
    try {
      let user = await localStorage.getItem("user");
      let parsed_user = JSON.parse(user);
      if (parsed_user) {
        setRoleID(parsed_user);
        fetchUserState(parsed_user.id);
        getPackage(parsed_user.id);
      }
    } catch {
      return null;
    }
  }

  const fetchUserState = (id) => {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };
    fetch(`${baseUrl}fetchuserwithid/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setIsInvested(result.data.state);
      })
      .catch((error) => console.log("error", error));
  };


  const getPackage = (id) => {
    setLoader(true)
    const userObj = {
      investor_id: id,
    };

    axios
      .post(`${baseUrl}fetchInvestment`, userObj)
      .then((res) => {
        if (res.data.status === "401") {
          console.log(res.data);
        }
        else if (res.data.status === "200") {
          setLoader(false)
          console.log(res.data);
          setPackageDetails(res.data.data[0])
        }

      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="scroll-view-two scrollbar-secondary-two">
      <div className="content-wrapper">
        <h2 className="p-3" style={{ color: "#5e5873" }}>
          <b>Dashboard</b>
        </h2>

        <div className="row container mx-auto">
          <div className="col-lg-4">
            <div className="card border border-info ms-1 me-1 text-center card-styles">
              <img
                src={roleID.pro_pic == ! "" ? `${baseUrlImages}${roleID.pro_pic}` : "dist/img/avatar.jpg"}
                className="mx-auto card-img-top img-fluid mt-2 rounded-circle"
                alt="..."
                style={{ height: "140px", width: "140px" }}
              />
              <div className="card-body">
                <h5 className="card-text">
                  {roleID != "" ? roleID.firstname : ""}&nbsp;&nbsp;
                  {roleID != "" ? roleID.lastname : ""}
                </h5>
                <p className="card-text">Lahore, Pakistan</p>

                <Link
                  to="/ViewProfile"
                  className="btn btn-outline-info btn-sm me-1"
                >
                  View Profile
                </Link>
                <Link
                  to="/ViewProfile"
                  className="btn btn-outline-info btn-sm ms-1"
                >
                  Change Password
                </Link>
              </div>
              <div className="accordion" id="accordionExample">
                <div className="">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      More Info
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul className="list-group list-group-flush">
                        <div className="d-flex mt-2">
                          <div className="ms-3">
                            <i className="fa-solid fa-user me-2" />
                            <span style={{ fontSize: "15px" }}>Referral</span>
                          </div>
                          <div className="ms-auto me-3">
                            <p>
                              {isInvested === "0" ? "InActive" : roleID.referal_code}
                            </p>
                          </div>
                        </div>
                        <hr className="m-0" />
                        <div className="d-flex mt-2">
                          <div className="ms-3">
                            <i className="fa-solid fa-phone me-2" />
                            <span style={{ fontSize: "15px" }}>Phone</span>
                          </div>
                          <div className="ms-auto me-3">
                            <p>{roleID != "" ? roleID.phone : ""}</p>
                          </div>
                        </div>
                        <hr className="m-0" />
                        <div className="d-flex mt-2">
                          <div className="ms-3">
                            <i className="fa-solid fa-envelope me-2" />
                            <span style={{ fontSize: "15px" }}>Email</span>
                          </div>
                          <div className="ms-auto me-3">
                            <p>{roleID != "" ? roleID.email : ""}</p>
                          </div>
                        </div>
                        <hr className="m-0" />
                        <div className="d-flex mt-2">
                          <div className="ms-3">
                            <i className="fa-solid fa-calendar-day me-2" />
                            <span style={{ fontSize: "15px" }}>
                              Date of join
                            </span>
                          </div>
                          <div className="ms-auto me-3">
                            <p>{roleID != "" ? roleID.Idate : ""}</p>
                          </div>
                        </div>
                        <hr className="m-0" />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8 mt-1">
            <div className="row">
              <div className="col-lg-4">
                <div className="card" style={{ backgroundColor: "#00bcd4" }}>
                  <div className="card-body text-white p-4 shadow rounded">
                    <h4 className="text-end">
                      {isInvested === "0" ? "InActive" : roleID.referal_code}
                    </h4>
                    <p className="text-end">Referral</p>
                    <div className="d-flex justify-content-end">
                      <Link
                        to="/ViewProfile"
                        className="btn btn-sm btn-light me-1 shadow-lg rounded"
                      >
                        View
                      </Link>
                    </div>
                    <div className="icon-profiles">
                      <i className="fa-solid fa-coins card-icon" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card " style={{ backgroundColor: "#00bcd4" }}>
                  <div className="card-body text-white p-4 shadow rounded">
                    <h4 className="text-end">
                      {roleID != "" ? roleID.id : ""}
                    </h4>
                    <p className="text-end">My User ID</p>
                    <div className="d-flex justify-content-end">
                      <Link
                        to="/ViewProfile"
                        className="btn btn-sm btn-light me-1 shadow-lg rounded"
                      >
                        View
                      </Link>
                    </div>
                    <div className="icon-profiles">
                      <i className="fa-solid fa-users card-icon" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card" style={{ backgroundColor: "#00bcd4" }}>
                  <div className="card-body text-white p-4 shadow rounded">
                    <h4 className="text-end">
                      {roleID != "" ? roleID.username : ""}
                    </h4>
                    <p className="text-end">Username</p>
                    <div className="d-flex justify-content-end">
                      <Link
                        to="/ViewProfile"
                        className="btn btn-sm btn-light me-1 shadow-lg rounded"
                      >
                        View
                      </Link>
                    </div>
                    <div className="icon-profiles">
                      <i className="fa-solid fa-wallet card-icon" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card" style={{ backgroundColor: "#00bcd4" }}>
                  <div className="card-body text-white p-4 shadow rounded">
                    <h4 className="text-end">
                      {roleID != "" ? roleID.Idate : ""}
                    </h4>
                    <p className="text-end">Join Date</p>
                    <div className="d-flex justify-content-end">
                      <Link
                        to="/ViewProfile"
                        className="btn btn-sm btn-light me-1 shadow-lg rounded"
                      >
                        View
                      </Link>
                    </div>
                    <div className="icon-profiles">
                      <i className="fa-solid fa-wallet card-icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card card-styles border border-danger  m-3">
          <div className="card-header">
            <h5 className="text-danger">Important Notice</h5>
          </div>
          <div className="card-body">
            <p>Dear Users,</p>
            <p>
              After Depositing amount in our Account, Kindly wait for two working days. Your deposited amount will be added to your account.
            </p>
            <br />
            <p>Sincerely,</p>
            <p>The Sarayee Team.</p>
          </div>
        </div>


     

      </div>
    </div>
  );
};

export default HomePage;
