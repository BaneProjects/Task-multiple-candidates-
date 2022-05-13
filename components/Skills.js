import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import SkillFormAdd from "./SkillFormAdd";
import SkillFormEdit from "./SkillFormEdit";

const fetchSkills = async () => {
  const skills = await axios.get("http://localhost:3001/skills");
  return skills;
};

const Skills = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState({});

  const {
    data: skillsAll,
    status: statusSkills,
    refetch,
  } = useQuery("skillsAll", fetchSkills);


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


  const _handleDelete = (id) => {
    (async () => {
      await axios.delete("http://localhost:3001/skills/" + id);
      refetch();
    })();
  };

  const _handleEdit = (skill) => {
    console.log("edit", skill);
    setEditMode(true);
    setEditingItem(skill);
  };

  const closeEditor = () => {
    setEditMode(false);
    setEditingItem({});
  };

  return (
    <div className="skill-frame">
      <h1>Skills</h1>
      {statusSkills === "success" ? (
        <div className="skills">
          {skills.map((skill) => {
            return (
              <div key={skill.id}>
                <p>
                  {skill.skill} - {skill.year}
                </p>{" "}
                <button
                  className="edit-btn"
                  onClick={(e) => {
                    _handleEdit(skill);
                  }}
                >
                  Edit
                </button>{" "}
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    _handleDelete(skill.id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {editMode ? (
        <>
          <h2>Edit skill</h2>
          <SkillFormEdit
            editingItem={editingItem}
            closeEditor={closeEditor}
            refresh={refetch}
          />
        </>
      ) : (
        <></>
      )}

      <h2>Add new skill</h2>
      <SkillFormAdd refresh={refetch} selectedCandidateId={props.selectedCandidateId} />
    </div>
  );
};

export default Skills;
