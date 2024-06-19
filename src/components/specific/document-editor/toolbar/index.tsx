import Tools from "./tools/Tools";
import Annotations from "./annotations/annotations";
import Display from "./display/display";
import Navigations from "./navigation/navigation";
import Overview from "./overview/overview";
import Stamps from "./stamps/stamps";
import styles from "./toolbar.module.css";

interface ToolbarProps {
  toggleLayer: (layer: string) => void;
  selectedLayers: string[];
  activeLayer: string | null;
  setDrawAction: (action: string) => void;
}

const Toolbar = ({
  toggleLayer,
  selectedLayers,
  activeLayer,
}: ToolbarProps): JSX.Element => {
  return (
    <div className={styles["toolbar"]}>
      {/* Navbigation */}
      <div>
        <Navigations />
      </div>
      {/* Display */}
      <div>
        <Display
          toggleLayer={toggleLayer}
          selectedLayers={selectedLayers}
          activeLayer={activeLayer}
        />
      </div>
      {/* Tools */}
      <div>
        <Tools />
      </div>
      {/* Stamps */}
      <div>
        <Stamps />
      </div>
      {/* Annotations */}
      <div>
        <Annotations />
      </div>
      {/* Overview */}
      <div>
        <Overview />
      </div>
    </div>
  );
};

export default Toolbar;
