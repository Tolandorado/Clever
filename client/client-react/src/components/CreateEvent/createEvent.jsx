import React, { useState } from "react";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleEventDescriptionChange = (e) => {
    setEventDescription(e.target.value);
  };

  const handleEventDateChange = (e) => {
    setEventDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Добавьте код для обработки создания мероприятия
    console.log("Создано мероприятие:", eventName, eventDescription, eventDate);
    // Сбросить значения полей после отправки
    setEventName("");
    setEventDescription("");
    setEventDate("");
  };

  return (
    <div>
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input
            type="text"
            value={eventName}
            onChange={handleEventNameChange}
          />
        </label>
        <br />
        <label>
          Event Description:
          <textarea
            value={eventDescription}
            onChange={handleEventDescriptionChange}
          />
        </label>
        <br />
        <label>
          Event Date (mm/dd/yy):
          <input
            type="text"
            value={eventDate}
            onChange={handleEventDateChange}
          />
        </label>
        <br />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export { CreateEvent };
