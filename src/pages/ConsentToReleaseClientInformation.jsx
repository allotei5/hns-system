import { useState, useEffect, useId } from "react";
import { v4 as uuidv4 } from "uuid";

import InputText from "../components/InputText";
import InputSelect from "../components/InputSelect";
import InputNumber from "../components/InputNumber";
import InputDate from "../components/InputDate";
import CareGiver from "../components/CareGiver";

const ConsentToReleaseClientInformation = () => {
  const [clientName, setClientName] = useState("");
  const [healthCardName, setHealthCardName] = useState("");
  const [careGivers, setCareGivers] = useState([]);
  const [pronouns, setPronouns] = useState("");

  const addCareGiver = () => {
    const uniqueId = uuidv4();
    setCareGivers([
      ...careGivers,
      {
        id: uniqueId,
        name: "",
        relation: "",
      },
    ]);
  };
  useEffect(() => {
    console.log(careGivers);
  }, [careGivers]);
  return (
    <div>
      <h1 className="font-semibold text-2xl md:text-3xl mt-2 mb-20 text-center">
        CONSENT TO RELEASE CLIENT INFORMATION
      </h1>
      <form>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <InputText
            label="Client Name"
            htFor="clientName"
            required={true}
            value={clientName}
            setValue={setClientName}
          />
          <InputText
            label="Name on health card (if different)"
            htFor="healthName"
            required={false}
            value={healthCardName}
            setValue={setHealthCardName}
          />
          <InputSelect
            htFor="pronouns"
            label="Pronouns"
            required={true}
            options={["He/Him", "She/Her", "They/Them", "Prefer not to say"]}
            value={pronouns}
            setValue={setPronouns}
          />
          <InputNumber
            label="Health Card Number"
            htFor="healthCardNumber"
            required={true}
          />
          <InputDate
            label="Date Of Birth"
            htFor="dateOfBirth"
            required={true}
          />
        </div>
        <p className="my-5">
          If you are giving consent but you are not the client, please indicate:
        </p>
        <div>
          {careGivers.map((cg) => (
            <CareGiver
              key={cg.id}
              careGiver={cg}
              careGivers={careGivers}
              setCareGivers={setCareGivers}
            />
          ))}
          <button
            onClick={addCareGiver}
            type="button"
            className="bg-[#5B7BEB] border border-[#5B7BEB] text-white rounded py-3 px-2 md:px-6 my-3"
          >
            Add New Caregiver
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConsentToReleaseClientInformation;
