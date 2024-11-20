import { useState } from "react";
import HorizontalSplit from "../../common/split-screen/horizontal-split";
import PrimaryDocumentTray from "./primary-document-tray";

const DocumentTray = () => {
  const [splitDocumentTray, setSplitDocumentTray] = useState(true);
  return (
    <div>
      {splitDocumentTray ? <HorizontalSplit /> : <PrimaryDocumentTray />}
    </div>
  );
};

export default DocumentTray;
