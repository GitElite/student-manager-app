import { useState, useEffect } from "react";
import "./App.css";
import Modal from "./Modal.js";

export default function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [students, setStudents] = useState(
        () => JSON.parse(localStorage.getItem("students")) || []
    );

    useEffect(() => {
        // Whenever the students array changes, update localStorage
        localStorage.setItem("students", JSON.stringify(students));
    }, [students]);

    const handleRowClick = (student, index) => {
        setSelectedStudent({ ...student, index });
        setIsOpen(true);
    };

    const handleAddClick = () => {
        setSelectedStudent(null);
        setIsOpen(true);
    };

    const addOrEditStudent = (student) => {
        if (student.index !== undefined) {
            const updatedStudents = [...students];
            updatedStudents[student.index] = {
                name: student.name,
                age: student.age,
                grade: student.grade,
            };
            setStudents(updatedStudents);
        } else {
            setStudents([
                ...students,
                { name: student.name, age: student.age, grade: student.grade },
            ]);
        }

        setIsOpen(false);
        setSelectedStudent(null);
    };

    return (
        <>
            <table className="w-full table-auto bg-gray-600 text-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Age</th>
                        <th className="px-4 py-2">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr
                            key={index}
                            onClick={() => handleRowClick(student)}
                            className={
                                index % 2 === 0
                                    ? "bg-gray-500 hover:bg-gray-700 cursor-pointer"
                                    : "bg-gray-600 hover:bg-gray-800 cursor-pointer"
                            }
                        >
                            <td className="px-4 py-2">{student.name}</td>
                            <td className="px-4 py-2">{student.age}</td>
                            <td className="px-4 py-2">{student.grade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex items-center justify-center">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleAddClick}
                >
                    Add
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
        </>
    );
}
