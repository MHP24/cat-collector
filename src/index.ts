import axios from 'axios';
import fs from 'fs';

const catUrl = 'https://api.thecatapi.com/v1/images/search';

setInterval(async () => {
  try {
    const { data } = await axios.get(catUrl);
    const { id, url } = data[0];
  
    const { data: image } = await axios.get(url, {
      maxBodyLength: Infinity,
      responseType: 'arraybuffer',
    });
    fs.writeFileSync(`./cats/${id}.${url.split('.').at(-1)}`, image, 'binary');
    console.log(`${new Date().toUTCString()}: Saved ${id}`);
  } catch (error) {
    console.error(`${new Date().toUTCString()}: Failed saving cat :(`);
  }
}, 200);