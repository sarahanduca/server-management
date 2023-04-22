import cluster from "cluster";
import server from "./utils/server.js";

if (cluster.isPrimary) {
  console.log(`Main ${process.pid} is running`);
  cluster.fork();

  cluster.on("exit", (worker) =>
    console.log(`worker ${worker.process.pid} died`)
  );

  cluster.on("message", (worker, message) => {
    console.log("Worker killed, new worker created", worker.process.pid);
    message.type === "kill" ? worker.kill() : null;
    cluster.fork();
  });
} else {
  server();
  setTimeout(() => process.send("kill"), 10000);
}
