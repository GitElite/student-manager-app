import { useLocation } from "react-router-dom";

function StudentReport() {
    const location = useLocation();
    const selectedStudent = location.state.student;

    const studentScores = [
        { subject: "English", score: selectedStudent.englishScore },
        {
            subject: "Social Studies",
            score: selectedStudent.socialStudiesScore,
        },
        { subject: "Science", score: selectedStudent.scienceScore },
        { subject: "Math", score: selectedStudent.mathScore },
    ];

    return (
        <div>
            <div className="flex justify-center py-3">
                <h2 className="text-3xl underline font-sans font-bold text-center">{selectedStudent.name} Report</h2>
            </div>
            {selectedStudent && (
                <table className="w-full table-auto bg-gray-600 text-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-center">Subject</th>
                            <th className="px-4 py-2 text-center">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentScores.map((studentAttrib, index) => (
                            <tr
                                key={index}
                                className={
                                    index % 2 === 0
                                        ? "bg-gray-500 hover:bg-gray-700 cursor-pointer"
                                        : "bg-gray-600 hover:bg-gray-800 cursor-pointer"
                                }
                            >
                                <td className="px-4 py-2 text-center align-middle">
                                    {studentAttrib.subject}
                                </td>
                                <td className="px-4 py-2 text-center align-middle">
                                    {studentAttrib.score}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default StudentReport;
