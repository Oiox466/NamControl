const express = require('express');
const app = express();
const PORT = 3001;
app.get('/api', (req, res) => {
    res.json({ mensaje: 'Hola desde el backend!' });
});
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));