import Axios from 'axios';
var root = process.env.API_ROOT;
const REQUIRE = Axios.create();
//请求拦截
REQUIRE.interceptors.request.use((config) => {
    //请求之前重新拼装url
    config.url = root + config.url;
    return config;
});
export default REQUIRE;