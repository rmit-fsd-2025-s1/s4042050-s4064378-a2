import { useMutation } from "@apollo/client";
import { Course } from "./CourseList";
import { CREATE_COURSE, UPDATE_COURSE } from "../graphql/queiris";
import { ErrorMessage } from "./LoginPage";
import { useState } from "react";

interface CourseFormProps {
  course?: Course;
  onSuccess: () => void;
}

export const CourseForm: React.FC<CourseFormProps> = ({
  course,
  onSuccess,
}) => {
  const [mutate] = useMutation(course ? UPDATE_COURSE : CREATE_COURSE);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const input = {
      code: formData.get("code") as string,
      name: formData.get("name") as string,
    };

    try {
      const { data } = await mutate({
        variables: course
          ? { id: course.id, name: input.name, code: input.code }
          : { input },
      });
      if (data.createCourse.success) {
        onSuccess();
      } else {
        setError(data.createCourse.message);
      }
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  return (
    <div className="form-container">
      <button className="close-button" onClick={() => onSuccess()}>
        X
      </button>
      <form onSubmit={handleSubmit} className="course-form">
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

        <div className="form-group">
          <label htmlFor="name">Course Name</label>
          <input id="name" name="name" defaultValue={course?.name} required />
        </div>

        <button type="submit" className="submit-btn">
          {course ? "Update" : "Create"} Course
        </button>
        {error && <ErrorMessage message={error} />}
      </form>

      <style>{`

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
    margin-left:10px;
    
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
          width:500px;
          background: white;
          padding: 20px;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .form-group {
        margin-right:20px;
          margin-bottom: 15px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
          color: #333;
        }

        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 14px;
        }

        input:focus {
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

        /* Error styling to match your existing pattern */
        input:invalid {
          border-color: #e74c3c;
        }

        input:invalid:focus {
          box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
        }
      `}</style>
    </div>
  );
};
