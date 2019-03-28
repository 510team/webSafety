const serviceHost = "http://localhost:8362";

const login = {
  url: `/login/index`,
  method: "post"
};
const list = {
  url: `/list/index`,
  method: "get"
};
const add = {
  url: `/list/posted`,
  method: "post"
};
const edit = {
  url: `/list/edit`,
  method: "post"
};
const view = {
  url: `/list/view`,
  method: "get"
};

const deleted = {
  url: `/list/deleted`,
  method: "post"
};

export default { login, list, add, deleted, view, edit };