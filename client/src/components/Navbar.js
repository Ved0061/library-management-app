import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4 d-flex justify-content-between">
      <h4 className="text-white m-0">📚 Library System</h4>

      <div className="d-flex align-items-center gap-3">
        <span className="text-white">
          👤 {user?.name}
        </span>

        {user?.isPremium && (
          <span className="badge bg-warning text-dark">🌟 Premium</span>
        )}

        <button onClick={handleLogout} className="btn btn-danger btn-sm">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;