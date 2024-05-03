import http from "k6/http";
import { check, fail } from "k6";
import { registerUser, loginUser, getUser } from "./helper/user.js";
import { getToken } from "./create-contact.js";

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 10,
  // A string specifying the total duration of the test run.
  duration: "5s",
  summaryTrendStats: ["avg", "min", "med", "max", "p(90)", "p(95)", "p(99)"],
};

export default function () {
  const uniqueId = new Date().getTime();
  const registerRequest = {
    username: `user-${uniqueId}`,
    password: "rahasia",
    name: "Muhammad Zaidan",
  };
  registerUser(registerRequest);

  const loginRequest = {
    username: `user-${uniqueId}`,
    password: "rahasia",
  };

  loginUser(loginRequest);

  const token = getToken();
  getUser(token);
}
