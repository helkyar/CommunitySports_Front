import axios from "axios";
const ENDPOINT = `${process.env.REACT_APP_API_URL}`;

export default async function startSession(sessionParams, endpoint) {
  return axios
    .post(`${ENDPOINT}/session/${endpoint}`, sessionParams)
    .then((res) => {
      console.log(res)
      if (!res.data.token) throw new Error("Response is NOT ok");
      console.log(res.data)
      return res.data;
    })
    .catch((err) => {
      console.log(err, "ERR: 500");
    });
  // return fetch(`${ENDPOINT}/session/${endpoint}`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(sessionParams),
  // })
  //   .then((res) => {
  //     if (!res.ok) throw new Error("Response is NOT ok");
  //     return res.json();
  //   })
  //   .then((res) => {
  //     const { jwt } = res;
  //     return jwt;
  //   })
  //   .catch(() => {
  //     console.log("ERR: 500");
  //   });
}
