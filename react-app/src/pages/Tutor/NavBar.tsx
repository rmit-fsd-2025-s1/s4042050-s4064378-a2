import { TutoTabType } from "./TutorDashboard";

export const NavBar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: TutoTabType;
  setActiveTab: React.Dispatch<React.SetStateAction<TutoTabType>>;
}) => {
  return (
    <nav>
      <ul>
        <li>
          <button
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile Information
          </button>
        </li>
        <li>
          <button
            className={activeTab === "apply" ? "active" : ""}
            onClick={() => setActiveTab("apply")}
          >
            Apply for Roles
          </button>
        </li>
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
