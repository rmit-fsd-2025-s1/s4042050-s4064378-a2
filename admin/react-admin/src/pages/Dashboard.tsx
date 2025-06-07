// import React from "react";
// import { useQuery, gql } from "@apollo/client";
// import { useNavigate } from "react-router-dom";

// const GET_DATA = gql`
//   query GetDashboardData {
//     # Add your GraphQL queries here based on your data requirements
//     users {
//       id
//       name
//       email
//     }
//     products {
//       id
//       name
//       price
//     }
//   }
// `;

// const Dashboard = () => {
//   const navigate = useNavigate();
//   // const { loading, error, data } = useQuery(GET_DATA);

//   // const handleLogout = () => {
//   //   localStorage.removeItem("isAuthenticated");
//   //   navigate("/");
//   // };

//   // if (!localStorage.getItem("isAuthenticated")) {
//   //   navigate("/");
//   //   return null;
//   // }

//   // if (loading) return <p>Loading...</p>;
//   // if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div className="dashboard">
//       <header>
//         <h1>Admin Dashboard</h1>
//         {/* <button onClick={handleLogout}>Logout</button> */}
//       </header>

//       <div className="data-sections">
//         {/* Display your data here */}
//         <section>
//           <h2>Users</h2>
//           {/* Render user data */}
//         </section>

//         <section>
//           <h2>Products</h2>
//           {/* Render product data */}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useState } from "react";
// import { setCurrentUserToLocalStorage } from "../util/localStorage";
import {
  DashboardRightSide,
  DashboardWrapper,
  LogoutButtonWrapper,
} from "./element";

/**
 * Dashboard component that displays a header and provides navigation functionality.
 *
 * @param {string} header - The title/text to display in the dashboard header
 * @param {(page: Page) => void} navigateTo - Callback function for navigating to different pages
 * @returns {JSX.Element} The Dashboard component UI
 */

export const Dashboard = () => {
  const onLogout = () => {
    // localStorage.clear();
    // navigateTo("landing");
  };
  // const [generatedConfig, setX] = useState(genConfig(avatarConfig));

  return (
    <DashboardWrapper>
      <div>
        <h1>Admin Dashboard</h1>
      </div>
      <DashboardRightSide>
        <LogoutButton
          onClick={() => {
            onLogout();
          }}
        />
        {/* &nbsp;&nbsp;&nbsp;&nbsp;
        <div>
          <Avatar
            style={{ width: "60px", height: "60px" }}
            {...generatedConfig}
          />

          <div
            className={`avatar ${avatarConfig.shape}`}
            style={{
              backgroundColor: avatarConfig.bgColor,
              backgroundImage: avatarConfig.isGradient
                ? `linear-gradient(45deg, ${avatarConfig.bgColor}, #FFFFFF)`
                : undefined,
            }}
          />
        </div> */}
      </DashboardRightSide>
    </DashboardWrapper>
  );
};

const LogoutButton = ({
  children,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return <LogoutButtonWrapper {...props}>Log out</LogoutButtonWrapper>;
};
