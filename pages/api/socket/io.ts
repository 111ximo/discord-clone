import { Server as NetServer } from 'http';
import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';
import { NextApiResponseServerIo } from '@/type';

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socket/io",
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["content-type"]
      },
      // 添加连接处理
      connectTimeout: 30000,
      pingTimeout: 15000,
      pingInterval: 20000,
      upgradeTimeout: 10000,
      // 添加传输配置
      transports: ['websocket', 'polling'],
    });

    // 添加连接监听
    io.on('connection', (socket) => {
      console.log('Client connected');
      
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
    
    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;