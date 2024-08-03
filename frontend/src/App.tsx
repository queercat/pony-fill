import { useState } from "react";

const cc = (condition: boolean, className: string) => condition ? className : "";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [decklist, setDecklist] = useState("");
  const [cardSearch, setCardSearch] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <main style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <section className="hero is-link is-small">
          <div className="hero-body">
            <p className="title">Pony Proxy</p>
          </div>
        </section>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex" }}>
            <button disabled={isLoading} style={{ width: "100%", borderRadius: 0 }} className={`button ${cc(activeTab === 0, "is-primary")}`} onClick={() => setActiveTab(0)}>Make Paper Proxies</button>
            <button disabled={isLoading} style={{ width: "100%", borderRadius: 0 }} className={`button ${cc(activeTab === 1, "is-primary")}`} onClick={() => setActiveTab(1)}>Make MPC Proxies</button>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <input
              className="input is-normal"
              type="text"
              placeholder="Normal input"
            />
            <input
              style={{minWidth: "none", width: "auto" }}
              className="input"
              type="number"
              placeholder="1"
            />
            <button disabled className="button is-success">Add</button>
          </div>
          <div className="select" style={{ minWidth: "100%" }}>
            <select style={{ minWidth: "100%" }}>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>

        <textarea style={{ resize: "none" }} disabled={isLoading} rows={16} className={`textarea`} placeholder="e.g. Hello world"></textarea>


        <button style={{ marginTop: "8px" }} className={`button ${cc(isLoading, "is-loading")}`} onClick={() => setIsLoading(!isLoading)}>Submit</button>
      </main>

      <section className="has-background-black-ter" style={{ padding: "8px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p>Made with ❤️ with Bulma</p>
      </section>
    </div>
  );
}

export default App;
