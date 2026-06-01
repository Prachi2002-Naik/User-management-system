import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, createUser, updateUser } from "./features/thunk/userThunk";
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

  // edit user
  const [editUser, setEditUser] = useState(null);

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

  let result;

  if (editUser) {
    result = await dispatch(
      updateUser({
        id: editUser._id,
        userData: formData,
      })
    );
  } else {
    result = await dispatch(
      createUser(formData)
    );
  }

  if (
    createUser.fulfilled.match(result) ||
    updateUser.fulfilled.match(result)
  ) {
    setShowModal(false);
    setEditUser(null);

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

  // handle edit
  const handleEdit = (user) => {
  setEditUser(user);

  setFormData({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    city: user.city,
  });

  setShowModal(true);
};

  return (
    <div style={styles.layout}>
      <SideBar />

      <main style={styles.main}>
        <Header setShowModal={setShowModal} />

        <StatsCards users={users} />

        <SearchBar search={search} setSearch={setSearch} />

        <UserTable users={filteredUsers} handleEdit={handleEdit}/>
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
