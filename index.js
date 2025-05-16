const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/download', async (req, res) => {
    const videoURL = req.query.url;
    if (!videoURL) {
        return res.status(400).send('URL parameter is required');
    }

    try {
        const info = await ytdl.getInfo(videoURL);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
        res.header('Content-Disposition', `attachment; filename="video.mp4"`);
        ytdl(videoURL, { format: format }).pipe(res);
    } catch (err) {
        res.status(500).send('Failed to download video');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
