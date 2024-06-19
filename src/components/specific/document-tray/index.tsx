import styles from "./document-tray.module.css";

const DocumentTray = () => {
  return (
    <div>
      <nav className={styles["document-tray-nav"]}>
        <div>Navbar</div>
        <button>
          <span>horizontal split</span>
        </button>
      </nav>
      <div className={styles["document-tray-div"]}>
        <p>Document Tray</p>
      </div>
    </div>
  );
};

export default DocumentTray;
