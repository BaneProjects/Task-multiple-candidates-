import { useQuery } from "react-query";
import axios from "axios";
import SkillsChart from "./SkillsChart";

const fetchSkills = async () => {
  const skills = await axios.get("http://localhost:3001/skills");
  return skills;
};

const Home = (props) => {
  const { data: skillsAll, status: statusSkills } = useQuery(
    "skillsAll",
    fetchSkills
  );

  const candidate = props.candidate;

  // filtering skills
  let _skillsAll = [];
  if (skillsAll && Array.isArray(skillsAll.data)) {
    _skillsAll = skillsAll.data;
  }
  const skills = _skillsAll.filter((skill) => {
    if (props.selectedCandidateId && props.selectedCandidateId === skill.candidateId) {
      return true;
    }
    return false;
  });


  return (
    <>
      <div className="home-container">
        <div className="home-header">
          <p>First Name</p>
          <p>Last Name</p>
          <p>Email</p>
          <p>Skills</p>
        </div>
        {candidate && statusSkills === "success" ? (
          <>
            <div className="home-row" key={candidate.dataid}>
              <p>{candidate.firstName}</p>
              <p>{candidate.lastName}</p>
              <p>{candidate.email}</p>
              <div className="skill">
                {skills.map((skill) => {
                  return <p key={skill.id}>{skill.skill}</p>;
                })}
              </div>
            </div>
            <h2>Skill Chart</h2>
            <SkillsChart skills={skills} />
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default Home;
