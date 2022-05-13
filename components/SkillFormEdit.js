import axios from "axios";
import { useEffect, useState } from "react";

const SkillFormEdit = (props) => {
  const preset = props.editingItem;
  const [state, setState] = useState(preset);

  useEffect(() => {
    setState(props.editingItem);
  }, [props.editingItem]);

  const handleChange = (e) => {
    const target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (name === "year") {
      value = parseInt(value);
    }

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();
    if (state.year === "" || state.skill === "") {
      alert("You have not filled in all the fields");
      return false;
    } else {
      (async () => {
        await axios.patch("http://localhost:3001/skills/" + state.id, {
          ...state,
        });

        setState(preset);

        if (typeof props.refresh === "function") {
          props.refresh();
        }
        if (typeof props.closeEditor === "function") {
          props.closeEditor();
        }
      })();
    }
  };

  const handleClickCancel = (e) => {
    e.preventDefault();
    if (typeof props.closeEditor === "function") {
      props.closeEditor();
    }
  };

  return (
    <>
      <form>
        <label>skill ID</label>
        <input readOnly type="text" name="skill" value={state.id} />
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
          Submit changes
        </button>
        <button
          type="button"
          className="cancle-btn"
          onClick={handleClickCancel}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default SkillFormEdit;
