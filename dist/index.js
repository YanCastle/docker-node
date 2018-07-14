"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const castle_mqtt_1 = require("castle-mqtt");
const Docker = require("dockerode");
const os_1 = require("os");
const fs_1 = require("fs");
let sock = process.env.DOCKER_SOCK || '/var/run/docker.sock';
if (!fs_1.existsSync(sock)) {
    console.log('Not Right Sock');
    process.exit(0);
}
class Command {
    start(data) { }
    remove(data) { }
    containers(data) {
        let containers = docker.listContainers();
        return containers;
    }
    images(data) { }
    inspect(data) { }
    create(data) { }
    build(data) { }
    pull(data) { }
    run(data) { }
    attach(data) { }
    top(data) { }
    export(data) { }
    import(data) { }
}
const commander = new Command();
let uuid = os_1.hostname();
const mqtt = new castle_mqtt_1.default(process.env.MQTT || 'tcp://180.97.81.190:1883', 'docker/', uuid);
const docker = new Docker({ socketPath: sock });
mqtt.service('start', commander.start);
mqtt.service('containers', commander.containers);
mqtt.service('remove', commander.remove);
mqtt.service('images', commander.images);
mqtt.service('build', commander.build);
mqtt.service('inspect', commander.inspect);
mqtt.service('create', commander.create);
mqtt.service('run', commander.run);
mqtt.service('attach', commander.attach);
mqtt.service('top', commander.top);
mqtt.service('export', commander.export);
mqtt.service('import', commander.import);
//# sourceMappingURL=index.js.map