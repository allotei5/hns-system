import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const Signature = () => {
    const canvasRef = useRef(null)
    
  return (
    <div>
      <p className="block text-[#717171] text-sm capitalize">
        Client or Legal Guardian Signature:
      </p>
      <SignatureCanvas
        penColor="green"
        canvasProps={{ width:"300", height: "100", className: "sigCanvas border border-b bg-[#f6f6f6] rounded", }}
        ref={canvasRef}
      />
      <button onClick={e => canvasRef.current.clear() } type="button" className="text-white bg-[#923D41] border border-[#923D41] rounded px-2 md:px-4 py-2 text-sm mt-2">Clear Canvas</button>
    </div>
  );
};

export default Signature;
