import React, { useState } from "react";

const Photography = () => {
  const [speciesName, setSpeciesName] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [rewardMessage, setRewardMessage] = useState("");


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file || !speciesName || !location) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    // Simulate species validation
    setRewardMessage(`Thank you for your submission. We will reach out to you soon, if ${speciesName} is listed as endangered.`);
    

    // Simulate photo "upload" by storing it in localStorage
    const reader = new FileReader();
    reader.onload = () => {
      const storedData = JSON.parse(localStorage.getItem("submissions") || "[]");
      storedData.push({
        speciesName,
        location,
        image: reader.result, // Store image as Base64
      });
      localStorage.setItem("submissions", JSON.stringify(storedData));
    };
    reader.readAsDataURL(file);

    setUploadStatus("Your submission has been saved locally!");
    setSpeciesName("");
    setLocation("");
    setFile(null);
  };

  return (
    <div className="photography-container">
      <h2>Wildlife Photography Submission</h2>
      <p>Upload a rare photo of a species and help conserve wildlife!</p>
      <form onSubmit={handleSubmit}>
        <label>
          Species Name:
          <input
            type="text"
            value={speciesName}
            onChange={(e) => setSpeciesName(e.target.value)}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>
        <label>
          Upload Photo:
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
      {rewardMessage && <p>{rewardMessage}</p>}

      <style jsx>{`
        .photography-container {
          max-width: 600px;
          margin: auto;
          padding: 16px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h2 {
          text-align: center;
          color: darkgreen;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        label {
          display: flex;
          flex-direction: column;
          font-weight: bold;
        }
        input {
          padding: 8px;
          margin-top: 8px;
          border: 1px solid green;
          border-radius: 4px;
        }
        button {
          padding: 12px;
          background: green;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s;
        }
        button:hover {
          background: darkgreen;
        }
        p {
          text-align: center;
          color: gray;
        }
      `}</style>
    </div>
  );
};

export default Photography;
