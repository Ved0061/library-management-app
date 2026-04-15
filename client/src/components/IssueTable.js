import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function IssueTable() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/issue");
      setIssues(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔁 RETURN BOOK FUNCTION
  const returnBook = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/issue/return/${id}`
      );

      toast.success(`Book Returned! Fine: ₹${res.data.fine}`);
      fetchIssues();
    } catch (error) {
      toast.error("Error returning book");
    }
  };

  return (
    <div className="mt-5">

      <h4 className="text-white mb-3">📋 Issued Books</h4>

      <div className="premium-card p-3">

        <table className="table table-dark table-hover text-center align-middle">
          <thead>
            <tr>
              <th>📚 Book</th>
              <th>👤 Issued To</th>
              <th>📅 Issue Date</th>
              <th>💰 Fine</th>
              <th>⚙️ Action</th>
            </tr>
          </thead>

          <tbody>
            {issues.length > 0 ? (
              issues.map((issue) => (
                <tr key={issue._id}>

                  {/* 📚 BOOK NAME */}
                  <td>{issue.book?.title || "N/A"}</td>

                  {/* 👤 USER NAME (FIXED ISSUE HERE) */}
                  <td>{issue.user?.name || "Unknown User"}</td>

                  {/* 📅 DATE */}
                  <td>
                    {issue.issueDate
                      ? new Date(issue.issueDate).toLocaleDateString()
                      : "-"}
                  </td>

                  {/* 💰 FINE */}
                  <td>₹{issue.fine || 0}</td>

                  {/* ⚙️ ACTION */}
                  <td>
                    {issue.returnDate ? (
                      <span className="badge bg-success">Returned</span>
                    ) : (
                      <button
                        onClick={() => returnBook(issue._id)}
                        className="btn btn-warning btn-sm"
                      >
                        Return Book 🔁
                      </button>
                    )}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-muted">
                  No issued books found
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default IssueTable;