import { useState } from "react";

function Report() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl text-center text-white font-bold font-mono mb-4">
        Report an Issue!
      </h1>
      <div className="mb-4">
        <textarea
          className="w-full border p-2 mb-4"
          placeholder="Describe the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*, video/*"
          className="mb-4"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
					onClick={() => {
						navigator.geolocation.getCurrentPosition((position) => {
							setLocation({
								lat: position.coords.latitude,
								long: position.coords.longitude,
							});
						});
					}}
					className="bg-blue-600 text-white px-4 py-2 rounded"
				>Get Location</button>

				{location && (
					<p className="px-2 text-sm text-white">Location: {location.lat}, {location.long}</p>
				)}

        <button 
					onClick={() => {
						console.log("Description:", description);
						console.log("File:", file);
						console.log("Location:", location);
						alert("Submitted Report! Check Console");
					}}	
					className="bg-green-600 text-white px-4 py-2 rounded w-full"
				>Submit Report</button>
      </div>
    </div>
  );
}

export default Report;
