import React, { useState } from "react";
import { AddUserFormInput } from "../components/AddUserFormInput";
import { customFetch } from "../utils";

const AddUser = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "user",
    empId: "",
    department: "",
    userPic:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    bio: "NA",
    interest: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      role,
      empId: role === 'admin' ? '' : prevData.empId,
      department: role === 'editor' ? '' : prevData.department,
    }));
  };

  const handleInterestChange = (e) => {
    const interests = e.target.value.split(',').map((interest) => interest.trim());
    setFormData({...formData,["interest"]:interests})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement the logic to submit the form data
    // console.log( formData);
    const response = await customFetch.post("/profiles",{...formData});
    console.log(response);
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <AddUserFormInput inptype="text" inpId="fullname" pHolder="Enter Full Name" text="Full Name" 
        fieldValue={formData.fullname} handleChange={handleInputChange} />
        
        <AddUserFormInput inptype="email" inpId="email" pHolder="Enter Email" text="Email" 
        fieldValue={formData.email} handleChange={handleInputChange} />

        <AddUserFormInput inptype="password" inpId="password" pHolder="Enter Password" text="Password" 
        fieldValue={formData.password} handleChange={handleInputChange} />

        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="form-control w-50 m-auto"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleRoleChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
        </div>

        {formData.role === "admin" && (
            <AddUserFormInput inptype="text" inpId="empId" pHolder="Enter Employee ID" text="Employee ID" 
            fieldValue={formData.empId} handleChange={handleInputChange} />
        )}
        {formData.role === "editor" && (
            <AddUserFormInput inptype="text" inpId="department" pHolder="Enter Department" text="Department" 
            fieldValue={formData.department} handleChange={handleInputChange} />
        )}


        <AddUserFormInput inptype="text" inpId="userPic" pHolder="Enter Profile Pic link" text="Profile Image" 
            fieldValue={formData.userPic} handleChange={handleInputChange} />
        
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">
            Bio
          </label>
          <textarea
            className="form-control w-50 m-auto"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows="3"
          ></textarea>
        </div>

            <div className="mb-3">
          <label htmlFor="interest" className="form-label">
            Interests (comma-separated)
          </label>
          <input
            type="text"
            className="form-control w-50 m-auto"
            id="interest"
            name="interest"
            value={formData.interest.join(', ')}
            onChange={handleInterestChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUser;
