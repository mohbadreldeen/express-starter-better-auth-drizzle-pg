import 'dotenv/config';
import app from './app.js'; // Note the .js extension (required for NodeNext)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});