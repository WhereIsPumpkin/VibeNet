// import emailVerify from '/assets/EmailVerify.png';
import gmailIcon from "../assets/gmail.svg";
import outlookIcon from "../assets/outlook.svg";
import axios from "axios";
import { ErrorXicon } from "../components/icons";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useState } from "react";

const Verification = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const { email } = location.state;
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const res = await axios.post("/api/verify", { token: otp, email });
      res.data.success ? navigate("/") : null;
    } catch (error) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
    }
  };

  return (
    <div className="flex font-rubik relative">
      {showPopup && (
        <div className="fixed left-1/2 transform -translate-x-1/2 top-3 transition-all duration-300">
          <div className="flex gap-1 bg-[#fff2f5] items-center p-4 rounded-lg">
            <ErrorXicon />
            <p>The verification code you've entered is incorrect.</p>
          </div>
        </div>
      )}
      {/* <div className="w-[38.5%] bg-[#f7f9fa] h-screen flex items-center justify-center">
        <img src={emailVerify} className="mr-[-295px]" alt="sign up banner" />
      </div> */}

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
          <button
            className="flex border border-[rgba(35,35,51,.2)] items-center gap-2 p-3 rounded-lg"
            onClick={() =>
              window.open(
                "https://gmail.com",
                "_blank" // <- This is what makes it open in a new window.
              )
            }
          >
            <img src={gmailIcon} alt="gmail logo" />
            Open Gmail
          </button>

          <button
            className="flex border border-[rgba(35,35,51,.2)] items-center gap-2 p-3 rounded-lg"
            onClick={() =>
              window.open(
                "https://outlook.live.com/",
                "_blank" // <- This is what makes it open in a new window.
              )
            }
          >
            <img src={outlookIcon} alt="outlook logo" />
            Open Outlook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verification;
