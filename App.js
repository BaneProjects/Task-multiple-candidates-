import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/header";
import Skills from "./components/Skills";
import Static from "./components/Static";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchCandidates = async () => {
  const res = await axios.get("http://localhost:3001/candidates");
  return res;
};

function App() {
  const [theme, setTheme] = useState(true);
  const [themeName, setThemeName] = useState("Dark Mode");

  const [selectedCandidateId, setSelectedCandidateId] = useState("");

  const { data: candidates, status } = useQuery(
    "allcanditates",
    fetchCandidates
  );

  useEffect(() => {
    if (candidates && Array.isArray(candidates.data) && candidates.data[0]) {
      if (selectedCandidateId === "") {
        setSelectedCandidateId(candidates.data[0].id);
      }
    }
  }, [candidates, selectedCandidateId]);

  const onCandidateChange = (candidate) => {

    setSelectedCandidateId(candidate);
  };

  // filtriranje kandidata
  let candidate = null;
  if (candidates && Array.isArray(candidates.data)) {
    candidates.data.forEach((cand) => {
      if (cand.id === selectedCandidateId) {
        candidate = cand;
      }
    });
  }

  const changeTheme = () => {
    if (theme) {
      setTheme(false);
      setThemeName("Light Mode");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme(true);
      setThemeName("Dark Mode");
      localStorage.setItem("theme", "light");
    }
  };

  const themeStorage = window.localStorage.getItem("theme");

  useEffect(() => {
    if (themeStorage === "light" || themeStorage === null) {
      setTheme(true);
      setThemeName("Dark Mode");
    } else {
      setTheme(false);
      setThemeName("Light Mode");
    }
  }, []);

  return (
    <div className={theme ? null : "dark"}>
      <Header
        changeTheme={changeTheme}
        themeName={themeName}
        candidates={candidates}
        onCandidateChange={onCandidateChange}
        selectedCandidateId={selectedCandidateId}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home selectedCandidateId={selectedCandidateId} candidate={candidate} />
          }
        ></Route>
        <Route
          path="/skills"
          element={<Skills selectedCandidateId={selectedCandidateId} />}
        ></Route>
        <Route path="/static" element={<Static />}></Route>
      </Routes>
    </div>
  );
}

export default App;
