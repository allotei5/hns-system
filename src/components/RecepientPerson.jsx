import { useId } from "react";
import InputText from "./InputText";

const RecepientPerson = ({ recepient, recepients, setRecepients }) => {
  const uniqueId = useId();
  const updateName = (relationship_to_client) => {
    setRecepients(recepients.map(rec => rec.id == recepient.id ? { ...recepient, relationship_to_client, institution_name: relationship_to_client } : rec))
  };
  console.log(recepient)

  const removeRecepient = (id) => {
    setRecepients(recepients.filter((rec) => rec.id != id));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 content-end mb-3 ">
      <div className="col-span-4">
        <InputText
          label="Recepient Name"
          htFor={`recepientName-${uniqueId}`}
          required={true}
          value={recepient.relationship_to_client}
          setValue={updateName}
          className=""
        />
      </div>
      <div className="self-end ">
        <button
          type="button"
          onClick={() => removeRecepient(recepient.id)}
          className="text-white  bg-[#923D41] border border-[#923D41] rounded px-2 md:px-6 py-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default RecepientPerson;
