import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Layout from "../layout";
import Login from "../pages/login";
import store from "../redux/store";
import LS from "../utils/Ls";

const withAuth = (Component) => {
  const Auth = (props) => {
    const [token, setToken] = useState(false);

    useEffect(() => {
      setToken(LS.get('token'))
    }, []);

    if (!token) {
      return <Login />;
    }

    return (
      <Provider store={store}>
        <Layout>
          <Component {...props} />
        </Layout>
      </Provider>
    );
  };

  // Copy getInitial props so it will run as well
  // if (Component.getInitialProps) {
  //     Auth.getInitialProps = Component.getInitialProps;
  // }

  return Auth;
};

export default withAuth;
