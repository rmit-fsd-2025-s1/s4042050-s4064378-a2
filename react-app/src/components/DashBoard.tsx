import { Page } from "../App";
import { setCurrentUserToLocalStorage } from "../util/localStorage";
import { LogoutButton } from "./Buttons/LogoutButton";
import { DashboardWrapper } from "./element";

/**
 * Dashboard component that displays a header and provides navigation functionality.
 *
 * @param {string} header - The title/text to display in the dashboard header
 * @param {(page: Page) => void} navigateTo - Callback function for navigating to different pages
 * @returns {JSX.Element} The Dashboard component UI
 */

export const Dashboard = ({
  header,
  navigateTo,
}: {
  header: string;
  navigateTo: (page: Page) => void;
}) => {
  const onLogout = () => {
    setCurrentUserToLocalStorage(null);
    navigateTo("login");
  };

  return (
    <DashboardWrapper>
      <div>
        <h1>{header}</h1>
      </div>
      <div>
        <LogoutButton
          onClick={() => {
            onLogout();
          }}
        />
      </div>
    </DashboardWrapper>
  );
};
