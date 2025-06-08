import { CandidateTabType } from "./CandidateDashboard";

/**
 * Navigation bar component for the Candidate Dashboard
 *
 * @param activeTab - Currently active tab
 * @param setActiveTab - Function to update the active tab
 */
export const NavBar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: CandidateTabType;
  setActiveTab: React.Dispatch<React.SetStateAction<CandidateTabType>>;
}) => {
  return (
    <nav>
      {/* Navigation list for dashboard tabs */}
      <ul>
        {/* Profile Information tab button */}
        <li>
          <button
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile Information
          </button>
        </li>

        {/* Apply for Roles tab button */}
        <li>
          <button
            className={activeTab === "apply" ? "active" : ""}
            onClick={() => setActiveTab("apply")}
          >
            Apply for Roles
          </button>
        </li>

        {/* Applied Roles tab button */}
        <li>
          <button
            className={activeTab === "roles" ? "active" : ""}
            onClick={() => setActiveTab("roles")}
          >
            Applied Roles
          </button>
        </li>
      </ul>
    </nav>
  );
};
