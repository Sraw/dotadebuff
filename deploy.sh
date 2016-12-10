#!/usr/bin/expect -f
 
WEB_PATH='/root/dota_how_to_play'
 
echo "Start deployment"
cd $WEB_PATH
echo "pulling source code..."

spawn git pull   #spawn后面接要执行的命令
expect "*Username*" #expect后面匹配等待输入是的字符
send "Sraw\r" #send后面接要输入的内容
interact
expect "*Password*"
send "7758258a\r"
interact

echo "Finished."