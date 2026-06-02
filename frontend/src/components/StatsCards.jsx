import { styles } from "../custom.js";

function StatsCards({ users }) {
  const uniqueCities = [
    ...new Set(users.map((u) => u.city)),
  ].length;

  return (
    <div style={styles.stats} className="stats-grid">
      <div style={styles.statCard()}>
        <p style={styles.statLabel}>Total Users</p>
        <h2  className="stat-number" style={styles.statNum("#9B8FFF")}>
          {users.length}
        </h2>
      </div>

      <div style={styles.statCard()}>
        <p style={styles.statLabel}>Active Users</p>
        <h2  className="stat-number" style={styles.statNum("#10B981")}>
          {users.length}
        </h2>
      </div>

      <div style={styles.statCard()}>
        <p style={styles.statLabel}>Cities</p>
        <h2  className="stat-number" style={styles.statNum("#F59E0B")}>
          {uniqueCities}
        </h2>
      </div>
    </div>
  );
}

export default StatsCards;