
// Ejemplo de cómo obtener todos los items
async function obtenerItems() {
  const items = await apiClient.getItems();
  console.log('Items:', items);
}

// Ejemplo de cómo crear un nuevo item
async function crearNuevoItem() {
  const nuevoItem = { id: '1', name: 'Nuevo Item' };
  const itemCreado = await apiClient.createItem(nuevoItem);
  console.log('Item creado:', itemCreado);
}

// Ejemplo de cómo actualizar un item
async function actualizarItem() {
  const itemActualizado = { id: '1', name: 'Item Actualizado' };
  const resultado = await apiClient.updateItem('1', itemActualizado);
  console.log('Item actualizado:', resultado);
}

// Ejemplo de cómo eliminar un item
async function eliminarItem() {
  const resultado = await apiClient.deleteItem('1');
  if (resultado) {
    console.log('Item eliminado');
  }
}
