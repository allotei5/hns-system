// window.global ||= window;
import { useContext, useEffect, useRef } from "react";
import { usePDF } from 'react-to-pdf';
import logo from "../assets/logo@2x.png";
import generatePDF from "react-to-pdf";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import AWS from 'aws-sdk';
import { FormDataContext } from "../contexts/FormDataContext";
import { retrieveFromLocalStorage } from "../utilities";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const PrintPage = () => {
    // const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

    const { savedFormData, setSavedFormData } = useContext(FormDataContext)
    const navigate = useNavigate()

    useEffect(() => {
      if (savedFormData == null) {
        let savedData = retrieveFromLocalStorage()
        if (savedData !== null) {
          setSavedFormData(savedData)
        }
      }
    }, [])

    const targetRef = useRef();
    const handleGenerate = async () => {
        try {
          // store the data
          toast.loading("Saving form...")
          const res = await api.post("/consent/", savedFormData);
          // generate pdf
          toast.loading("Generating PDF...")
          const pdf = await generatePDF()
          const uploadedUrl = await uploadPDFToS3(pdf)
          const res2 = await api.post("/stored-consents/", { ...savedFormData, pdf_url:uploadedUrl });

          toast.loading("Uploading PDF...")
          toast.success("Your form has been saved")
          setSavedFormData({
            caregivers: [],
            caregiver_types: []
          })
          localStorage.removeItem('myJsonObject')
          setTimeout(() => {
            navigate('/')
          }, 2000);
          
        } catch (error) {
          console.log(error)
          toast.error("There was an error")
        }
        
        // console.log("Uploaded PDF URL:", uploadedUrl);
    }
    const generatePDF = async () => {
        const element = document.getElementById('element-to-capture');
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');
      
        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        // console.log(pdf)
        pdf.save('downloaded-file.pdf');
        console.log('pdf got')
        return pdf.output('blob');
      };
      const uploadPDFToS3 = async (pdfBlob) => {
        const s3 = new AWS.S3({
            accessKeyId: 'removed',
            secretAccessKey: 'removed',
            region: 'us-west-2',
        });
      
        const params = {
          Bucket: 'hsns-bucket',
          Key: `your-pdf-name-${Date.now()}.pdf`,
          Body: pdfBlob,
          ContentType: 'application/pdf',
        };
      
        return new Promise((resolve, reject) => {
          s3.upload(params, function(err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data.Location);
            }
          });
        });
      };
  return (
    <div>
      <ToastContainer />
      <div ref={targetRef} className="p-24" id="element-to-capture">
        <div className="flex ">
          <div className="md:w-1/5">
            <img src={logo} width="50%" />
          </div>
          <div className="font-semibold text-2xl md:text-3xl mt-2 mb-20">
            CONSENT TO RELEASE CLIENT INFORMATION
          </div>
        </div>
        <div className="grid grid-cols-5 mb-5">
          <p className="">Client name:</p>
          <div className="border-b border-black col-span-4 py-1">{savedFormData?.client_name}</div>
        </div>
        <div className="grid grid-cols-3 mb-5">
          <p className="">Name on health card (if different):</p>
          <div className="border-b border-black col-span-2 py-1">{savedFormData?.name_on_health_card}</div>
        </div>
        <div className="grid grid-cols-2 mb-5">
          <div className="grid grid-cols-3">
            <p className=" ">Pronouns (optional):</p>
            <div className="border-b border-black col-span-2 py-1">{savedFormData?.pronouns}</div>
          </div>
          <div className="grid grid-cols-3">
            <p className="">Health Card #:</p>
            <div className="border-b border-black col-span-2 py-1">{savedFormData?.health_card_number}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 mb-10">
          <p className="">Date of birth (d/m/y):</p>
          <div className="border-b border-black col-span-2 py-1">{savedFormData?.date_of_birth}</div>
        </div>
        <div>
          <p className="font-semibold mb-3">
            If you are giving consent but you are not the client, please
            indicate:
          </p>
        </div>
        {
          savedFormData?.caregivers?.length > 0 && savedFormData?.caregivers?.length?.map((cg) => (<div className="grid grid-cols-2 mb-5 gap-2">
          <div className="grid grid-cols-3">
            <p className=" ">Caregiver name:</p>
            <div className="border-b border-black col-span-2 py-1">{cg.care_giver_name}</div>
          </div>
          <div className="grid grid-cols-3">
            <p className="">Relationship to client:</p>
            <div className="border-b border-black col-span-2 py-1">{cg.relationship_to_client}</div>
          </div>
        </div>))
        }
        <div className="grid grid-cols-2 mb-5 gap-2">
          <div className="grid grid-cols-3">
            <p className=" ">Caregiver name:</p>
            <div className="border-b border-black col-span-2 py-1"></div>
          </div>
          <div className="grid grid-cols-3">
            <p className="">Relationship to client:</p>
            <div className="border-b border-black col-span-2 py-1"></div>
          </div>
        </div>
        <p>
          I give consent to Hearing and Speech Nova Scotia (HSNS) to share
          information related to the HSNS services provided for the client named
          above. Information can be shared with the following individuals /
          agencies / professionals:
        </p>

        <div className="grid grid-cols-2 mb-5 gap-2">
          {
            savedFormData?.caregiver_types.map(ct => (<p className="border-b border-black my-5 py-1">{ct.institution_name}</p>))
          }
          
        </div>
        <div className="grid grid-cols-5">
          <div className="col-span-4 border border-black p-5">
            <p>
              I give permission for HSNS to communicate about my assessment
              and/or treatment with the individuals/agencies/professionals
              listed above. Communication may be face-to-face, by{" "}
              <span className="font-bold">phone</span>, by{" "}
              <span className="font-bold">mail</span>, by{" "}
              <span className="font-bold">fax</span>, or by{" "}
              <span className="font-bold">secure email</span>.
            </p>
          </div>
          <div className="border border-black p-5">
            <div className="">
              {["yes", "no"].map((choice) => (
                <div key={choice}>
                  <input type="radio" name="communicate_radio" value={choice} disabled checked={choice == savedFormData?.contact_me} />
                  <label
                    htmlFor="communicate_radio_yes"
                    className="mx-2 capitalize"
                  >
                    {choice}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-4 border border-black p-5">
            <p>
              I understand that <span className="font-bold">email</span>{" "}
              communications <span className="font-bold">may not</span> be
              secure. I give permission for HSNS staff to send assessment and/or
              treatment information to me by{" "}
              <span className="font-bold">email</span>.
            </p>
            <div className="grid grid-cols-5 mb-5">
              <p className="">Email:</p>
              <div className="border-b border-black col-span-4 py-1">{savedFormData?.email_to_communicate_with}</div>
            </div>
          </div>
          <div className="border border-black p-5">
            <div className="">
              {["yes", "no"].map((choice, index) => (
                <div key={index}>
                  <input type="radio" name="communicate_email" value={choice} disabled checked={choice == savedFormData?.permission_to_email} />
                  <label
                    htmlFor="communicate_radio_yes"
                    className="mx-2 capitalize"
                  >
                    {choice}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-4 border border-black p-5">
            <p>
              I give permission for HSNS staff to contact me via{" "}
              <span className="font-bold">text</span> using a secure HSNS-issued
              cell phone. HSNS staff will not send personal health information
              by <span className="font-bold">text</span>. I understand that my
              personal health information may not be kept secure if I send it by{" "}
              <span className="font-bold">text</span>.
            </p>
          </div>
          <div className="border border-black p-5">
            <div className="">
              {["yes", "no"].map((choice) => (
                <div key={choice}>
                  <input type="radio" name="communicate_text" value={choice} disabled checked={choice == savedFormData?.permission_to_text} />
                  <label
                    htmlFor="communicate_radio_yes"
                    className="mx-2 capitalize"
                  >
                    {choice}
                  </label>
                </div>
              ))}
            </div>
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
          <p className="font-semibold mb-5">
            By signing below, you confirm that you have legal authority to give
            consent.
          </p>
          <div className="grid grid-cols-5 mb-5 gap-2 items-end">
            <div className="grid grid-cols-3 col-span-4 items-end">
              <p className=" ">Client or Legal Guardian Signature:</p>
              <div className="border-b border-black col-span-2">
                <img src={savedFormData?.image_base64}/>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <p className="">Date:</p>
              <div className="border-b border-black col-span-2 py-1">{savedFormData?.date_of_signature}</div>
            </div>
          </div>
          {/* <Signature signatureImage={signatureImage} setSignatureImage={setSignatureImage} /> */}
        </div>
      </div>
      <div className="px-24">
        <button
            onClick={handleGenerate}
          type="submit"
          className="text-white border border-[#851B56] bg-[#851B56] rounded px-2 md:px-4 py-2 text-sm mt-2"
        >
          Submit
        </button>
        <button
            onClick={() => navigate('/consent-to-release-client-information')}
          className="text-white  border border-[#851B56] bg-[#fff] text-[#851B56] rounded px-2 md:px-4 py-2 text-sm mt-2 ml-5"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default PrintPage;
