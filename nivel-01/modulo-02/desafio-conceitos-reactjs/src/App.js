import React from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = React.useState([]);
  React.useEffect(() => {
    api.get("/repositories").then((res) => setRepositories(res.data));
  }, []);
  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      url: "https://github.com/Rocketseat/unform",
      title: "Unform",
      techs: ["React", "ReactNative", "TypeScript", "ContextApi"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newData = repositories.filter((repository) => repository.id !== id);
    setRepositories(newData);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
