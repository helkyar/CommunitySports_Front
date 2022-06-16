import axios from "axios";
const ENDPOINT = `${process.env.REACT_APP_API_URL}`;

export default function delUserEvent(params, jwt) {
  return axios
    .post(`${ENDPOINT}/event/del/user`, params, {
      headers: {
        authorization: jwt,
      },
    })
    .then((res) => {
      if (!res.data) throw new Error("Response is NOT ok");
      return res.data;
    })
    .catch(() => {
      console.log("ERR: 500");
    });
}
