import Navbar from "../components/Navbar";
import BookList from "../components/BookList";
import IssueTable from "../components/IssueTable";

function Dashboard() {
  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <BookList />
        <IssueTable />
      </div>
    </div>
  );
}

export default Dashboard;