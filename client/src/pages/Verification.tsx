import emailVerify from "../assets/EmailVerify.png";
import gmailIcon from "../assets/gmail.svg";
import outlookIcon from "../assets/outlook.svg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useState } from "react";

const Verification = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const { email } = location.state;
  let navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const res = await axios.post("/api/verify", { token: otp, email });
      res.data.success ? navigate("/") : null;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex font-rubik">
      <div className="w-[38.5%] bg-[#f7f9fa] h-screen flex items-center justify-center">
        <img src={emailVerify} className="mr-[-295px]" alt="sign up banner" />
      </div>

      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-medium mb-8">
          Check Your Email for A Code
        </h1>
        <p className="text-sm mb-3">
          Please enter the verification code sent to your email address{" "}
          <b>{email}</b>
        </p>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => (
            <input
              {...props}
              className="h-[60px] border border-[#6e7680] text-xl text-center mr-[10px] rounded-xl !w-11 focus:outline-none focus:outline-blue-600  "
            />
          )}
        />
        <button
          onClick={handleVerify}
          type="submit"
          className={`w-[346px] h-[40px] text-white rounded-[10px] mt-6 ${
            otp.length === 6 ? "bg-[#0e72ed]" : "bg-gray-300 text-[#6e7680]"
          }`}
          disabled={otp.length !== 6}
        >
          Verify
        </button>

        <div className="flex gap-6 mt-12">
          <button className="flex border border-[rgba(35,35,51,.2)] items-center gap-2 p-3 rounded-lg">
            <img src={gmailIcon} alt="gmail logo" />
            Open Gmail
          </button>

          <button className="flex border border-[rgba(35,35,51,.2)] items-center gap-2 p-3 rounded-lg">
            <img src={outlookIcon} alt="outlook logo" />
            Open Outlook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verification;
