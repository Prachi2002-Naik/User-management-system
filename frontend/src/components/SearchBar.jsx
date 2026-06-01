import { styles } from "../custom.js";

function SearchBar({ search, setSearch }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        placeholder="🔍 Search users..."
        style={styles.searchBar}
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />
    </div>
  );
}

export default SearchBar;