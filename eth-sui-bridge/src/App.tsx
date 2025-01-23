import React from "react";
import Wallet from "./components/Wallet";
import Contract from "./components/Contract";

const App: React.FC = () => {
  return (
    <div>
      <Wallet />
      <Contract />
    </div>
  );
};

export default App;
