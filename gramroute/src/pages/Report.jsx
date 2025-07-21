import { useState } from "react";

function Report() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState("")

  return (
    <div className="p-4 min-w-md mx-auto">
      <h1 className="text-2xl text-center text-black font-bold font-mono mb-4">
        Report an Issue!
      </h1>
      <div className="mb-4 max-w-4xl w-ful h-full rounded-md mx-auto space-y-2">
        <div className="mb-1 p-2">
          <label className="font-medium text-gray-600 text-left">Enter Title</label>
          <input type="text" className="rounded-md mb-2 w-full p-1.5"/>
        </div>
        <div className="mb-1 p-2">
          <label className="font-medium text-gray-600 text-left">Category</label>
          <select className="p-1.5 w-full mb-2 rounded-md" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="road">Road Infrastructure</option>
            <option value="safety">Public Safety</option>
            <option value="waste">Waste Management</option>
            <option value="utilities">Utilities</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-1 p-2">
          <label className="font-medium text-gray-600 text-left">Description</label>
          <textarea
            className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y min-h-[100px] max-h-[300px] bg-white"
            placeholder="Describe the issue in detail..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-1 p-2">
          <label
            htmlFor="file-upload"
            className="block font-medium text-gray-600 text-left mb-1"
          >
            Upload Image or Video
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={e => setFile(e.target.files[0])}
          />
          <label
            htmlFor="file-upload"
            className="inline-block cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {file ? file.name : "Choose File"}
          </label>
        </div>
        <div className="mb-2 p-1 w-full flex items-center justify-center">
          <button className="bg-green-500 p-2 rounded-md px-10 hover:bg-green-600">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Report;
