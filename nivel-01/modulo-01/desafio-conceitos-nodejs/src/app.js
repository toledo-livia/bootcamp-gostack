const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.send(repositories);
});

app.post("/repositories", (request, response) => {
  const id = uuid();
  const likes = 0;
  let { title, url, techs } = request.body;

  const repository = {
    id,
    url,
    title,
    techs,
    likes,
  };

  repositories.push(repository);

  return response.status(201).send(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  const repository = repositories.find((repository) => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  const newRepository = {
    id,
    title,
    url,
    techs,
    likes: repository.likes,
  };

  repositories[repositoryIndex] = newRepository;

  return response.json(newRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  const repository = repositories.find((repository) => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  const newRepository = {
    id: repository.id,
    title: repository.title,
    url: repository.url,
    techs: repository.techs,
    likes: repository.likes + 1,
  };

  repositories[repositoryIndex] = newRepository;

  return response.json(newRepository);
});

module.exports = app;
