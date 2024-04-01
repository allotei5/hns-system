import { useId } from "react";
import InputText from "./InputText";
import InputSelect from "./InputSelect";

const CareGiver = ({ careGiver, careGivers, setCareGivers }) => {
  const uniqueId = useId();

  const updateName = (care_giver_name) => {
    setCareGivers(
      careGivers.map((cg) =>
        cg.id == careGiver.id ? { ...careGiver, care_giver_name } : cg
      )
    );
  };

  const updateRelation = (relationship_to_client) => {
    setCareGivers(
      careGivers.map((cg) =>
        cg.id == careGiver.id ? { ...careGiver, relationship_to_client } : cg
      )
    );
  };

  const removeCareGiver = (id) => {
    setCareGivers(careGivers.filter((cg) => cg.id != id));
  };
  const optionsForRelationship = ["Father", "Mother", "Legal Guardian"];
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 content-end mb-3 ">
      <div className="col-span-2">
        <InputText
          label="Care Giver Name"
          htFor={`careGiverName-${uniqueId}`}
          required={true}
          value={careGiver.care_giver_name}
          setValue={updateName}
          className=""
        />
      </div>
      <div className="col-span-2">
        <InputSelect
          label="Relationship to client"
          htFor={`careGiverRelation-${uniqueId}`}
          required={true}
          options={optionsForRelationship}
          value={careGiver.relationship_to_client}
          setValue={updateRelation}
        />
      </div>

      <div className="self-end ">
        <button
          type="button"
          onClick={() => removeCareGiver(careGiver.id)}
          className="text-white  bg-[#923D41] border border-[#923D41] rounded px-2 md:px-6 py-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CareGiver;
