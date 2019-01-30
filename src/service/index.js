import service from "./service";
import serviceUrl from "./config";
const login = params => {
    const sendData = {
        ...serviceUrl.login,
        data: params
    };
    return service(sendData)
        .then(data => {
            return Promise.resolve(data);
        })
        .catch(err => {
            return Promise.reject(err);
        });
};
export { login };
