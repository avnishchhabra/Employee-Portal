import '../styles/globals.css';
import '../styles/flex.css';
import '../styles/spacing.css';
import '../styles/sizes.css';
import '../styles/colors.css';
import '../styles/pages/login.css';
import '../styles/pages/dashboard.css';
import 'antd/dist/antd.css';
import '../styles/pages/addQuestions.css';
import '../styles/pages/employeeList.css';
import withAuth from '../hoc/withAuth';


function MyApp({ Component, pageProps }) {

  return <Component {...pageProps} />
}

export default withAuth(MyApp);
