import axios from "axios";

const getExchange = axios.create({
    baseURL: "https://economia.awesomeapi.com.br",
});

export default getExchange;