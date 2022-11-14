import LS from './Ls';

const axios_config = {
    headers: {
        Authorization: 'Bearer ' + LS.get('token') 
    }
}
export default axios_config;