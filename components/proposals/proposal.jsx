import { premiumSupport } from "@/app/store/actions/dataActions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Proposal = ({ setSelectedComponent }) => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.subject) formErrors.subject = "Subject is required";
    if (!formData.description) formErrors.description = "Description is required";
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      console.log("Form Data:", formData);

      setLoading(true);
      dispatch(premiumSupport(formData)).then((data) => {
        if (data?.data?.status == 201) {
          setSelectedComponent("Home");
          toast.success("Ticket Raised Succesfully")
        }
        setLoading(false);
      });
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <>
      <div className="bg-[rgb(0,43,66)] h-screen flex flex-col border items-center p-6">
        <div className=" flex flex-row   p-6 w-full">
          <div className="flex flex-col p-6 ">
            <div >
              <h2 className="text-3xl font-bold mb-2  text-white">
                Let’s talk on something
              </h2>
              <h2 className="text-3xl font-bold mb-6  text-[#002b42]">
                <span className="text-[#3fc4d4]">great</span> together
              </h2>
            </div>
            <div className="flex flex-col  mb-4">
              <div className="text-gray-700 text-white">
                <p className=" mb-4">📧 ngo@gmail.com</p>
                <p className=" mb-4">📞 +34 123 456 789</p>
                <p className=" mb-4">📍 123 Street 487 House</p>
              </div>
              <div className="flex gap-4 text-white">
                <a href="#"><img src="/assets/img/linkedin.png" alt="LinkedIn" className="w-10 h-10" /></a>

                <a href="#"><img src="/assets/img/instagram.png" alt="Instagram" className="w-10 h-10" /></a>
              </div>
            </div>

          </div>
          <div className="p-6 bg-white rounded-lg shadow-md w-full">
            <h2 className="text-3xl font-bold mb-6 text-center text-[#002b42]">
              Raise a tikcet
            </h2>
            <form onSubmit={handleSubmit} className="mt-6">



              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Your name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Your email</label>
                <input
                  type="email"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.subject ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Your message</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.description ? "border-red-500" : "border-gray-300"}`}
                  rows="4"
                ></textarea>
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-[#002b42] text-white p-3 rounded hover:bg-[#00334d] font-semibold"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send message"}
              </button>
            </form>
          </div>
        </div>

      </div>
      <ToastContainer />
    </>
  );
};

export default Proposal;
