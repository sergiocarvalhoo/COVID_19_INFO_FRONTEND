import axios from "axios";
import {IP, PORT} from "@env";


const apiConnection = axios.create({
    baseURL: 'http://' + IP + ':' + PORT
});

export default apiConnection;
