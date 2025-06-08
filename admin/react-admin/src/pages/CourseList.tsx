// Import required hooks and dependencies
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
// Import GraphQL queries and mutations
import { DELETE_COURSE, GET_ALL_COURSES } from "../graphql/queiris";
import "./styles.css";
// Import child component
import { CourseForm } from "./CourseForm";

// Define Course interface for type safety
export interface Course {
  id: number;
  code: string;
  name: string;
  lecturerName: string;
  lecturerId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Main CourseList component
export const CourseList = () => {
  // Fetch all courses using GraphQL query
  const { data, loading, error, refetch } = useQuery(GET_ALL_COURSES);

  // State for course deletion
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);

  // Mutation for deleting a course with automatic refetch after completion
  const [deleteCourse] = useMutation(DELETE_COURSE, {
    onCompleted: () => refetch(),
  });

  // Local state to store all courses
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  // State for edit functionality
  const [edit, setEdit] = useState<Course>();
  const [editForm, setEditForm] = useState<boolean>(false);

  // Update local state when data is fetched
  useEffect(() => {
    if (data && !loading && !error) {
      setAllCourses(data.getAllCourses.courses);
      console.log("data", data, data.getAllCourses.courses);
    }
  }, [data, loading, error]);

  // Display loading state
  if (loading) return <div className="loading">Loading courses...</div>;
  // Display error state
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div>
      {/* Conditional rendering: show form when editing/adding, otherwise show table */}
      {editForm ? (
        <CourseForm
          onSuccess={() => {
            // Reset edit state and close form on successful submission
            setEdit(undefined);
            setEditForm(false);
            // Refresh course list
            refetch();
          }}
          // Pass current course to edit (or undefined for new course)
          course={edit}
        />
      ) : (
        <div className="course-table-container">
          {/* Header section with title and add button */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2>Courses</h2>
            <button
              onClick={() => {
                setEditForm(true);
              }}
              className="add-course-btn"
            >
              Add New Course
            </button>
          </div>

          {/* Courses table */}
          <table className="course-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Lecturer Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through courses to render table rows */}
              {allCourses.map((course: Course) => (
                <tr key={course.id}>
                  <td>{course.code}</td>
                  <td>{course.name}</td>
                  <td>{course.lecturerName}</td>
                  <td className="action-buttons">
                    {/* Edit button - opens form with current course data */}
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEdit(course);
                        setEditForm(true);
                      }}
                    >
                      Edit
                    </button>
                    {/* Delete button - opens confirmation modal */}
                    <button
                      className="delete-btn"
                      onClick={() => setCourseToDelete(course.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Delete confirmation modal */}
          {courseToDelete && (
            <div className="confirmation-modal">
              <div className="modal-content">
                <p>Are you sure you want to delete this course?</p>
                <div className="modal-actions">
                  {/* Confirm deletion button */}
                  <button
                    className="confirm-btn"
                    onClick={() => {
                      deleteCourse({ variables: { id: courseToDelete } });
                      setCourseToDelete(null);
                    }}
                  >
                    Delete
                  </button>
                  {/* Cancel deletion button */}
                  <button
                    className="cancel-btn"
                    onClick={() => setCourseToDelete(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              {/* Modal overlay */}
              <div className="modal-overlay"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
