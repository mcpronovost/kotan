import { useState, useEffect } from "react";
import { User } from "lucide-react";

function App() {
  const [villagers, setVillagers] = useState([]);

  // Load villagers from database on component mount
  useEffect(() => {
    const loadVillagers = async () => {
      try {
        const villagersData = await window.database.getVillagers();
        setVillagers(villagersData);
      } catch (error) {
        console.error("Failed to load villagers:", error);
      }
    };

    loadVillagers();
  }, []);

  const handleAddVillager = async () => {
    try {
      const randomHealth = Math.floor(Math.random() * 100) + 1;
      const newVillagerId = await window.database.addVillager("John Doedingerson", randomHealth);
      const newVillager = {
        id: newVillagerId,
        name: "John Doedingerson",
        health: randomHealth,
        created_at: new Date().toISOString()
      };
      setVillagers([...villagers, newVillager]);
    } catch (error) {
      console.error("Failed to add villager:", error);
    }
  };

  const handleRemoveVillager = async () => {
    if (villagers.length === 0) return;
    
    try {
      const lastVillager = villagers[villagers.length - 1];
      const success = await window.database.removeVillager(lastVillager.id);
      if (success) {
        setVillagers(villagers.slice(0, -1));
      }
    } catch (error) {
      console.error("Failed to remove villager:", error);
    }
  };

  const handleResetVillagers = async () => {
    try {
      // Remove all villagers from database
      for (const villager of villagers) {
        await window.database.removeVillager(villager.id);
      }
      setVillagers([]);
    } catch (error) {
      console.error("Failed to reset villagers:", error);
    }
  };

  return (
    <div className="mokp-core">
      <div className="mokp-core-topbar">
        <ul className="mokp-core-topbar-villagers">
          {villagers?.length > 0 && villagers.map((villager) => (
            <li key={villager.id} className="mokp-core-topbar-villagers-item">
              <div className="mokp-core-topbar-villagers-item-card">
                <div className="mokp-core-topbar-villagers-item-card-health">
                  <span className="mokp-core-topbar-villagers-item-card-health-bar" style={{
                    backgroundColor: villager.health > 66 ? "#1e4531" : villager.health > 33 ? "#45401e" : "#542d2d",
                    height: `${villager.health}%`
                  }}>{villager.health}%</span>
                </div>
                <div className="mokp-core-topbar-villagers-item-card-avatar">
                  <User color="#474747" size={24} />
                </div>
              </div>
              <div className="mokp-core-topbar-villagers-item-name">
                <span>{villager.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mokp-core-sideleft">
        <div className="mokp-core-sideright-content">version 0.1.0-alpha</div>
        <div className="mokp-core-sideright-content">version 0.1.0-alpha</div>
      </div>
      <div className="mokp-core-main">
        <button onClick={handleAddVillager}>Add Villager</button>
        <button onClick={handleRemoveVillager}>Remove Villager</button>
        <button onClick={handleResetVillagers}>Reset</button>
      </div>
      <div className="mokp-core-sideright">
        <div className="mokp-core-sideright-content">version 0.1.0-alpha</div>
        <div className="mokp-core-sideright-content">version 0.1.0-alpha</div>
      </div>
      <div className="mokp-core-botbar">bottom bar</div>
    </div>
  );
}

export default App;
