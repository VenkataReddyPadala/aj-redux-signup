import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/AuthSlice";

function Profile() {
  const { jwtToken, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!jwtToken) navigate("/", { replace: true });
  }, [jwtToken, navigate]);

  function handleLogout() {
    dispatch(logout());
  }
  if (!jwtToken) return null;
  return (
    <div className="profile">
      <h2>Profile</h2>
      <p>Full Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Password: {user?.password}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
