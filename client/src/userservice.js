import axios from "axios";
// const url = "http://localhost:5000/api/users";
import setAuthToken from "./helpers/setAuthToken";

class userservice {
  static register(email, password, username) {
    try {
      axios.post(`http://localhost:5000/api/users/register/`, {
        email,
        password,
        username
      });
      alert("regisetered successfully!");
    } catch (error) {
      if (error.message === "Request failed with status code 404") {
        alert("Please enter valid inputs");
      } else if (error.message === "Request failed with status code 401") {
        alert("Unauthorized");
      } else {
        alert(error.message);
      }
    }
  }

  static login(email, password) {
    try {
      const response = axios.post(`http://localhost:5000/api/users/login/`, {
        email,
        password
      });
      console.log(response);
      const token = response.token;
      localStorage.setItem("token", response.data.token);
      setAuthToken(token);
      this.setState({
        id: response.data.id
      });
      alert("You are now logged in");
      // this.refreshInfo();
    } catch (error) {
      if (error.message === "Request failed with status code 404")
        alert("Please enter valid email");
      else if (error.message === "Request failed with status code 400")
        alert("Password is incorrect");
      else alert(error.message);
    }
  }
}

export default userservice;
