import axios from "axios";
require('dotenv').config()

const apiConnection = axios.create({
    baseURL: 'http://' + process.env.IP + ':' + process.env.PORT + '/login'
});

export default apiConnection;