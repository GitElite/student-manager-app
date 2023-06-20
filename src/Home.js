import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import StudentReport from "./StudentReport";

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [students, setStudents] = useState(
        () => JSON.parse(localStorage.getItem("students")) || []
    );
    const [selectedRows, setSelectedRows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("students", JSON.stringify(students));
    }, [students]);

    const handleRowClick = (e, student, index) => {
        if (e.target.type !== "checkbox") {
            setSelectedStudent({ ...student, index });
            setIsOpen(true);
        }
    };

    const handleRowSelection = (e, index) => {
        e.stopPropagation();

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
        navigate("/login");
    };

    const deleteSelectedRows = () => {
        setStudents((prev) =>
            prev.filter((_, index) => !selectedRows.includes(index))
        );
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
                englishScore: student.englishScore,
                socialStudiesScore: student.socialStudiesScore,
                scienceScore: student.scienceScore,
                mathScore: student.mathScore,
            };
            setStudents(updatedStudents);
        } else {
            setStudents([
                ...students,
                {
                    name: student.name,
                    age: student.age,
                    grade: student.grade,
                    favoriteSubject: student.favoriteSubject,
                    sportsColor: student.sportsColor,
                    englishScore: student.englishScore,
                    socialStudiesScore: student.socialStudiesScore,
                    scienceScore: student.scienceScore,
                    mathScore: student.mathScore,
                },
            ]);
        }

        setIsOpen(false);
        setSelectedStudent(null);
    };
    function handleViewClick(student) {
        navigate("/student-report", { state: { student: student } });
    }

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
                        <th className="px-4 py-2 text-center">
                            Favorite Subject
                        </th>
                        <th className="px-4 py-2 text-center">Sports Color</th>
                        <th className="px-4 py-2 text-center">Report Card</th>
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
                                    onChange={(e) =>
                                        handleRowSelection(e, index)
                                    }
                                />
                            </td>
                            <td className="px-4 py-2 text-center align-middle">
                                {student.name}
                            </td>
                            <td className="px-4 py-2 text-center align-middle">
                                {student.age}
                            </td>
                            <td className="px-4 py-2 text-center align-middle">
                                {student.grade}
                            </td>
                            <td className="px-4 py-2 text-center align-middle">
                                {student.favoriteSubject}
                            </td>
                            <td className="px-4 py-2 text-center align-middle">
                                {student.sportsColor}
                            </td>
                            <td className="text-center align-middle">
                                <button
                                    onClick={() => {
                                        handleViewClick(student);
                                        console.log("I've been clicked!");
                                    }}
                                    className="px-4 py-2 m-2 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 active:text-sm text-white rounded"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedStudent && <StudentReport student={selectedStudent} />}
        </>
    );
}
