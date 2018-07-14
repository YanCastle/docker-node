import MQTT, { QosType } from 'castle-mqtt'
import * as Docker from 'dockerode'
import { hostname } from 'os';
import { existsSync } from 'fs';
//监控docker情况，并定时发送相关监控数据到mqtt
//console.log(hostname())
let sock = process.env.DOCKER_SOCK || '/var/run/docker.sock'
if (!existsSync(sock)) {
    console.log('Not Right Sock')
    process.exit(0)
}
class Command {
    // stop()
    start(data) { }
    remove(data) { }
    containers(data) {
        let containers = docker.listContainers()
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
let uuid = hostname();
const mqtt = new MQTT(process.env.MQTT || 'tcp://180.97.81.190:1883', 'docker/', uuid)
const docker = new Docker({ socketPath: sock })
mqtt.service('start', commander.start)
mqtt.service('containers', commander.containers)
mqtt.service('remove', commander.remove)
mqtt.service('images', commander.images)
mqtt.service('build', commander.build)
mqtt.service('inspect', commander.inspect)
mqtt.service('create', commander.create)
mqtt.service('run', commander.run)
mqtt.service('attach', commander.attach)
mqtt.service('top', commander.top)
mqtt.service('export', commander.export)
mqtt.service('import', commander.import)