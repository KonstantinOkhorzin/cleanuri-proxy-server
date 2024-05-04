import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.json());

app.use('/api', async (req, res) => {
  const encodedUrl = encodeURIComponent(req.body.url);

  try {
    const response = await axios({
      method: req.method,
      url: 'https://cleanuri.com/api/v1/shorten',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: `url=${encodedUrl}`,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
