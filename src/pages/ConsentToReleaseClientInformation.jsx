import { useState, useEffect, useId, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import InputText from "../components/InputText";
import InputSelect from "../components/InputSelect";
import InputNumber from "../components/InputNumber";
import InputDate from "../components/InputDate";
import CareGiver from "../components/CareGiver";
import RecepientPerson from "../components/RecepientPerson";
import InputEmail from "../components/InputEmail";
import Signature from "../components/Signature";
import AlertModal from "../components/AlertModal";

import { AlertContext } from "../contexts/AlertContext";

const ConsentToReleaseClientInformation = () => {
  const [clientName, setClientName] = useState("");
  const [healthCardName, setHealthCardName] = useState("");
  const [careGivers, setCareGivers] = useState([]);
  const [pronouns, setPronouns] = useState("");
  const [recepients, setRecepients] = useState([]);
  const [email, setEmail] = useState("");
  const [ dob, setDob ] = useState("")
  const [ today, setToday ] = useState(new Date().toISOString().substring(0, 10))
  // console.log(new Date().toISOString().substring(0, 10))

  const { alert, setAlert } = useContext(AlertContext)

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
  const addRecepient = () => {
    const uniqueId = uuidv4();
    setRecepients([
      ...recepients,
      {
        id: uniqueId,
        name: "",
      },
    ]);
  };
  // if (!alert) {
  //   if (window.confirm("This form is available in languages other than English. Would you like to translate it?")) {
  //     // set state to highlight translate
  //     setAlert(true)
  //   }else {
  //     setAlert(false)
  //   }
  // }
  

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
            value={dob}
            setValue={setDob}
            isDisabled={false}
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
        <p className="my-5">
          I give consent to Hearing and Speech Nova Scotia (HSNS) to share
          information related to the HSNS services provided for the client named
          above. Information can be shared with the following individuals /
          agencies /professionals:
        </p>
        <div>
          {recepients.map((rec) => (
            <RecepientPerson
              key={rec.id}
              recepient={rec}
              recepients={recepients}
              setRecepients={setRecepients}
            />
          ))}
          <button
            onClick={addRecepient}
            type="button"
            className="bg-[#5B7BEB] border border-[#5B7BEB] text-white rounded py-3 px-2 md:px-6 my-3"
          >
            Add New Person
          </button>
        </div>
        <div className="my-3 mb-5">
          <p>
            I give permission for HSNS to communicate about my assessment and/or
            treatment with the individuals/agencies/professionals listed above.
            Communication may be face-to-face, by{" "}
            <span className="font-bold">phone</span>, by{" "}
            <span className="font-bold">mail</span>, by{" "}
            <span className="font-bold">fax</span>, or by{" "}
            <span className="font-bold">secure email</span>.
          </p>
          <div>
            <input
              type="radio"
              id="communicate_radio_yes"
              name="communicate_radio"
              value="yes"
            />
            <label htmlFor="communicate_radio_yes" className="mx-2">
              Yes
            </label>
            <input
              type="radio"
              id="communicate_radio_no"
              name="communicate_radio"
              value="no"
            />
            <label htmlFor="communicate_radio_no" className="mx-2">
              No
            </label>
          </div>
        </div>
        <div className="mt-3 mb-5">
          <p>
            I understand that <span className="font-bold">email</span>{" "}
            communications <span className="font-bold">may not</span> be secure.
            I give permission for HSNS staff to send assessment and/or treatment
            information to me by <span className="font-bold">email</span>.
          </p>
          <div>
            <input
              type="radio"
              id="communicate_email_yes"
              name="communicate_email"
              value="yes"
            />
            <label htmlFor="communicate_email_yes" className="mx-2">
              Yes
            </label>
            <input
              type="radio"
              id="communicate_email_no"
              name="communicate_email"
              value="no"
            />
            <label htmlFor="communicate_email_no" className="mx-2">
              No
            </label>
          </div>
          <div className="md:w-1/2">
            <InputEmail
              label="Email"
              htFor="email"
              required={false}
              value={email}
              setValue={setEmail}
            />
          </div>
        </div>
        <div className="mt-3 mb-5">
          <p>
            I give permission for HSNS staff to contact me via{" "}
            <span className="font-bold">text</span> using a secure HSNS-issued
            cell phone. HSNS staff will not send personal health information by{" "}
            <span className="font-bold">text</span>. I understand that my
            personal health information may not be kept secure if I send it by{" "}
            <span className="font-bold">text</span>.
          </p>
          <div>
            <input
              type="radio"
              id="communicate_text_yes"
              name="communicate_text"
              value="yes"
            />
            <label htmlFor="communicate_text_yes" className="mx-2">
              Yes
            </label>
            <input
              type="radio"
              id="communicate_text_no"
              name="communicate_text"
              value="no"
            />
            <label htmlFor="communicate_text_no" className="mx-2">
              No
            </label>
            <input
              type="radio"
              id="communicate_text_na"
              name="communicate_text"
              value="na"
            />
            <label htmlFor="communicate_text_na" className="mx-2">
              Not Applicable
            </label>
          </div>
        </div>
        <p>
          Hearing and Speech Nova Scotia uses an electronic health record
          system. Any staff members who provides care to you can view your
          personal health information as needed to provide you with hearing and
          speech services. Personal health information is considered
          confidential in compliance with the Personal Health Information Act
          (PHIA). <br/><br/> This consent is valid for one year from the date of signature. <br/><br/>
          If you wish to change any information on this form, please talk to any
          of our staff members.
        </p>
        <div className="my-5">
            <p className="font-black text-xl">By signing below, you confirm that you have legal authority to give consent.</p>
            <Signature />
        </div>
        <div className="md:w-1/2">
          <InputDate
              label="Today's Date"
              htFor="todaysDate"
              required={true}
              value={today}
              setValue={setToday}
              isDisabled={true}
            />
          </div>
          <button type="button" className="text-white bg-[#923D41] border border-[#923D41] rounded px-2 md:px-4 py-2 text-sm mt-2">Submit</button>

      </form>
    </div>
  );
};

export default ConsentToReleaseClientInformation;
