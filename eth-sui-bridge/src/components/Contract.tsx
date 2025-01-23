import React, { useState, useEffect } from "react";
import { getEthereumContract } from "../utils/web3";

const Contract: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");

  const fetchMessage = async () => {
    const contract = getEthereumContract();
    if (contract) {
      try {
        const msg = await contract.message();
        setMessage(msg);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    } else {
      alert("MetaMask not detected or contract not deployed!");
    }
  };

  const updateMessage = async () => {
    const contract = getEthereumContract();
    if (contract) {
      try {
        const tx = await contract.setMessage(newMessage);
        await tx.wait();
        fetchMessage(); // Reîmprospătează mesajul
      } catch (error) {
        console.error("Error updating message:", error);
      }
    } else {
      alert("MetaMask not detected or contract not deployed!");
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Smart Contract Interaction</h2>
      <p>Current Message: {message}</p>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Enter new message"
      />
      <button onClick={updateMessage}>Update Message</button>
    </div>
  );
};

export default Contract;
