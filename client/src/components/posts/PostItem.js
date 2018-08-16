import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

//actions
import { addLike, deletePost, removeLike } from "../../actions/postactions";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }
  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                {/*LIKE BUTTON*/}
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={this.onLikeClick.bind(this, post._id)}
                >
                  <i
                    //this will pass the post to find user info, which searches the id of the post in the ids in the likes array
                    //if found return true
                    className={classNames("fas fa-thumbs-up", {
                      "text-success": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>

                {/*UNLIKE BUTTON*/}
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>

                {/*COMMENTS BUTTON*/}
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
