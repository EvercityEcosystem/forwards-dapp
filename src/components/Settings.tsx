import { RadioGroup, Radio } from "@nextui-org/react";
import useThemeStore from "../stores/theme";

const HomePage = () => {
  const [theme, setTheme] = useThemeStore((state) => [state.theme, state.setTheme]);

  return (
    <div>
      <header className="flex items-center gap-3 rounded-medium border-small border-divider p-4">
        <h2 className="text-medium font-medium text-default-700">Settings</h2>
      </header>
      <main className="mt-4 h-full w-full overflow-visible">
        <RadioGroup label="Select app theme" defaultValue={theme} onValueChange={setTheme}>
          <Radio value="dark">Dark</Radio>
          <Radio value="light">Light</Radio>
        </RadioGroup>
      </main>
    </div>
  );
};

export default HomePage;
