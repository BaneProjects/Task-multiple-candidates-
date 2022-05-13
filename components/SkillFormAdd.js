import axios from "axios";
import { useEffect, useState } from "react";

const SkillFormAdd = (props) => {
  const preset = {
    candidateId: null,
    skill: "",
    year: "",
  };

  const [state, setState] = useState(preset);

  useEffect(() => {
    setState({
      ...state,
      candidateId: props.selectedCandidateId
    });
  }, [props.selectedCandidateId]);

  const handleChange = (e) => {
    const target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(e.target)

    if (name === "year") {
      value = parseInt(value);
    }

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleClickSubmit = (e) => {
    console.log("state", state);
    if (state.year === "" || state.skill === "") {
      alert("You have not filled in all the fields");
      return false;
    } else {
      e.preventDefault();
      (async () => {
        await axios.post("http://localhost:3001/skills", {
          ...state,
        });

        // brisanje forme
        setState({
          ...preset,
          candidateId: props.selectedCandidateId
        });

        if (typeof props.refresh === "function") {
          props.refresh();
        }
      })();
    }
  };

  return (
    <>
      {state.candidateId &&
        <form>
          <label>candidateId</label>
          <input
            readOnly
            type="text"
            name="candidateId"
            value={state.candidateId}
          />
          <label>Skill</label>
          <input
            type="text"
            name="skill"
            value={state.skill}
            onChange={handleChange}
            placeholder="enter skill"
          />
          <label>Year of acquiring skill</label>
          <input
            type="number"
            name="year"
            placeholder="enter year"
            value={state.year}
            onChange={handleChange}
          />
          <button type="button" onClick={handleClickSubmit}>
            Submit new skill
          </button>
        </form>
      }
    </>
  );
};

export default SkillFormAdd;
