import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, createUser, updateUser, deleteUser } from "./features/thunk/userThunk";
import { styles } from "./custom.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { users, loading, buttonloading, deleteloading, error } = useSelector((state) => state.users);

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

  if (!formData.name.trim()) {
    toast.error("Name is required");
    return;
  }
  
  if (!formData.email.trim()) {
    toast.error("Email is required");
    return;
  }
  
  if (!/\S+@\S+\.\S+/.test(formData.email)) {
    toast.error("Enter valid email");
    return;
  }
  
  if (!formData.mobile.trim()) {
    toast.error("Mobile number is required");
    return;
  }
  
  if (!/^\d{10}$/.test(formData.mobile)) {
    toast.error("Mobile must be exactly 10 digits");
    return;
  }
  
  if (!formData.city.trim()) {
    toast.error("City is required");
    return;
  }

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

  if (createUser.fulfilled.match(result) || updateUser.fulfilled.match(result)
  ) {
    toast.success(editUser ? "User updated successfully" :"User created successfully")
  
    setShowModal(false);
    setEditUser(null);

    setFormData({
      name: "",
      email: "",
      mobile: "",
      city: "",
    });
  }
  else{
    toast.error("Something went wrong");
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
    city: user.city || "",
  });

  setShowModal(true);
};


const handleDelete = (id) => {
  setSelectedUserId(id);
  setShowDeleteModal(true);
};

const confirmDelete = async() =>{
   const result = await dispatch(deleteUser(selectedUserId));
   if(deleteUser.fulfilled.match(result)){
    toast.success("User deleted successfully");
   }
   else{
    toast.error("Something went wrong");
   }

   setShowDeleteModal(false);
   setSelectedUserId(null);
}

  return (
    <>
    <div  className="dashboard-layout"  style={styles.layout}>
      <SideBar />

      <main className="main-content"  style={styles.main}>
        <Header setShowModal={setShowModal} />

        <StatsCards users={users} />

        <SearchBar search={search} setSearch={setSearch} />

        <UserTable users={filteredUsers} handleEdit={handleEdit} handleDelete={handleDelete}/>
      </main>

      <AddUserModal
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonloading={buttonloading}
        deleteloading ={deleteloading}
      />

{
  showDeleteModal && (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#17171E",
          padding: "24px",
          width: "400px",
          borderRadius: "16px",
          border: "1px solid #2A2A38",
        }}
      >
        <h2>
          Delete User
        </h2>

        <p
          style={{
            color: "#888AA8",
            marginTop: "10px",
          }}
        >
          Are you sure you want to delete
          this user?
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            style={styles.btnEdit}
            onClick={() => {
              setShowDeleteModal(false);
              setSelectedUserId(null);
            }}
          >
            Cancel
          </button>

          <button
          style={styles.btnDel}
          onClick={confirmDelete}
          disabled={deleteloading}
          >
         {deleteloading
         ? "Deleting..."
         : "Delete"}
         </button>
        </div>
      </div>
    </div>
  )
}
    </div>

    <ToastContainer position="top-right" autoClose={3000}/>
    </>
  );
}

export default App;
