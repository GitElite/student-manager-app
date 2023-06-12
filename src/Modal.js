import React, { useEffect, useState } from 'react';

function Modal({ student, isOpen, setIsOpen, addOrEditStudent }) {
  const [name, setName] = useState(student?.name || '');
  const [age, setAge] = useState(student?.age.toString() || '');
  const [grade, setGrade] = useState(student?.grade || '');
  const [favoriteSubject, setFavoriteSubject] = useState(student?.favoriteSubject || '');
  const [sportsColor, setSportsColor] = useState(student?.sportsColor || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEditStudent({ index: student?.index, name, age: Number(age), grade, favoriteSubject, sportsColor });
  };

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setAge('');
      setGrade('');
      setFavoriteSubject('');
      setSportsColor('');
    }
  }, [isOpen])


  return (
    <div className="flex items-center justify-center">
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" />
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                      </label>

                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                        Age
                      </label>

                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
                        Grade
                      </label>

                      <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="class"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                      >
                        <option value="">Select a Grade</option>
                        <option value="Preschool">Preschool</option>
                        <option value="Kindergarten">Kindergarten</option>
                        <option value="Grade 1">Grade 1</option>
                        <option value="Grade 2">Grade 2</option>
                        <option value="Grade 3">Grade 3</option>
                        <option value="Grade 4">Grade 4</option>
                        <option value="Grade 5">Grade 5</option>
                        <option value="Grade 6">Grade 6</option>
                        <option value="Grade 7">Grade 7</option>
                        <option value="Grade 8">Grade 8</option>
                        <option value="Grade 9">Grade 9</option>
                        <option value="Grade 10">Grade 10</option>
                        <option value="Grade 11">Grade 11</option>
                        <option value="Grade 12">Grade 12</option>
                      </select>
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="favoriteSubject">
                        Favorite Subject
                      </label>

                      <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="favoriteSubject"
                        value={favoriteSubject}
                        onChange={(e) => setFavoriteSubject(e.target.value)}
                        required
                      >
                        <option value="">Select a Subject</option>
                        <option value="Math">Math</option>
                        <option value="Science">Science</option>
                        <option value="History">Social Studies</option>
                        <option value="English">English</option>
                      </select>
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sportsColor">
                        Sports Color
                      </label>
                      
                      <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="sportsColor"
                        value={sportsColor}
                        onChange={(e) => setSportsColor(e.target.value)}
                        required
                      >
                        <option value="">Select a Color</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Blue">Blue</option>
                        <option value="Green">Green</option>
                        <option value="Red">Red</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        type="submit"
                      >
                        Save
                      </button>

                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                        type="button"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
