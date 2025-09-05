const backendDomain = "http://localhost:8080";

const SummaryApi = {
  saveList: {
    url: `${backendDomain}/api/save-user`,
    method: "POST",
  },
  getList: {
    url: `${backendDomain}/api/get-user`,
    method: "GET",
  },
  editUser: {
    url: `${backendDomain}/api/edit-user`,
    method: "PUT",
  },
  deleteUser: {
    url: `${backendDomain}/api/delete-user`,
    method: "DELETE",
  },
};

export default SummaryApi;
