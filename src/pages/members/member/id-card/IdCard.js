import React from "react";
import "./id-card.scss";
import logo from "../../../../assets/logo.png";
import userIcon from "../../../../assets/user.png";
import { toDateView } from "../../../../services/toDateView";
// import { ReactComponent as WavyImg } from "../../../../assets/id/curve.svg";
import MySVG from "../../../../assets/id/circle-heat-svgrepo-com.svg";
export const IdCard = React.forwardRef((props, ref) => {
  let { member, family } = props;

  if (!member) return;

  return (
    <div ref={ref} className="id-card">
      {/* <div className="front">
        <div className="top">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="title">
            <h3>SNDP Yogam Salalah</h3>
            <p>"Educate and Enlighten</p>
            <p>Organize and Strengthen"</p>
          </div>
        </div>
        <div className="bottom">
          <div className="photo">
            {member.photo && member.photo.includes("http") ? (
              <img src={member.photo} alt="User Image" />
            ) : (
              <img src={userIcon} alt="User Image" />
            )}
          </div>
          <div className="info">
            <p className="name">{member.name || "Name"}</p>
            <p>{member.member_code || "Member ID"}</p>
          </div>
          <div className="info-all">
            <div className="left">
              <p>
                <span className="title">Shakha: </span>
                {member.shakha}
              </p>
              <p>
                <span className="title">DOB: </span>
                {toDateView(member.DOB)}
              </p>
              <p>
                <span className="title">Blood: </span>
                {member.blood_group}
              </p>
              <p>
                <span className="title">Mobile: </span>
                {member.WhatsApp_no}
              </p>
              <p>
                <span className="title">Valid upto: </span>
                {toDateView(member.expiry)}
              </p>
            </div>
            <div className="right">
              <h4 className="title">Family Members:</h4>
              {family.map((item, index) => {
                return <p key={index}>{item.family_member_name}</p>;
              })}
            </div>
          </div>
        </div>
      </div> */}
      <div className="front">{/* <img src={MySVG} /> */}</div>
    </div>
  );
});
