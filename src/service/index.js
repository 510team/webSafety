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
const list = params => {
  const sendData = {
    ...serviceUrl.list,
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
const addArticle = params => {
  const sendData = {
    ...serviceUrl.add,
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
const editArticle = params => {
  const sendData = {
    ...serviceUrl.edit,
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
const deleteArticle = params => {
  const sendData = {
    ...serviceUrl.deleted,
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
const view = params => {
  const sendData = {
    ...serviceUrl.view,
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
export { login, list, addArticle, editArticle, deleteArticle, view };
