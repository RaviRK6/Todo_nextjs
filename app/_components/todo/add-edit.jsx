"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import socket from "@/helpers/index";
import imageCompression from "browser-image-compression";
import { API_URL } from "@/helpers/utils";

const AddEditTodo = () => {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const handleSubmit = async (e) => {
    setIsloading(true);
    e.preventDefault();
    const compressedImage = await imageCompression(image, {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
    });
    const formData = new FormData();
    formData.append("task", task);
    formData.append("deadline", deadline);
    formData.append("image", compressedImage);
    try {
      const response = await axios.post(`${API_URL}/todos`, formData);
      socket.emit("add-todo", response.data);
      setIsloading(false);
      setTask("");
      setDeadline("");
    } catch (error) {
      console.error("Error", error);
      setIsloading(false);
      setTask("");
      setDeadline("");
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            for="task"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Task Title
          </label>
          <div className="mt-2">
            <input
              id="task"
              name="task"
              type="text"
              required
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Task Date & Time
          </label>
          <div className="mt-2">
            <input
              name="task_date"
              type="datetime-local"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Task Image
          </label>
          <div className="mt-2">
            <input
              name="task_image"
              type="file"
              accept="image/png, image/jpeg"
              required
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-2 file:px-4"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add TODO
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditTodo;
