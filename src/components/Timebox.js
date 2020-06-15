import React from "react";
import TimeboxEditable from './TimeboxEditable'

function Timebox({
  timebox,
  onDelete,
  onEdit,
  onUpdate,
  onCancel,
  editMode,
  editCurrentTimebox,
}) {
  const { id, title, totalTimeInMinutes } = timebox;
  return (
    <>
      {editCurrentTimebox === id ? (
        <TimeboxEditable timebox={timebox} onCancel={onCancel} onUpdate={onUpdate} />
      ) : (
        <div className={`Timebox ${editMode ? "inactive" : ""}`}>
          <h3>
            {title} - {totalTimeInMinutes} min.
          </h3>
          <button onClick={onDelete} disabled={editMode}>
            Usuń
          </button>
          <button onClick={onEdit} disabled={editMode}>
            Zmień
          </button>
        </div>
      )}
    </>
  );
}

export default Timebox;
