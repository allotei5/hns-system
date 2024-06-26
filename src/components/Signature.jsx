import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const Signature = ({ signatureImage, setSignatureImage }) => {
    const canvasRef = useRef(null)
    // const [ signatureImage, setSignatureImage ] = useState("")

    const getSignatureImage = () => {
      const imageDataUrl = canvasRef.current.toDataURL()
      setSignatureImage(imageDataUrl)
      console.log(imageDataUrl)
    }
    
  return (
    <div>
      <p className="block text-[#717171] text-sm capitalize">
        Client or Legal Guardian Signature:
      </p>
      <div className="flex">
        <SignatureCanvas
          penColor="black"
          canvasProps={{ width:"300", height: "100", className: "sigCanvas border border-b bg-[#f6f6f6] rounded", }}
          ref={canvasRef}
          onEnd={getSignatureImage}
          
        />
        <img src={signatureImage} />
      </div>
      
      <button onClick={e => {canvasRef.current.clear(); setSignatureImage("")} } type="button" className="text-white bg-[#923D41] border border-[#923D41] rounded px-2 md:px-4 py-2 text-sm mt-2">Clear Canvas</button>
      {/* <button onClick={getSignatureImage} type="button" className="text-white bg-[#923D41] border border-[#923D41] rounded px-2 md:px-4 py-2 text-sm mt-2">Save Image</button> */}
    </div>
  );
};

export default Signature;
