import { styles } from "../custom.js";

function Header({ setShowModal }) {
  return (
    <div  className="header-wrap" style={styles.header}>
      <div>
        <h1  className="page-title" style={styles.pageTitle}>
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