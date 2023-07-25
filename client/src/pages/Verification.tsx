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
    <div className="relative flex font-rubik">
      {showPopup && (
        <div className="fixed left-1/2 top-3 -translate-x-1/2 transform transition-all duration-300">
          <div className="flex items-center gap-1 rounded-lg bg-[#fff2f5] p-4">
            <ErrorXicon />
            <p>The verification code you've entered is incorrect.</p>
          </div>
        </div>
      )}
      {/* <div className="w-[38.5%] bg-[#f7f9fa] h-screen flex items-center justify-center">
        <img src={emailVerify} className="mr-[-295px]" alt="sign up banner" />
      </div> */}

      <div className="flex h-screen w-full flex-col items-center justify-center">
        <h1 className="mb-8 text-center text-3xl font-medium">
          Check Your Email for A Code
        </h1>
        <p className="mb-3 text-center text-sm">
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
              className="mr-[10px] h-[60px] !w-11 rounded-xl border border-[#6e7680] text-center text-xl focus:outline-none focus:outline-blue-600  "
            />
          )}
        />
        <button
          onClick={handleVerify}
          type="submit"
          className={`mt-6 h-[40px] w-[346px] rounded-[10px] text-white ${
            otp.length === 6 ? "bg-[#0e72ed]" : "bg-gray-300 text-[#6e7680]"
          }`}
          disabled={otp.length !== 6}
        >
          Verify
        </button>

        <div className="mt-12 flex gap-6">
          <button
            className="flex items-center gap-2 rounded-lg border border-[rgba(35,35,51,.2)] p-3"
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
            className="flex items-center gap-2 rounded-lg border border-[rgba(35,35,51,.2)] p-3"
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
