import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//components
import isEmpty from "../../validation/isEmpty";

class UserProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    //get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    //skill list
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className={"p-3"}>
        <i className="fa fa-check" /> {skill}
      </div>
    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info"> Bio of {firstName}</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{firstName} doesn't have a bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(UserProfileAbout);
