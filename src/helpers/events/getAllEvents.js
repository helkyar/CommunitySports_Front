import axios from "axios";
    
const getAllEvents = async (id) => {

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/event/allevents`);
    return response.data
  }
  catch(err) {
    console.log(err)
  }
}

export default getAllEvents;