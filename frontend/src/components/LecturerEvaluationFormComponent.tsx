import { useState } from 'react';
import type { Ratings } from '../types/Ratings';
import type { Question } from '../types/Question';
import type { LecturerEvaluationFormData } from '../types/LecturerEvaluationFormData';
import {questions} from '../data/questions';

const LecturerEvaluationForm = () => {
  const [formData, setFormData] = useState<LecturerEvaluationFormData>({
    studentName: '',
    matricNumber: '',
    gender: '',
    faculty: '',
    department: '',
    courseCode: '',
    level: '',
    courseTitle: '',
    lecturerName: '',
    ratings: {
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      q5: ''
    }
  });

const questionsData: Question[] = questions;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (questionId: keyof Ratings, rating: number) => {
    setFormData(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [questionId]: rating
      }
    }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="border-b-2 border-gray-300 pb-4 mb-6">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-normal text-gray-800">
              Students' Lecturer Evaluation Form
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Please fill in the required fields and answer the following questions honestly
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div>
                <label className="block text-xs sm:text-sm text-gray-700 mb-2">
                  <span className="text-red-500">*</span> Name of Student:
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  placeholder="Student full name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-700 mb-2">
                  <span className="text-red-500">*</span> Matric Number:
                </label>
                <input
                  type="text"
                  name="matricNumber"
                  value={formData.matricNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Matric Number"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-700 mb-2">
                  <span className="text-red-500">*</span> Gender:
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  required
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-700 mb-2">
                  <span className="text-red-500">*</span> Faculty:
                </label>
                <select
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  required
                >
                  <option value="">Faculty</option>
                  <option value="engineering">Engineering</option>
                  <option value="science">Science</option>
                  <option value="arts">Arts</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-700 mb-2">
                  <span className="text-red-500">*</span> Department:
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  required
                >
                  <option value="">Department</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="physics">Physics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-700 mb-2">
                  <span className="text-red-500">*</span> Course Code:
                </label>
                <input
                  type="text"
                  name="courseCode"
                  value={formData.courseCode}
                  onChange={handleInputChange}
                  placeholder="Enter course Code"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-700 mb-2">
                  <span className="text-red-500">*</span> Level:
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                  required
                >
                  <option value="">Level</option>
                  <option value="100">100 Level</option>
                  <option value="200">200 Level</option>
                  <option value="300">300 Level</option>
                  <option value="400">400 Level</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-700 mb-2">
                  <span className="text-red-500">*</span> Course title:
                </label>
                <input
                  type="text"
                  name="courseTitle"
                  value={formData.courseTitle}
                  onChange={handleInputChange}
                  placeholder="Enter course title"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-xs sm:text-sm text-gray-700 mb-2">
                <span className="text-red-500">*</span> Name of the course lecturer:
              </label>
              <input
                type="text"
                name="lecturerName"
                value={formData.lecturerName}
                onChange={handleInputChange}
                placeholder="Enter lecturer's name"
                className="w-full md:w-1/2 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                <div className="text-xs sm:text-sm text-gray-700 flex flex-wrap gap-x-3 gap-y-1">
                  <span><span className="font-medium">1</span> = Strongly Disagree</span>
                  <span><span className="font-medium">2</span> = Disagree</span>
                  <span><span className="font-medium">3</span> = Neutral</span>
                  <span><span className="font-medium">4</span> = Agree</span>
                  <span><span className="font-medium">5</span> = Strongly Agree</span>
                </div>
                <button
                  type="button"
                  className="text-xs sm:text-sm text-gray-600 hover:text-gray-800 self-start sm:self-auto whitespace-nowrap"
                >
                  Download Form ⬇
                </button>
              </div>

              <div className="bg-gray-100 border border-gray-300 overflow-x-auto">
                {/* Desktop view */}
                <div className="hidden lg:block">
                  <div className="grid grid-cols-[60px_1fr_400px] bg-gray-200 border-b border-gray-300">
                    <div className="px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-300">S.N</div>
                    <div className="px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-300">Title</div>
                    <div className="px-4 py-3 text-sm font-medium text-gray-700">Actions</div>
                  </div>

                  {questionsData.map((question, index) => (
                    <div key={question.id} className="grid grid-cols-[60px_1fr_400px] border-b border-gray-300 last:border-b-0">
                      <div className="px-4 py-4 text-sm text-gray-700 border-r border-gray-300 bg-white">
                        {index + 1}
                      </div>
                      <div className="px-4 py-4 text-sm text-gray-700 border-r border-gray-300 bg-white">
                        {question.text}
                      </div>
                      <div className="px-4 py-4 bg-white">
                        <div className="flex gap-2 justify-center">
                          {[1, 2, 3, 4, 5].map(rating => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => handleRatingChange(question.id, rating)}
                              className={`w-12 h-10 border border-gray-300 rounded text-sm transition-colors ${
                                formData.ratings[question.id] === rating
                                  ? 'bg-blue-500 text-white border-blue-500'
                                  : 'bg-white text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile/Tablet view */}
                <div className="lg:hidden">
                  {questions.map((question, index) => (
                    <div key={question.id} className="border-b border-gray-300 last:border-b-0 bg-white p-4">
                      <div className="flex gap-3 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                          {index + 1}
                        </div>
                        <div className="flex-1 text-xs sm:text-sm text-gray-700">
                          {question.text}
                        </div>
                      </div>
                      <div className="flex gap-2 justify-center sm:justify-start flex-wrap">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => handleRatingChange(question.id, rating)}
                            className={`w-10 h-10 sm:w-12 sm:h-10 border border-gray-300 rounded text-sm transition-colors ${
                              formData.ratings[question.id] === rating
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                Submit Evaluation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LecturerEvaluationForm;