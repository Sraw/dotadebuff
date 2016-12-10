#!/usr/bin/bash
 
WEB_PATH='/root/dota_how_to_play'
 
echo "Start deployment"
cd $WEB_PATH
echo "pulling source code..."

git pull   #spawn后面接要执行的命令

pm2 restart dota_howToplay

echo "Finished."