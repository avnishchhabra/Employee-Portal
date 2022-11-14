
import { notification } from 'antd';

const errorNotification = (args) => {
    notification.error(args);
};

const successNotification = (args) => {
    notification.success(args);
};
export { errorNotification, successNotification };
