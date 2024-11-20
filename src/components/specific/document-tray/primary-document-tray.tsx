import DocumentTrayNav from "./document-tray-navbar";
import styles from "./document-tray.module.css";

const PrimaryDocumentTray = () => {
  return (
    <div>
      <DocumentTrayNav />
      <div className={styles["document-tray-div"]}>
        <p>Document Tray</p>
      </div>
    </div>
  );
};

export default PrimaryDocumentTray;
