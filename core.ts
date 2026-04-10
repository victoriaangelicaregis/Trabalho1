const jsonFilePath = __dirname + '/data.todo.json';
let list: string[] = await loadFromFile();

async function loadFromFile() {
  try {
    const file = Bun.file(jsonFilePath);
    const content = await file.text();
    return JSON.parse(content) as string[];
  } catch (error: any) {
    if (error.code === 'ENOENT')
      return [];
    throw error;
  }
}

async function saveToFile() {
  try {
    await Bun.write(jsonFilePath, JSON.stringify(list));
  } catch (error: any) {
   throw new Error("Erro ao salvar os dados no arquivo: " + error.message);
  }
}

// CRUD - CREATE
async function addItem(item: string) {
  await loadFromFile(); // Garante que os dados estão carregados em memória
  list.push(item);      // Adiciona a nova tarefa ao array `list`
  await saveToFile();   // Salva os dados atualizados no arquivo JSON
}

// CRUD - READ
async function getItems() {
  return list;         // Retorna o array de tarefas
}

// CRUD - UPDATE
async function updateItem(index: number, newItem: string) {
  if (index < 0 || index >= list.length) // Verifica se o índice é válido
    throw new Error("Índice fora dos limites"); 
  list[index] = newItem; // Atualiza a tarefa no array `list`
  await saveToFile();    // Salva os dados atualizados no arquivo JSON
}

// CRUD - DELETE
async function removeItem(index: number) {
  if (index < 0 || index >= list.length) // Verifica se o índice é válido
    throw new Error("Índice fora dos limites");
  list.splice(index, 1); // Remove a tarefa do array `list`
  await saveToFile();    // Salva os dados atualizados no arquivo JSON
}

async function clearItems() {
  list.splice(0, list.length);
  await saveToFile();
}

export default { addItem, getItems, updateItem, removeItem , clearItems};