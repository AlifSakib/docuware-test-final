import styles from "./display.module.css";

interface DisplayProps {
  toggleLayer: (layer: string) => void;
  selectedLayers: string[];
  activeLayer: string | null;
}

const Display = ({
  toggleLayer,
  selectedLayers,
  activeLayer,
}: DisplayProps): JSX.Element => {
  return (
    <div className={`${styles["display-options "]}`}>
      <div className={styles["display-header"]}>
        <p>Display</p>
      </div>
      <div className={styles["display-options-container"]}>
        <button
          onClick={() => toggleLayer("layer1")}
          className={`${styles.button} ${
            selectedLayers.includes("layer1") ? styles.active : ""
          }`}
        >
          {activeLayer === "layer1" ? "1🖊️" : "1"}
        </button>

        <button
          onClick={() => toggleLayer("layer2")}
          className={`${styles.button} ${
            selectedLayers.includes("layer2") ? styles.active : ""
          }`}
        >
          {activeLayer === "layer2" ? "2🖊️" : "2"}
        </button>
      </div>
    </div>
  );
};

export default Display;
