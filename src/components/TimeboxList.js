import React from "react";

import Timebox from "./Timebox";
import TimeboxCreator from "./TimeboxCreator";
// import TimeboxesAPI from "../api/FetchTimeboxesApi";
//import TimeboxesAPI from "../api/AxiosTimeboxesApi"; // 7.15/1
import TimeboxesAPI from "../api/FakeTimeboxesApi"; // 7.15/2

class TimeboxList extends React.Component {
  state = {
    timeboxes: [],
    loading: true,
    error: null,
    editCurrentTimebox: null,
    editMode: false,
  };

  componentDidMount() {
    TimeboxesAPI.getAllTimeboxes(this.props.accessToken)
      .then((timeboxes) => this.setState({ timeboxes }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  addTimebox = (timebox) => {
    TimeboxesAPI.addTimebox(timebox, this.props.accessToken).then(
      (addedTimebox) =>
        this.setState((prevState) => {
          const timeboxes = [...prevState.timeboxes, addedTimebox];
          return { timeboxes };
        })
    );
  };
  removeTimebox = (indexToRemove) => {
    TimeboxesAPI.removeTimebox(
      this.state.timeboxes[indexToRemove],
      this.props.accessToken
    ).then(() =>
      this.setState((prevState) => {
        const timeboxes = prevState.timeboxes.filter(
          (timebox, index) => index !== indexToRemove
        );
        return { timeboxes };
      })
    );
  };
  editTimebox = (timebox) => {
    this.setState({
      timebox,
      editCurrentTimebox: timebox.id,
      editMode: true,
    });
  };
  cancelEdit = () => {
    this.setState({
      editCurrentTimebox: null,
      editMode: false,
    });
  };
  updateTimebox = (timeboxToUpdate) => {
    TimeboxesAPI.replaceTimebox(timeboxToUpdate, this.props.accessToken).then(
      (updatedTimebox) =>
        this.setState((prevState) => {
          const timeboxes = prevState.timeboxes.map((timebox) =>
            timebox.id === updatedTimebox.id ? updatedTimebox : timebox
          );
          return { timeboxes, editCurrentTimebox: null, editMode: false };
        })
    );
  };

  handleCreate = (createdTimebox) => {
    try {
      this.addTimebox(createdTimebox);
    } catch (error) {
      console.log("Jest błąd przy tworzeniu timeboxa:", error);
    }
  };
  render() {
    const { editMode, editCurrentTimebox } = this.state;
    return (
      <>
        <TimeboxCreator onCreate={this.handleCreate} editMode={editMode} />
        {this.state.loading ? "Timeboxy się ładują..." : null}
        {this.state.error ? "Nie udało się załadować :(" : null}
        {this.state.timeboxes.map((timebox, index) => (
          <Timebox
            key={timebox.id}
            timebox={timebox}
            onDelete={() => this.removeTimebox(index)}
            onEdit={() => this.editTimebox(timebox)}
            onCancel={this.cancelEdit}
            onUpdate={this.updateTimebox}
            editMode={editMode}
            editCurrentTimebox={editCurrentTimebox}
          />
        ))}
      </>
    );
  }
}

export default TimeboxList;
