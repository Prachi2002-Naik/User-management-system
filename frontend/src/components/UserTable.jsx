import { styles } from "../custom.js";

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function UserTable({ users }) {
  return (
    <div style={styles.tableWrap}>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>City</th>
            <th style={styles.thCenter}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={styles.td}>
                <div style={styles.nameWrap}>
                  <span style={styles.avatar}>
                    {getInitials(user.name)}
                  </span>

                  <span style={styles.nameText}>
                    {user.name}
                  </span>
                </div>
              </td>

              <td
                style={{
                  ...styles.td,
                  ...styles.emailText,
                }}
              >
                {user.email}
              </td>

              <td style={styles.td}>
                <span style={styles.cityPill}>
                  {user.city}
                </span>
              </td>

              <td style={styles.td}>
                <div style={styles.actions}>
                  <button style={styles.btnEdit}>
                    Edit
                  </button>

                  <button style={styles.btnDel}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div style={styles.empty}>
          No users found
        </div>
      )}
    </div>
  );
}

export default UserTable;