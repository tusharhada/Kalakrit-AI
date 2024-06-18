import Navigation from "./Components/Navigation";
import Translation from "./Components/Translation";
import Features from "./Components/Features";
import Support from "./Components/Support";
import { useLocalStorage } from "@uidotdev/usehooks";

function App() {
  useLocalStorage("tone", "Casual");
  useLocalStorage("textType", "Legal");
  useLocalStorage("region", "India");
  useLocalStorage("domain", "Law");

  return (
    <div className="dark:bg-dark dark:text-white bg-white text-black min-h-screen flex flex-col items-center">
      <div className="lg:w-[90%] w-[95%]">
        <Navigation />
      </div>
      <div className="min-h-[40vh] md:w-[85%] w-[95%] h-fit-content flex mt-6">
        <Translation />
      </div>
      <div className="md:w-[85%] w-[95%] ">
        <Features />
      </div>
      <div className="md:w-[85%] w-[95%] mb-10">
        <Support />
      </div>
    </div>
  );
}

export default App;
