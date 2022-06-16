import axios from "axios";

const getAllSports = async (id) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/sport/all-sports`);
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

export default getAllSports;