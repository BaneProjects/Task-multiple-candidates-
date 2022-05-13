
import { Link } from "react-router-dom";

const Header = (props) => {

  const handleCandidateChange = (e) => {
    const candidate = parseFloat(e.target.value);
    props.onCandidateChange(candidate);
    console.log(candidate);
  }

  console.log("candidate", props.candidate)
  return (
    <div className="header">
      <Link to={"/"} className="link">
        Home
      </Link>
      <Link to={"/skills"} className="link">
        skills
      </Link>
      <Link to={"/static"} className="link">
        static
      </Link>
      <select onChange={handleCandidateChange} value={props.selectedCandidateId}>
        <option value={""}>
          --select candidate--
        </option>
        {props.candidates && Array.isArray(props.candidates.data) && props.candidates.data.map((candidate) => {
          return (
            <option key={candidate.id} value={candidate.id}>
              {candidate.firstName} - {candidate.lastName}
            </option>
          )
        })}
      </select>
      <button onClick={props.changeTheme}>{props.themeName}</button>
    </div>
  );
};

export default Header;
