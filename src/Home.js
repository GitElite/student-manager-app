import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import Modal from './Modal';

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [students, setStudents] = useState(
        () => JSON.parse(localStorage.getItem("students")) || []
    );
    const [selectedRows, setSelectedRows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Whenever the students array changes, update localStorage
        localStorage.setItem("students", JSON.stringify(students));
    }, [students]);

    const handleRowClick = (e, student, index) => {
        // Check if the event is triggered by checkbox
        if (e.target.type !== 'checkbox') {
            setSelectedStudent({ ...student, index });
            setIsOpen(true);
        }
    };


    const handleRowSelection = (e, index) => {
        e.stopPropagation();  // Prevent triggering of handleRowClick function

        if (e.target.checked) {
            setSelectedRows((prev) => [...prev, index]);
        } else {
            setSelectedRows((prev) => prev.filter((i) => i !== index));
        }
    };



    const handleAddClick = () => {
        setSelectedStudent(null);
        setIsOpen(true);
    };

    const handleLogoutClick = () => {
        navigate("/login")
    };

    const deleteSelectedRows = () => {
        setStudents((prev) => prev.filter((_, index) => !selectedRows.includes(index)));
        setSelectedRows([]);
    };

    const addOrEditStudent = (student) => {
        if (student.index !== undefined) {
            const updatedStudents = [...students];
            updatedStudents[student.index] = {
                name: student.name,
                age: student.age,
                grade: student.grade,
                favoriteSubject: student.favoriteSubject,
                sportsColor: student.sportsColor,
            };
            setStudents(updatedStudents);
        } else {
            setStudents([
                ...students,
                { name: student.name, age: student.age, grade: student.grade, favoriteSubject: student.favoriteSubject, sportsColor: student.sportsColor },
            ]);
        }

        setIsOpen(false);
        setSelectedStudent(null);
    };

    return (
        <>
            <div className="flex items-center justify-center">
                <button
                    className="px-4 py-2 m-2 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 active:text-sm text-white rounded"
                    onClick={handleAddClick}
                >
                    Add
                </button>

                <button
                    onClick={deleteSelectedRows}
                    className="px-4 py-2 m-2 bg-red-500 hover:bg-red-400 active:bg-red-600 active:text-sm text-white rounded"
                >
                    Delete
                </button>

                <button
                    className="px-4 py-2 m-2 bg-red-500 hover:bg-red-400 active:bg-red-600 active:text-sm text-white rounded"
                    onClick={handleLogoutClick}
                >
                    Logout
                </button>

                {isOpen && (
                    <Modal
                        student={selectedStudent}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        addOrEditStudent={addOrEditStudent}
                    />
                )}
            </div>
            <table className="w-full table-auto bg-gray-600 text-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-center">Selection</th>
                        <th className="px-4 py-2 text-center">Name</th>
                        <th className="px-4 py-2 text-center">Age</th>
                        <th className="px-4 py-2 text-center">Grade</th>
                        <th className="px-4 py-2 text-center">Favorite Subject</th>
                        <th className="px-4 py-2 text-center">Sports Color</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr
                            key={index}
                            onClick={(e) => handleRowClick(e, student, index)}
                            className={
                                index % 2 === 0
                                    ? "bg-gray-500 hover:bg-gray-700 cursor-pointer"
                                    : "bg-gray-600 hover:bg-gray-800 cursor-pointer"
                            }
                        >
                            <td className="px-4 py-2 text-center align-middle">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(index)}
                                    onChange={(e) => handleRowSelection(e, index)}
                                />
                            </td>
                            <td className="px-4 py-2 text-center align-middle">{student.name}</td>
                            <td className="px-4 py-2 text-center align-middle">{student.age}</td>
                            <td className="px-4 py-2 text-center align-middle">{student.grade}</td>
                            <td className="px-4 py-2 text-center align-middle">{student.favoriteSubject}</td>
                            <td className="px-4 py-2 text-center align-middle">{student.sportsColor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
