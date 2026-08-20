import React from "react";

interface TypeUiDataProps {
  children: React.ReactNode;
}

function MokpUiData({ children }: TypeUiDataProps) {
  return <dl className="mokp-data">{children}</dl>;
}

function MokpUiDataKey({ children, icon }: TypeUiDataProps) {
  return (
    <dt className="mokp-data-key">
      {icon && (<span className="mokp-data-key-icon">{icon}</span>)}
      <span className="mokp-data-key-content">{children}</span>
    </dt>
  );
}

function MokpUiDataValue({ children }: TypeUiDataProps) {
  return <dd className="mokp-data-value">{children}</dd>;
}

namespace MokpUiData {
  export const Key = MokpUiDataKey;
  export const Value = MokpUiDataValue;
}

export default MokpUiData;
