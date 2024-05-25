import path from 'path';
import fastifyMulter from 'fastify-multer';

export const storage = fastifyMulter.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'temp'),
  filename: (req, file, callback) => {
    const time = new Date().getTime();

    callback(null, `${time}_${file.originalname}`);
  },
});

export const upload = fastifyMulter({ storage });
