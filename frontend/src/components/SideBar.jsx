import { styles } from "../custom.js";

function SideBar() {
  return (
    <aside style={styles.aside}>
      <div style={styles.logo}>
        User<span style={styles.logoSpan}>Admin</span>
      </div>

      <div style={styles.navActive}>
        Dashboard
      </div>

      <div style={styles.navItem}>
        Users
      </div>

      <div style={styles.navItem}>
        Settings
      </div>
    </aside>
  );
}

export default SideBar;