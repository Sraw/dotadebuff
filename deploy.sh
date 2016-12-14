#!/usr/bin/bash
 
WEB_PATH='/root/dota_how_to_play'
 
echo "Start deployment"
cd $WEB_PATH
echo "pulling source code..."

git pull

pm2 restart dota_howToplay

echo "Finished."