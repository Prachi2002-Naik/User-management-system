import { styles } from "../custom.js";

function Header({ setShowModal }) {
  return (
    <div style={styles.header}>
      <div>
        <h1 style={styles.pageTitle}>
          User Dashboard
        </h1>

        <p style={styles.pageSub}>
          Manage your users efficiently
        </p>
      </div>

      <button
        style={styles.btnAdd}
        onClick={() => setShowModal(true)}
      >
        + Add User
      </button>
    </div>
  );
}

export default Header;