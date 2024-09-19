"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import socket from "@/helpers/index";
import Image from "next/image";
import deleteIcon from "@/public/asset/icon/delete.svg";
import { DummyData, API_URL } from "@/helpers/utils";

const ListTodo = () => {
  const [todos, setTodos] = useState(DummyData || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    socket.on("todo-time-alert", (todo) => {
      alert(`Time for your task: ${todo.task}`);
    });

    return () => {
      socket.off("todo-time-alert");
    };
  }, []);

  useEffect(() => {
    fetchTodos(currentPage);
  }, [currentPage]);

  const fetchTodos = async (page) => {
    setIsloading(true);
    try {
      const res = await axios.get(`${API_URL}/todos?page=${page}`);
      setTodos(res.data);
      setTotalPages(res.data.totalPages);
      setIsloading(false);
    } catch (error) {
      console.error("Error", error);
      setIsloading(false);
    }
  };

  const deleteTodo = async (id) => {
    setIsloading(true);
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      socket.emit("delete-todo", id);
      fetchTodos(currentPage);
    } catch (error) {
      console.error("Error", error);
      setIsloading(false);
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <ul className="divide-y divide-gray-400">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.email} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img
                  alt=""
                  src={todo.image}
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                />
                <div className="text-center">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {todo.task}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {todo.deadline}
                  </p>
                </div>
                <Image
                  className="cursor-pointer"
                  onClick={() => deleteTodo(todo._id)}
                  src={deleteIcon}
                  width={20}
                  heigh={20}
                />
              </div>
            </li>
          ))
        ) : (
          <h1>No data found</h1>
        )}
      </ul>
      {todos.length > 0 && (
        <div className="mt-4 max-w-sm text-center">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 mx-1 my-2 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListTodo;
