import React from "react";
import { useQuery } from "@apollo/client";
// import { GET_UNSELECTED_CANDIDATES } from "../../graphql/queiris";

const UnselectedCandidates: React.FC = () => {
//   const { data, loading, error } = useQuery(GET_UNSELECTED_CANDIDATES);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3>Unselected Candidates</h3>
      <ul>
        {/* {data.unselectedCandidates.map((c: any) => (
          <li key={c.id}>
            {c.firstName} {c.lastName} - {c.email}
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default UnselectedCandidates;
