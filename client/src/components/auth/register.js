import React, { Component } from "react";

//libraries
import { connect } from "react-redux"; //a component connected to react-redux is often called a container
import propTypes from "prop-types";
import { withRouter } from "react-router-dom"; // to redirect on prop receive

//Actions
import { registerUser } from "../../actions/authActions";

//components
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  //unless redux is implemented, component state must be set.
  //component state is set up in a constructor

  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    //when this components gets props though mapStateToProps
    //check out if the errors prop was received
    console.log(this.props.errors);
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(event) {
    //whatever is put into the input field, is going to be set as state
    //here we are constructing an object composed of [event.target.name]: event.target.value
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    //axios sends .post(string, content) to proxy+string
    // proxy was set up in package.json

    //the back end returns the user if the post request is successful.
    //or the errors if .catch(), if i get an error, i send it to state

    // axios
    //   .post("/api/users/register", newUser)
    //   .then(res => console.log(res.data))
    //   //currently res.data is the data sent by the back end
    //   .catch(err => this.setState({ errors: err.response.data }));

    /*ACTIOOOOOOOOON*/
    /*now every action that is imported will be in this.props*/

    //this
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    //  const errors = this.state.errors is the same than
    const errors = this.state.errors;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>

              <p className="lead text-center">
                Create your DevConnector account
              </p>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name."
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />

                {/*<div className="form-group">*/}
                {/*/!*====NAME====*!/*/}
                {/*<input*/}
                {/*type="text"*/}
                {/*className={classnames("form-control form-control-lg", {*/}
                {/*"is-invalid": errors.name*/}
                {/*//classnames ('default_classes', 'conditional_class':condition<boolean>)*/}
                {/*})}*/}
                {/*placeholder="Name"*/}
                {/*name="name"*/}
                {/*value={this.state.name}*/}
                {/*onChange={this.onChange}*/}
                {/*/>*/}

                {/*{errors.name && (*/}
                {/*<div className="invalid-feedback">{errors.name}</div>*/}
                {/*)}*/}
                {/*</div>*/}

                <TextFieldGroup
                  placeholder="Please enter your email."
                  name="email"
                  type={"email"}
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info={
                    "This site uses Gravatar so if you want a profile image, use a Gravatar email"
                  }
                />

                <TextFieldGroup
                  placeholder="Password."
                  name="password"
                  type={"password"}
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />

                <TextFieldGroup
                  placeholder="Please confirm your password."
                  name="password2"
                  type={"password"}
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

//get stuff from state into component
const mapStateToProps = state => ({
  //Here i choose what to get from state into this component (as props)
  //sooo
  //this.props.auth now contains the user object, so i could
  // this.props.user.name gives back the name
  auth: state.auth,
  errors: state.errors
});

//export default connect (null, {<object mapping actions>})(<component>)
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
