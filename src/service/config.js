const serviceHost = "http://localhost:8362";

const login = {
  url: `/api/login/index`,
  method: "post"
};
const list = {
  url: `/api/list/index`,
  method: "get"
};
const add = {
  url: `/api/list/posted`,
  method: "post"
};
const view = {
  url: `/api/list/view`,
  method: "get"
};

const deleted = {
  url: `/api/list/deleted`,
  method: "post"
};

export default { login, list, add, deleted, view };
