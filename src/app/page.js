"use client";
import "./global.css";
import { useEffect, useState, useRef } from "react";
import InputDonations from "@/components/inputDonations";
import Popup from "@/components/popup";

export default function Home() {
  const [uniqueCode, setUniqueCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [terms, setTerms] = useState(false);
  const [amount, setAmount] = useState(0);
  const [donation1, setDonation1] = useState(false);
  const [donation1Value, setDonation1Value] = useState(0);
  const [donation2, setDonation2] = useState(false);
  const [donation2Value, setDonation2Value] = useState(0);
  const [donation3, setDonation3] = useState(false);
  const [donation3Value, setDonation3Value] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [formValidated, setFormValidated] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const formRef = useRef();

  const handleAmountUpdate = (e) => {
    if (e.target.value < 0) {
      setAmount(0);
    } else {
      setAmount(e.target.value);
    }
  }

  const handleDonation1 = () => {
    setDonation1(true);
    setDonation2(false);
    setDonation3(false);
  }

  const handleDonation2 = () => {
    setDonation1(false);
    setDonation2(true);
    setDonation3(false);
  }

  const handleDonation3 = () => {
    setDonation1(false);
    setDonation2(false);
    setDonation3(true);
  }

  const handlePopupClose = () => {
    setOpenPopup(false);
    // Reset all states
    setUniqueCode("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setAmount(0);
    setDonation1(false);
    setDonation2(false);
    setDonation3(false);
    setDonation1Value(0);
    setDonation2Value(0);
    setDonation3Value(0);
    setTotalAmount(0);
    setTerms(false);
    setFormValidated(false);
    setFormMessage("");
    // Reset the form
    if (formRef.current) {
      formRef.current.reset(); // Reset form inputs
      formRef.current.classList.remove("was-validated"); // Remove validation classes
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");
    // Validation
    if (!uniqueCode || uniqueCode.length !== 18) {
      setFormMessage("Unique code must be exactly 18 characters.");
      return;
    }
    if (!firstName || firstName.length < 2 || firstName.length > 16) {
      setFormMessage("First name must be between 2 and 16 characters.");
      return;
    }
    if (!lastName || lastName.length < 2 || lastName.length > 16) {
      setFormMessage("Last name must be between 2 and 16 characters.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormMessage("Please enter a valid email address.");
      return;
    }
    if (totalAmount <= 0) {
      setFormMessage("Please enter a valid donation amount.");
      return;
    }

    // Prepare the data to send
    const data = {
      uniqueCode,
      firstName,
      lastName,
      email,
      amount: totalAmount,
    };

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setOpenPopup(true);
      } else {
        setFormMessage(result.error || "Failed to submit donation.");
      }
    } catch (error) {
      setFormMessage("An error occurred while submitting your donation.");
    }
  };

  useEffect(() => {
    if (donation1 || donation2 || donation3) {
      setAmount(0);
    }
  }, [donation1, donation2, donation3]);

  useEffect(() => {
    if (amount > 0) {
      setDonation1(false);
      setDonation2(false);
      setDonation3(false);
    }
  }, [amount]);

  useEffect(() => {
    if (amount > 0) {
      setTotalAmount(amount);
    }
    if (donation1) {
      setTotalAmount(1 * donation1Value);
    }
    if (donation2) {
      setTotalAmount(2 * donation2Value);
    }
    if (donation3) {
      setTotalAmount(3 * donation3Value);
    }
  }, [totalAmount, donation1Value, donation2Value, donation3Value, amount]);

  useEffect(() => {
    if (totalAmount > 0 && terms) {
      setFormValidated(true);
    } else {
      setFormValidated(false);
    }
  }, [totalAmount, terms]);

  useEffect(() => {
    const forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach((form) => {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, []);

  return (
    <div className="container  h-100">
      <div className="row align-items-center h-100">
        <div className="col-sm-11 col-md-8 col-lg-7 col-xl-6 mx-auto main-form">
          <h1 className="text-center pt-5 pb-3">Make a Donation</h1>
          <p className="text-center px-5">Sapien et ligula ullamcorper malesuada proin libero nunc consequat. Sed lectus vestibulum mattis ullamcorper.</p>
          <Popup show={openPopup} handleClose={handlePopupClose} />
          <form className="small-box mx-auto px-5 pb-5 needs-validation" noValidate={true} ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Unique Code" minLength="18" maxLength="18" value={uniqueCode} onChange={(e) => setUniqueCode(e.target.value)} required />
              <div className="invalid-feedback">Please enter a unique code.</div>
            </div>
            <div className="row">
              <div className="col mb-3">
                <input type="text" className="form-control" placeholder="First name" minLength="2" maxLength="16" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <div className="invalid-feedback">Please enter a first name.</div>
              </div>
              <div className="col mb-3 ">
                <input type="text" className="form-control" placeholder="Last name" minLength="2" maxLength="16" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                <div className="invalid-feedback">Please enter a last name.</div>
              </div>
            </div>
            <div className="row">
              <div className="col mb-3">
                <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <div className="invalid-feedback">Please enter a email.</div>
              </div>
              <div className="col mb-3 input-group">
                <span className="input-group-text">$</span>
                <input type="number" className="form-control" placeholder="Amount" value={amount} required onChange={handleAmountUpdate} />
                <div className="valid-feedback">Thank you.</div>
              </div>
            </div>
            <div className="row px-4 mt-1">
              <div className="col mb-2">
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" checked={donation1} id="donation1" onChange={handleDonation1} />
                  <label className="form-check-label" htmlFor="donation1">$1 Donation</label>
                </div>
              </div>
              <div className="col mb-2">
                <InputDonations disabled={donation1} value={donation1Value} onChange={(value) => setDonation1Value(value)} />
              </div>
            </div>
            <div className="row px-4">
              <div className="col mb-2">
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" checked={donation2} id="donation2" onChange={handleDonation2} />
                  <label className="form-check-label" htmlFor="donation2">$2 Donation</label>
                </div>
              </div>
              <div className="col mb-2">
                <InputDonations disabled={donation2} value={donation2Value} onChange={(value) => setDonation2Value(value)} />
              </div>
            </div>
            <div className="row px-4">
              <div className="col mb-2">
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" checked={donation3} id="donation3" onChange={handleDonation3} />
                  <label className="form-check-label" htmlFor="donation3">$3 Donation</label>
                </div>
              </div>
              <div className="col mb-2">
                <InputDonations disabled={donation3} value={donation3Value} onChange={(value) => setDonation3Value(value)} />
              </div>
            </div>
            <div className="input-group mb-4">
              <span className="input-group-text">Total</span>
              <span className="input-group-text">$</span>
              <span className="input-group-text">{totalAmount}.00</span>
            </div>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" required checked={terms} onChange={() => setTerms(!terms)} />
              <label className="form-check-label">I have read and agree with the <a href="#">terms and conditions</a> and <a href="#">privacy policy</a>.</label>
            </div>
            {formMessage && <p className="text-center">{formMessage}</p>}
            <div className="d-grid gap-2">
              <button className="btn btn-yellow" type="submit" disabled={!formValidated}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}