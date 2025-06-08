import React from "react";
import { useQuery } from "@apollo/client";
// import { GET_CANDIDATES_MORE_THAN_3 } from "../../graphql/queiris";

const CandidatesWithMoreThan3: React.FC = () => {
//   const { data, loading, error } = useQuery(GET_CANDIDATES_MORE_THAN_3);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3>Candidates in More Than 3 Courses</h3>
      {/* <ul>
        {data.candidatesWithMoreThan3Courses.map((c: any) => (
          <li key={c.id}>
            {c.firstName} {c.lastName} - {c.email}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default CandidatesWithMoreThan3;
