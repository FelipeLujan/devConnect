//libraries
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

//actions
import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp.id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="{YYYY/MM/DD}">{exp.from}</Moment>
          {" - "}
          {exp.to === null ? (
            "Current"
          ) : (
            <Moment format="{YYYY/MM/DD}">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Time Frame</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

//connect(mapStateToProps, {action}) (withConnect(ComponentName))
export default connect(
  null,
  { deleteExperience }
)(Experience);