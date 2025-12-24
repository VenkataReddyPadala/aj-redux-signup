import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../store/AuthSlice";

function Signup() {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fullNameEl = useRef();
  const emailEl = useRef();
  const passwordEl = useRef();
  const confPassEl = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => state.auth.jwtToken);

  useEffect(() => {
    if (jwtToken) navigate("/profile", { replace: true });
  }, [jwtToken, navigate]);

  const validateEmail = (input) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;

    let isError = false;
    let newErrors = {};

    if (fullNameEl.current.value.trim() === "") {
      newErrors.name = true;
      isError = true;
    }

    if (!validateEmail(emailEl.current.value)) {
      newErrors.email = true;
      isError = true;
    }

    if (passwordEl.current.value.length < 8) {
      newErrors.pass = true;
      isError = true;
    }

    if (
      confPassEl.current.value !== passwordEl.current.value ||
      confPassEl.current.value === ""
    ) {
      newErrors.confPass = true;
      isError = true;
    }

    setErrors(newErrors);

    if (isError) {
      setSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setSuccess(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const userInfo = {
      name: fullNameEl.current.value,
      email: emailEl.current.value,
      password: passwordEl.current.value,
    };
    dispatch(signup(userInfo));
  }
  if (jwtToken) return null;

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input type="text" placeholder="Full Name" ref={fullNameEl} />
      {errors.name && <p className="feedback error">Full Name is required</p>}

      <input
        type="email"
        placeholder="Email"
        ref={emailEl}
        autoComplete="true"
      />
      {errors.email && (
        <p className="feedback error">Please enter a valid Email</p>
      )}

      <input
        type="password"
        placeholder="Password"
        ref={passwordEl}
        autoComplete="new-password"
      />
      {errors.pass && (
        <p className="feedback error">Password must be exactly 8 characters</p>
      )}

      <input
        type="password"
        placeholder="Confirm Password"
        ref={confPassEl}
        autoComplete="new-password"
      />
      {errors.confPass && (
        <p className="feedback error">Passwords must match</p>
      )}

      {success && <p className="feedback success">Successfully Signed Up!</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating Account..." : "Signup"}
      </button>
    </form>
  );
}

export default Signup;
