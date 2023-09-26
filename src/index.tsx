import { createRoot } from "react-dom/client";
import MainPage from "./components/MainPage";

const el = document.getElementById("root");
const root = createRoot(el!);

const App: React.FC = () => {
  return (
    <div>
      <MainPage />
    </div>
  );
};

root.render(<App />);
