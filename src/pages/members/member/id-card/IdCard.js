import React from "react";
import "./id-card.scss";
import idSide from "../../../../assets/id-card/id-side.png";
import idBottom from "../../../../assets/id-card/id-bottom.png";
import idBack from "../../../../assets/id-card/id-back.png";
import idlogo from "../../../../assets/id-card/id-logo.png";
import userIcon from "../../../../assets/user.png";
import { toDateView } from "../../../../services/toDateView";

export const IdCard = React.forwardRef((props, ref) => {
  let { member, family } = props;

  if (!member) return;

  return (
    <div ref={ref} className="id-card">
      <div className="front">
        <div className="title">
          <h2>SNDP YOGAM, OMAN</h2>
          <h2>SALALAH UNION</h2>
        </div>

        <div className="bar"></div>

        <div className="sub-title">
          <p>
            <em>"Educate and Enlighten</em>
          </p>
          <p>
            <em>Organize and Strengthen"</em>
          </p>
        </div>

        <div className="photo">
          {member.photo && member.photo.includes("http") ? (
            <img src={member.photo} alt="User Image" />
          ) : (
            <img src={userIcon} alt="User Image" />
          )}
        </div>

        <div className="front-info">
          <p className="name">{member.name}</p>
          <p className="shakha">{member.shakha}</p>
          <p className="id">ID No: {member.member_code}</p>
        </div>

        <div className="footer">
          <p className="expiry-date">
            Valid Upto {toDateView(member.member_code)}
          </p>
        </div>

        <div className="id-logo">
          <img src={idlogo} alt="" />
        </div>
        <div className="id-side">
          <img src={idSide} alt="" />
        </div>
        <div className="id-bottom">
          <img src={idBottom} alt="" />
        </div>
      </div>

      <div className="back">
        {/* <div className="front-info">
          <p className="name">{member.name}</p>
          <p className="shakha">{member.shakha}</p>
          <p className="id">ID No: {member.member_code}</p>
        </div> */}
        <div className="back-info">
          <h3 className="family-title">FAMILY MEMBERS</h3>
          {family.map((item) => {
            return (
              <p className="family-member-name">{item.family_member_name}</p>
            );
          })}
          <p className="dob">DOB: {toDateView(member.DOB)}</p>
          <p className="blood">Blood: {member.blood_group}ve</p>
          <p className="phone">Phone: {member.WhatsApp_no}</p>
        </div>

        <div className="footer">
          <p className="expiry-date">Email: salalahsndp@gmail.com</p>
        </div>

        <div className="id-logo">
          <img src={idlogo} alt="" />
        </div>
        <div className="id-side">
          <img src={idSide} alt="" />
        </div>
        <div className="id-back">
          <img src={idBack} alt="" />
        </div>
      </div>
    </div>
  );
});
