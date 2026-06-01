import { styles } from "../custom.js";

function AddUserModal({
  showModal,
  setShowModal,
  formData,
  handleChange,
  handleSubmit,
}) {
  if (!showModal) {
    return null;
  }

  return (
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
          width: "450px",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid #2A2A38",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            fontSize: "20px",
          }}
        >
          Add New User
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "10px",
              border: "1px solid #2A2A38",
              background: "#0F0F13",
              color: "#fff",
            }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "10px",
              border: "1px solid #2A2A38",
              background: "#0F0F13",
              color: "#fff",
            }}
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "10px",
              border: "1px solid #2A2A38",
              background: "#0F0F13",
              color: "#fff",
            }}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "1px solid #2A2A38",
              background: "#0F0F13",
              color: "#fff",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              style={styles.btnDel}
            >
              Cancel
            </button>

            <button type="submit" style={styles.btnAdd}>
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserModal;
