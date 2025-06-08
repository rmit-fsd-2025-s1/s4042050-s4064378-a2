import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { DELETE_COURSE, GET_ALL_COURSES } from "../graphql/queiris";
import "./styles.css";
import { CourseForm } from "./CourseForm";

export interface Course {
  id: number;
  code: string;
  name: string;
  lecturerName: string;
  lecturerId: number;
  createdAt: Date;
  updatedAt: Date;
}

export const CourseList = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_COURSES);
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);
  const [deleteCourse] = useMutation(DELETE_COURSE, {
    onCompleted: () => refetch(),
  });
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  const [edit, setEdit] = useState<Course>();
  const [editForm, setEditForm] = useState<boolean>(false);

  useEffect(() => {
    if (data && !loading && !error) {
      setAllCourses(data.getAllCourses.courses);
      console.log("data", data, data.getAllCourses.courses);
    }
  }, [data]);

  if (loading) return <div className="loading">Loading courses...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div>
      {editForm ? (
        <CourseForm
          onSuccess={() => {
            setEdit(undefined);
            setEditForm(false);
            refetch();
          }}
          course={edit}
        />
      ) : (
        <div className="course-table-container">
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
              {allCourses.map((course: Course) => (
                <tr key={course.id}>
                  <td>{course.code}</td>
                  <td>{course.name}</td>
                  <td>{course.lecturerName}</td>
                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEdit(course);
                        setEditForm(true);
                      }}
                    >
                      Edit
                    </button>
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

          {courseToDelete && (
            <div className="confirmation-modal">
              <div className="modal-content">
                <p>Are you sure you want to delete this course?</p>
                <div className="modal-actions">
                  <button
                    className="confirm-btn"
                    onClick={() => {
                      deleteCourse({ variables: { id: courseToDelete } });
                      setCourseToDelete(null);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setCourseToDelete(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div className="modal-overlay"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
