import '../styles/globals.css';
import '../styles/flex.css';
import '../styles/spacing.css';
import '../styles/pages/login.css';
import 'antd/dist/antd.css';
import '../styles/pages/employeeList.css';
import withAuth from '../hoc/withAuth';
import axios from 'axios';

axios.defaults.baseURL = "https://pythondemo123.herokuapp.com/"

function MyApp({ Component, pageProps }) {

  return <Component {...pageProps} />
}

export default withAuth(MyApp);
