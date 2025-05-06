import { mockCourses } from "../mockData/mockData";

export function getCourseDisplay(courseId: string): string {
  const course = mockCourses.find((c) => c.id === courseId);
  return course ? `${course.name} (${course.code})` : courseId;
}
