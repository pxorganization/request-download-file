const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = XXXX;

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'ubuntu-20.04.5-desktop-amd64.iso'); 
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;

    res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Length': fileSize,
        'Content-Disposition': `attachment; filename=${path.basename(filePath)}`,
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
    
    readStream.on('error', (err) => {
        console.error('Error streaming the file:', err);
        res.status(500).send('Error streaming the file');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://domain.gr:${PORT}`);
});

