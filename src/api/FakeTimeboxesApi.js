import uuid from "uuid";

function wait(ms = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
const timeboxes = [
  { id: 1, title: "Uczę się o promises", totalTimeInMinutes: 25 },
  { id: 2, title: "Poznaję REST API", totalTimeInMinutes: 10 },
  { id: 3, title: "Ćwiczę async/await", totalTimeInMinutes: 15 },
  { id: 4, title: "Uczę się fetch", totalTimeInMinutes: 5 }
];
function findIndexByAnId(id) {
  const result = timeboxes.findIndex(timebox => timebox.id === id);
  if (result < 0) {
    throw new Error("Timebox o podanym id nie istnieje");
  }
  return result;
}
const FakeTimeboxesAPI = {
  getAllTimeboxes: async function(accessToken) {
    // console.log({ accessToken });
    await wait(1000);
    // console.log("GET all", timeboxes);
    if (accessToken) {
      return [...timeboxes];
    }
  },
  addTimebox: async function(timeboxToAdd, accessToken) {
    await wait(1000);
    const addedTimebox = { ...timeboxToAdd, id: uuid.v4() };
    timeboxes.push(addedTimebox);
    console.log("POST", timeboxes);
    if (accessToken) {
      return addedTimebox;
    }
  },
  replaceTimebox: async function(timeboxToReplace, accessToken) {
    await wait(1000);
    if (!timeboxToReplace.id) {
      throw new Error("Cannot replace timebox without an id.");
    }
    const index = findIndexByAnId(timeboxToReplace.id);
    const replacedTimebox = { ...timeboxToReplace };
    timeboxes[index] = replacedTimebox;
    console.log("PUT", timeboxes);
    if (accessToken) {
      return replacedTimebox;
    }
  },
  removeTimebox: async function(timeboxToRemove, accessToken) {
    await wait(1000);
    if (!timeboxToRemove.id) {
      throw new Error("Cannot remove timebox without an id.");
    }
    const index = findIndexByAnId(timeboxToRemove.id);
    if (accessToken) {
      timeboxes.splice(index, 1);
      console.log("DELETE", timeboxes);
    }
  }
};

export default FakeTimeboxesAPI;
