import { useState } from "react";

import API from "../api/axios";

export default function AddResultForm() {

  const [formData, setFormData] = useState({

    athlete_name: "",
    event_name: "",
    position: "",
    performance: "",
    isBest: false,
  });

  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({

      ...formData,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append(
        "athlete_name",
        formData.athlete_name
      );

      data.append(
        "event_name",
        formData.event_name
      );

      data.append(
        "position",
        formData.position
      );

      data.append(
        "performance",
        formData.performance
      );

      data.append(
        "isBest",
        formData.isBest
      );

      data.append("photo", photo);

      await API.post(
        "/results/add-with-photo",
        data
      );

      alert("Result uploaded");

    } catch (err) {

      console.log(err);

      alert("Upload failed");
    }
  };

  return (

    <form
      onSubmit={handleSubmit}

      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: "400px",
      }}
    >

      <input
        type="text"
        name="athlete_name"
        placeholder="Athlete Name"
        onChange={handleChange}
      />

      <input
        type="text"
        name="event_name"
        placeholder="Event Name"
        onChange={handleChange}
      />

      <input
        type="number"
        name="position"
        placeholder="Position"
        onChange={handleChange}
      />

      <input
        type="text"
        name="performance"
        placeholder="Performance"
        onChange={handleChange}
      />

      <label>

        Best Athlete

        <input
          type="checkbox"
          name="isBest"
          onChange={handleChange}
        />

      </label>

      <input
        type="file"
        onChange={(e) =>
          setPhoto(e.target.files[0])
        }
      />

      <button type="submit">
        Upload Result
      </button>

    </form>
  );
}