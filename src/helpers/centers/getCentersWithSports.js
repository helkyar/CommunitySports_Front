import axios from "axios";

const getCentersWithSports = async () => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/center/centersWithSports`);
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

export default getCentersWithSports;