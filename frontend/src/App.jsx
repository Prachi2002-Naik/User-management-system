import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, createUser } from "./features/thunk/userThunk";
import { styles } from "./custom.js";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import AddUserModal from "./components/AddUserModal";

function App() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
  });

  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(createUser(formData));

    if (createUser.fulfilled.match(result)) {
      setShowModal(false);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        city: "",
      });
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingWrap}>
        <h1 style={styles.loadingText}>Loading Users...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.loadingWrap}>
        <h1 style={styles.errorText}>{error}</h1>
      </div>
    );
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.layout}>
      <SideBar />

      <main style={styles.main}>
        <Header setShowModal={setShowModal} />

        <StatsCards users={users} />

        <SearchBar search={search} setSearch={setSearch} />

        <UserTable users={filteredUsers} />
      </main>

      <AddUserModal
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
