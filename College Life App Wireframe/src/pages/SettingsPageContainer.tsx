import { SettingsPage } from "../components/SettingsPage";

interface SettingsPageContainerProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function SettingsPageContainer({ darkMode, setDarkMode }: SettingsPageContainerProps) {
  return <SettingsPage darkMode={darkMode} setDarkMode={setDarkMode} />;
}
