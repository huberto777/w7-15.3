import axios from "axios";

const BASE_URL = "http://localhost:5000/timeboxes";
function getToken(token) {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
}

const AxiosTimeboxesAPI = {
  getAllTimeboxes: async function (accessToken) {
    // console.log({accessToken});
    const response = await axios.get(BASE_URL, getToken(accessToken));
    const timeboxes = response.data;
    return timeboxes;
  },
  addTimebox: async function (timeboxToAdd, accessToken) {
    const response = await axios.post(
      BASE_URL,
      timeboxToAdd,
      getToken(accessToken)
    );
    const addedTimebox = response.data;
    return addedTimebox;
  },
  replaceTimebox: async function (timeboxToReplace, accessToken) {
    if (!timeboxToReplace.id) {
      throw new Error("Timebox has to have an id to be updated");
    }
    const response = await axios.put(
      `${BASE_URL}/${timeboxToReplace.id}`,
      timeboxToReplace,
      getToken(accessToken)
    );
    const replacedTimebox = response.data;
    return replacedTimebox;
  },
  removeTimebox: async function (timeboxToRemove, accessToken) {
    if (!timeboxToRemove.id) {
      throw new Error("Timebox has to have an id to be updated");
    }
    await axios.delete(
      `${BASE_URL}/${timeboxToRemove.id}`,
      getToken(accessToken)
    );
  },
};

export default AxiosTimeboxesAPI;
