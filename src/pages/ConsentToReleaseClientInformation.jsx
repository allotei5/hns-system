import { useState, useEffect, useId, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";

import InputText from "../components/InputText";
import InputSelect from "../components/InputSelect";
import InputNumber from "../components/InputNumber";
import InputDate from "../components/InputDate";
import CareGiver from "../components/CareGiver";
import RecepientPerson from "../components/RecepientPerson";
import InputEmail from "../components/InputEmail";
import Signature from "../components/Signature";
import AlertModal from "../components/AlertModal";
import ErrorDiv from "../components/ErrorDiv";
import api from "../api/api";

import { AlertContext } from "../contexts/AlertContext";

const ConsentToReleaseClientInformation = () => {
  const [clientName, setClientName] = useState("");
  const [healthCardName, setHealthCardName] = useState("");
  const [careGivers, setCareGivers] = useState([]);
  const [pronouns, setPronouns] = useState("");
  const [healthCardNumber, setHealthCardNumber] = useState("");
  const [recepients, setRecepients] = useState([]);
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [today, setToday] = useState(new Date().toISOString().substring(0, 10));
  const [communicateRadio, setCommunicateRadio] = useState("");
  const [communicateEmail, setCommunicateEmail] = useState("");
  const [communicateText, setCommunicateText] = useState("");
  const [ signatureImage, setSignatureImage ] = useState("")
  // console.log(new Date().toISOString().substring(0, 10))

  const [errors, setErrors] = useState({});

  const { alert, setAlert } = useContext(AlertContext);

  const addCareGiver = () => {
    const uniqueId = uuidv4();
    setCareGivers([
      ...careGivers,
      {
        id: uniqueId,
        care_giver_name: "",
        relationship_to_client: "",
      },
    ]);
  };
  const addRecepient = () => {
    const uniqueId = uuidv4();
    setRecepients([
      ...recepients,
      {
        id: uniqueId,
        institution_name: "",
      },
    ]);
  };

  const careGiverSchema = Joi.object({
    id: Joi.required(),
    care_giver_name: Joi.string().max(50).required(),
    relationship_to_client: Joi.required(),
  });

  const recepientSchema = Joi.object({
    id: Joi.required(),
    institution_name: Joi.string().max(50).required(),
  });

  const schema = Joi.object({
    client_name: Joi.string().min(3).max(50),
    name_on_health_card: Joi.string(),
    pronouns: Joi.required(),
    health_card_number: Joi.number()
      .integer()
      .max(9999999999)
      .min(1000000000)
      .required(),
    date_of_birth: Joi.date().required(),
    caregivers: Joi.array().items(careGiverSchema),
    caregiver_types: Joi.array().items(recepientSchema),
    permission_to_communicate: Joi.valid("yes", "no").required(),
    permission_to_email: Joi.valid("yes", "no").required(),
    permission_to_text: Joi.valid("yes", "no", "not applicable").required(),
    email_to_communicate_with: Joi.string()
  });

  // const [formData, setFormData] = useState({});
  var finalFormData = {};

  const validate = () => {
    let formData = {
      consent_title: "CONSENT TO SHARE SENSITIVE INFORMATION",
      client_name: clientName,
      name_on_health_card: healthCardName,
      pronouns,
      health_card_number: healthCardNumber,
      date_of_birth: dob,
      caregivers: careGivers,
      caregiver_types: recepients,
      permission_to_communicate: communicateRadio,
      permission_to_email: communicateEmail,
      permission_to_text: communicateText,
      email_to_communicate_with: email,
      date_of_signature: today,
      signatureImage,
    };
    let formData1 = {
      client_name: clientName,
      name_on_health_card: healthCardName,
      pronouns,
      health_card_number: healthCardNumber,
      date_of_birth: dob,
      caregivers: careGivers,
      caregiver_types: recepients,
      permission_to_communicate: communicateRadio,
      permission_to_email: communicateEmail,
      permission_to_text: communicateText,
      email_to_communicate_with: email,
    };

    const { error } = schema.validate(formData1);

    if (!error) {
      finalFormData = { ...formData };
      return null;
    }

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    console.log(errors);
    setErrors(errors || {});
    if (errors) return;

    console.log("form submitted", finalFormData);
    try {
      const res = await api.post("/consent", finalFormData);
      console.log(res)
    } catch (error) {
      console.log(error)
    }
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
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <InputText
              label="Client Name"
              htFor="clientName"
              required={true}
              value={clientName}
              setValue={setClientName}
            />
            {errors.client_name && <ErrorDiv message={errors.client_name} />}
          </div>

          <div>
            <InputText
              label="Name on health card (if different)"
              htFor="healthName"
              required={false}
              value={healthCardName}
              setValue={setHealthCardName}
            />
            {errors.name_on_health_card && (
              <ErrorDiv message={errors.name_on_health_card} />
            )}
          </div>
          <div>
            <InputSelect
              htFor="pronouns"
              label="Pronouns"
              required={true}
              options={["He/Him", "She/Her", "They/Them", "Prefer not to say"]}
              value={pronouns}
              setValue={setPronouns}
            />
            {errors.pronouns && <ErrorDiv message={errors.pronouns} />}
          </div>
          <div>
            <InputNumber
              label="Health Card Number"
              htFor="healthCardNumber"
              required={true}
              value={healthCardNumber}
              setValue={setHealthCardNumber}
            />
            {errors.health_card_number && (
              <ErrorDiv message={errors.health_card_number} />
            )}
          </div>
          <div>
            <InputDate
              label="Date Of Birth"
              htFor="dateOfBirth"
              required={true}
              value={dob}
              setValue={setDob}
              isDisabled={false}
            />
            {errors.date_of_birth && <ErrorDiv message={errors.date_of_birth} />}
          </div>
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
          {errors.caregivers && <ErrorDiv message={errors.caregivers} />}
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
          {errors.caregiver_types && <ErrorDiv message={errors.caregiver_types} />}
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
          <div className="flex">
            {["yes", "no"].map((choice) => (
              <div key={choice}>
                <input
                  type="radio"
                  name="communicate_radio"
                  value={choice}
                  onChange={(e) => setCommunicateRadio(e.target.value)}
                  checked={choice == communicateRadio}
                />
                <label
                  htmlFor="communicate_radio_yes"
                  className="mx-2 capitalize"
                >
                  {choice}
                </label>
              </div>
            ))}
            {errors.permission_to_communicate && (
              <ErrorDiv message={errors.permission_to_communicate} />
            )}
          </div>
        </div>
        <div className="mt-3 mb-5">
          <p>
            I understand that <span className="font-bold">email</span>{" "}
            communications <span className="font-bold">may not</span> be secure.
            I give permission for HSNS staff to send assessment and/or treatment
            information to me by <span className="font-bold">email</span>.
          </p>
          <div className="flex">
            {["yes", "no"].map((choice) => (
              <div>
                <input
                  type="radio"
                  id="communicate_email_yes"
                  name="communicate_email"
                  value={choice}
                  onChange={(e) => setCommunicateEmail(e.target.value)}
                  checked={choice == communicateEmail}
                  className="capitalize"
                />
                <label htmlFor="communicate_email_yes" className="mx-2">
                  {choice}
                </label>
              </div>
            ))}
            {errors.permission_to_email && (
              <ErrorDiv message={errors.permission_to_email} />
            )}
          </div>
          <div className="md:w-1/2">
            <InputEmail
              label="Email"
              htFor="email"
              required={false}
              value={email}
              setValue={setEmail}
            />
            {errors.email_to_communicate_with && (<ErrorDiv message={errors.email_to_communicate_with} />)}
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
          <div className="flex">
            {["yes", "no", "not applicable"].map((choice) => (
              <div key={choice}>
                <input
                  type="radio"
                  id="communicate_text_yes"
                  name="communicate_text"
                  value={choice}
                  onChange={(e) => setCommunicateText(e.target.value)}
                  checked={choice == communicateText}
                />
                <label
                  htmlFor="communicate_text_yes"
                  className="mx-2 capitalize"
                >
                  {choice}
                </label>
              </div>
            ))}
            {errors.permission_to_text && (
              <ErrorDiv message={errors.permission_to_text} />
            )}
          </div>
        </div>
        <p>
          Hearing and Speech Nova Scotia uses an electronic health record
          system. Any staff members who provides care to you can view your
          personal health information as needed to provide you with hearing and
          speech services. Personal health information is considered
          confidential in compliance with the Personal Health Information Act
          (PHIA). <br />
          <br /> This consent is valid for one year from the date of signature.{" "}
          <br />
          <br />
          If you wish to change any information on this form, please talk to any
          of our staff members.
        </p>
        <div className="my-5">
          <p className="font-black text-xl">
            By signing below, you confirm that you have legal authority to give
            consent.
          </p>
          <Signature signatureImage={signatureImage} setSignatureImage={setSignatureImage} />
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
        <button
          type="submit"
          className="text-white bg-[#28AF2E] border border-[#28AF2E] rounded px-2 md:px-4 py-2 text-sm mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ConsentToReleaseClientInformation;
