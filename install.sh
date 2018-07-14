#!/bin/bash
mkdir /docker
cd /docker
yum -y install docker wget git
wget http://cdn.npm.taobao.org/dist/node/v10.5.0/node-v10.5.0-linux-x64.tar.xz
tar xJf node-v10.5.0-linux-x64.tar.xz
rm -rf node-v10.5.0-linux-x64.tar.xz
mv node-v10.5.0-linux-x64 /usr/local/node
echo "export NODE_HOME=/usr/local/node" > /etc/profile.d/node.sh
echo "export PATH=\$NODE_HOME/bin:\$PATH" >> /etc/profile.d/node.sh
echo "export NODE_PATH=\$NODE_HOME/lib/node_modules:\$PATH" >> /etc/profile.d/node.sh
source /etc/profile
service docker start
npm i -g pm2
git clone 