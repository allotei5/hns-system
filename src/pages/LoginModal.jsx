import {useState} from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  Input,
} from "@material-tailwind/react";

// sign in
// store session in global storage
// if in global storage allow to use the platform

export function Modal1() {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [formData, setFormData] = useState({ email: '', password: ''})
  const [ error, setError ] = useState(false)

  const handleFormChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email == "admin@gmail.com" && formData.password == "1") {
        // store session in global storage and close modal
        localStorage.setItem("auth", formData.email);
        setFormData({ email: '', password: ''})
        setOpen(false)
    }else {
        setError(true)
    }
  }

  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <section className="">
      <Button onClick={handleOpen}>Open Modal</Button>
      <Dialog className="p-4" size="md" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <IconButton
            color="gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className="overflow-y-scroll">
          <div class="flex flex-col gap-4 p-6">
            <h4 class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Sign In
            </h4>
            <p class="block mb-3 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
              Enter your email and password to Sign In.
            </p>
            <h6 class="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
              Your Email
            </h6>
            <div class="relative h-11 w-full min-w-[200px]">
              <input
                class="w-full h-full rounded border border-[#cecece] bg-[#f6f6f6] text-[#717171] text-sm"
                placeholder=" "
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                type="email"
                required
              />
            </div>
            <h6 class="block -mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
              Your Password
            </h6>
            <div class="relative h-11 w-full min-w-[200px]">
              <input
                class="w-full h-full rounded border border-[#cecece] bg-[#f6f6f6] text-[#717171] text-sm "
                placeholder=" "
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                type="password"
                required
              />
            </div>
            
          </div>
          <div class="p-6 pt-0">     
            { error && <small className="text-red-900">Email or Password is wrong</small>}

            <button
              class="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleSubmit}
            >
              Sign In
            </button>
            
          </div>
        </DialogBody>
      </Dialog>
    </section>
  );
}

export default Modal1;
