import React, { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";

export const Application=()=> {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    country: "India",
    streetAddress: "",
    city: "",
    region: "",
    postalCode: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [resumeFileName, setResumeFileName] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      const file = files[0];
      if (file) {
        if (file.type !== "application/pdf") {
          setErrors({ ...errors, resume: "Only PDF files are allowed" });
        } else if (file.size > 5 * 1024 * 1024) {
          setErrors({ ...errors, resume: "File size must be less than 5MB" });
        } else {
          setFormData({ ...formData, resume: file });
          setResumeFileName(file.name);
          setErrors({ ...errors, resume: "" });
        }
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDeleteResume = () => {
    setFormData({ ...formData, resume: null });
    setResumeFileName("");
  };

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      country: "India",
      streetAddress: "",
      city: "",
      region: "",
      postalCode: "",
      resume: null,
    });
    setErrors({});
    setResumeFileName("");
  };

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const mobileNoRegex = /^[0-9]+$/;

    if (!formData.firstName || !nameRegex.test(formData.firstName)) {
      newErrors.firstName = "Please enter a valid first name";
    }

    if (!formData.lastName || !nameRegex.test(formData.lastName)) {
      newErrors.lastName = "Please enter a valid last name";
    }

    if (!formData.mobileNo || !mobileNoRegex.test(formData.mobileNo)) {
      newErrors.mobileNo = "Please enter a valid mobile number";
    }

    if (!formData.email) {
      newErrors.email = "Please enter an email address";
    }

    if (!formData.resume) {
      newErrors.resume = "Please upload a resume";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // handle form submission
      console.log("Form submitted", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12 border px-7 rounded-xl bg-white border-gray-900/10 shadow-2xl">
        <h2 className="py-8 text-center text-3xl font-bold text-black">Job Application</h2>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.firstName && <p className="text-red-600">{errors.firstName}</p>}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.lastName && <p className="text-red-600">{errors.lastName}</p>}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && <p className="text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="mobile-no" className="block text-sm font-medium leading-6 text-gray-900">
                Mobile No.
              </label>
              <div className="mt-2">
                <input
                  id="mobile-no"
                  name="mobileNo"
                  type="text"
                  autoComplete="tel"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.mobileNo && <p className="text-red-600">{errors.mobileNo}</p>}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  value={formData.country}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>India</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  id="street-address"
                  name="streetAddress"
                  type="text"
                  autoComplete="street-address"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  value={formData.city}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="region"
                  name="region"
                  type="text"
                  autoComplete="address-level1"
                  value={formData.region}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                PIN / Postal code
              </label>
              <div className="mt-2">
                <input
                  id="postal-code"
                  name="postalCode"
                  type="text"
                  autoComplete="postal-code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-full">
          <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
            Upload Resume
          </label>
          <div
            className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 mb-10"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file && file.type === "application/pdf" && file.size <= 5 * 1024 * 1024) {
                setFormData({ ...formData, resume: file });
                setResumeFileName(file.name);
                setErrors({ ...errors, resume: "" });
              } else {
                setErrors({ ...errors, resume: "Only PDF files up to 5MB are allowed" });
              }
            }}
          >
            <div className="text-center">
              <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>{resumeFileName || "Upload a file"}</span>
                  <input id="file-upload" name="resume" type="file" className="sr-only" onChange={handleChange} />
                </label>
                {resumeFileName && (
                  <button
                    type="button"
                    className="ml-4 text-red-600 hover:text-red-800"
                    onClick={handleDeleteResume}
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="text-xs leading-5 text-gray-600">PDF up to 5MB</p>
              {errors.resume && <p className="text-red-600">{errors.resume}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
