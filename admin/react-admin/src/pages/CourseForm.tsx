import { useMutation, useQuery } from "@apollo/client";
import { Course } from "./CourseList";
import {
  CREATE_COURSE,
  UPDATE_COURSE,
  GET_ALL_LECTURERS,
} from "../graphql/queiris";
import { ErrorMessage } from "./LoginPage";
import { useEffect, useState } from "react";

// Interface defining the structure of a Lecturer
interface Lecturer {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

// Props interface for the CourseForm component
interface CourseFormProps {
  course?: Course; // Optional existing course data for editing
  onSuccess: () => void; // Callback function for successful operations
}

// CourseForm component for creating or updating a course
export const CourseForm: React.FC<CourseFormProps> = ({
  course,
  onSuccess,
}) => {
  // Mutation hook for creating or updating a course based on whether 'course' prop exists
  const [mutate] = useMutation(course ? UPDATE_COURSE : CREATE_COURSE);
  const [error, setError] = useState(""); // State for storing error messages
  const [selectedLecturer, setSelectedLecturer] = useState<number | null>(
    course?.lecturerId || null // Initialize with existing lecturer ID if editing
  );

  // Fetch all available lecturers
  const { data: lec } = useQuery(GET_ALL_LECTURERS);

  const [lecturers, setAllLecturers] = useState([]); // State for storing lecturer list

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const input = {
      code: formData.get("code") as string,
      name: formData.get("name") as string,
      lecturerId: selectedLecturer,
    };

    try {
      // Execute mutation (either create or update based on whether 'course' exists)
      const { data } = await mutate({
        variables: course
          ? {
              id: course.id,
              ...input,
            }
          : { input },
      });
      // Check for success and either call onSuccess or show error
      if (data?.createCourse?.success || data?.updateCourse?.success) {
        onSuccess();
      } else {
        setError(
          data?.createCourse?.message ||
            data?.updateCourse?.message ||
            "Operation failed"
        );
      }
    } catch (error) {
      console.error("Operation failed:", error);
      setError("Failed to save course");
    }
  };

  // Effect to update lecturers list when data is fetched
  useEffect(() => {
    if (lec && lec.allLecturers) {
      setAllLecturers(lec.allLecturers.lecturers);
    }
  }, [lec]);

  return (
    <div className="form-container">
      {/* Close button that triggers the onSuccess callback */}
      <button className="close-button" onClick={() => onSuccess()}>
        ×
      </button>
      {/* Course form with submission handler */}
      <form onSubmit={handleSubmit} className="course-form">
        {/* Course code input field */}
        <div className="form-group">
          <label htmlFor="code">Course Code</label>
          <input
            id="code"
            name="code"
            defaultValue={course?.code}
            pattern="COSC\d{4}"
            title="Course code must be in COSCxxxx format"
            required
          />
        </div>

        {/* Course name input field */}
        <div className="form-group">
          <label htmlFor="name">Course Name</label>
          <input id="name" name="name" defaultValue={course?.name} required />
        </div>

        {/* Lecturer selection dropdown */}
        <div className="form-group">
          <label htmlFor="lecturer">Lecturer</label>
          <select
            id="lecturer"
            name="lecturer"
            value={selectedLecturer || ""}
            onChange={(e) =>
              setSelectedLecturer(
                e.target.value ? Number(e.target.value) : null
              )
            }
          >
            <option value="">-- Select Lecturer --</option>
            {lecturers?.map((lecturer: any) => (
              <option key={lecturer.id} value={lecturer.id}>
                {lecturer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit button with dynamic text based on create/update mode */}
        <button type="submit" className="submit-btn">
          {course ? "Update" : "Create"} Course
        </button>
        {/* Display error message if any */}
        {error && <ErrorMessage message={error} />}
      </form>

      {/* Inline CSS styles for the component */}
      <style>{`
        .form-container {
          display: flex;
          flex-direction: row-reverse;
          justify-content: center;
          align-items: flex-start;
          padding: 20px;
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
        }

        .course-form {
          width: 500px;
          background: white;
          padding: 20px;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .form-group {
          margin-right: 20px;
          margin-bottom: 15px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
          color: #333;
        }

        input, select {
          width: 100%;
          padding: 10px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 14px;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #4caf50;
          box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
        }

        .submit-btn {
          background-color: #4caf50;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          margin-top: 10px;
          transition: background-color 0.2s;
        }

        .submit-btn:hover {
          background-color: #45a049;
        }

        input:invalid {
          border-color: #e74c3c;
        }

        input:invalid:focus {
          box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
        }

        .close-button {
          width: 32px;
          height: 32px;
          background-color: #f5f5f5;
          border: none;
          border-radius: 50%;
          color: #666;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          margin-left: 10px;
        }

        .close-button:hover {
          background-color: #e74c3c;
          color: white;
          transform: scale(1.1);
        }

        .close-button:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.5);
        }
      `}</style>
    </div>
  );
};
