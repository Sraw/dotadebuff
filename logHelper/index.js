import log4js from 'log4js'  
import fs from "fs"
import path from "path"  
  
// 加载配置文件  
let objConfig = JSON.parse(fs.readFileSync("log4js.json", "utf8"));  
  
// 检查配置文件所需的目录是否存在，不存在时创建  
if(objConfig.appenders){  
	let defaultAtt = objConfig["customDefaultAtt"];  
    let dir = path.normalize(__dirname + '/../logs/')
    checkAndCreateDir(dir);  
    for(var i= 0, j=objConfig.appenders.length; i<j; i++){  
        var item = objConfig.appenders[i];  
        if(item["type"] == "console")  
            continue; 

        if(defaultAtt != null){  
            for(var att in defaultAtt){  
                if(item[att] == null)  
                    item[att] = defaultAtt[att];  
            }  
        }  

        item['filename'] = dir 
        var fileName = dir + item["pattern"];  
        var fileDir = path.dirname(fileName);  
        checkAndCreateDir(fileDir);  
    }  
}  
  
// 目录创建完毕，才加载配置，不然会出异常  
log4js.configure(objConfig);  

let logDebug = log4js.getLogger('logDebug');  
let logInfo = log4js.getLogger('logInfo');  
let logWarn = log4js.getLogger('logWarn');  
let logErr = log4js.getLogger('logErr');  
  
// 判断日志目录是否存在，不存在时创建日志目录  
function checkAndCreateDir(dir){  
    if(!fs.existsSync(dir)){  
        fs.mkdirSync(dir);  
    }  
} 

// 配合express用的方法  
export default log4js.connectLogger(logInfo, {level:'debug', format:':method :url'})