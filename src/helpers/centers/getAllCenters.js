import axios from "axios";
    
const getAllCenters = async (id) => {

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/center/allcenters`);
    return response.data
  }
  catch(err) {
    console.log(err)
  }
}

export default getAllCenters;