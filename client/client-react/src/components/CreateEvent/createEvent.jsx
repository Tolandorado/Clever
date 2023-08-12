import React, { useState } from "react";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedVector, setSelectedVector] = useState("");

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleEventDescriptionChange = (e) => {
    setEventDescription(e.target.value);
  };

  const handleEventDateChange = (e) => {
    setEventDate(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleVectorChange = (e) => {
    setSelectedVector(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      eventName,
      eventDescription,
      eventDate,
      selectedFile,
      selectedVector,
    };

    console.log("Создано мероприятие:", eventData);

    setEventName("");
    setEventDescription("");
    setEventDate("");
    setSelectedFile(null);
    setSelectedVector("");
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
        <label>
          Add File:
          <input
            type="file"
            accept="image/*, video/*, .zip, .rar"
            onChange={handleFileChange}
          />
        </label>
        <br />
        <label>
          Vector:
          <select value={selectedVector} onChange={handleVectorChange}>
            <option value="">Select Vector</option>
            <option value="Up">Science</option>
            <option value="Down">Sport</option>
            <option value="Left">Nature</option>
            <option value="Right">Religion</option>
          </select>
        </label>
        <br />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export { CreateEvent };
