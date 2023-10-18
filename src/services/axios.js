import axios from 'axios';

const Axios = axios.create({
    // baseURL: process.env.REACT_APP_SERVERURL,
    baseURL: 'http://localhost:5000/',
    headers: {
        "Content-Type": 'application/json'
    }
});

// export const AxiosImage = axios.create({
//     // baseURL: process.env.REACT_APP_SERVERURL,
//     baseURL: 'http://localhost:5000/',
//     headers: {
//         'Content-Type': 'multipart/form-data'
//     }
// })

export default Axios;