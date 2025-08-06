import { useState } from "react";
import { useAuth } from './AuthContext';

function Report() {
  const { user, authenticatedFetch, isAuthenticated } = useAuth();
  
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState(null);
    const [category, setCategory] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

  if (!isAuthenticated) {
    return(
      <div className="p-4 text-center">
        <h2 className="text-xl text-red-600">Please Login to submit</h2>
        <button onClick={() => window.location.href = '/Login'} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Go to login</button>
      </div>
    )
  }

  const validateForm = () => {
    const newErrors = {};

    if(!title.trim()){
      newErrors.title = "Title is required";
    }

    if(!category) {
      newErrors.category = "Please select a category";
    }

    if(!description.trim()){
      newErrors.description = "Description is required";
    }

    if(!file){
      newErrors.file = "Please upload a image or video";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setErrors({});

    if(!validateForm()) {
      alert("PLease Fill Stuff!");
      return;
    }
    setIsSubmitting(true);

    try{
      const reportData = {
        title: title.trim(),
        description: description.trim(),
        category: category,
        latitude: null,
        longitude: null 
      };
      const response = await authenticatedFetch('http://localhost:5000/api/reports', {
        method: 'POST',
        body: JSON.stringify(reportData)
      });

      const result = await response.json();
      if(response.ok && result.success){
        alert("Report submitted successfully! 🥳");
        setTitle("");
        setDescription("");
        setCategory("");
        setFile(null);
        setLocation(null);
        setErrors({});
      }
      else{
        throw new Error(result.message || "Failed to submit the form!");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to submit the report! Please check your internet connection");
    } finally {
      setIsSubmitting(false);
    }
   };

  return (
    <div className="p-4 min-w-md mx-auto">
      <h1 className="text-2xl text-center text-black font-bold font-mono mb-4">
        Report an Issue!
      </h1>
      <div className="text-center mb-4 text-gray-600">
        Submitting as: <strong>{user?.username}</strong>
      </div>
      <div className="mb-4 max-w-4xl w-full h-full rounded-md mx-auto space-y-2">
        <div className="mb-1 p-2">
          <label className="font-medium text-gray-600 text-left">Enter Title</label>
          <input type="text" className="rounded-md mb-2 w-full p-1.5"  value={title} onChange={e => setTitle(e.target.value)}/>
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
          <button className= {`bg-green-500 p-2 rounded-md px-10 hover:bg-green-600 ${isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600'
            }`} onClick={handleSubmit} disabled={isSubmitting} >Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Report;