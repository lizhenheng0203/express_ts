import fs from 'fs';

//文件读取
export function myReadFile(fileDir:string) {
    return new Promise(function (resolve, reject) {
      fs.readFile(fileDir, function (err, data) {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  }
  
  //文件写入
  export function myWriteFile(fileDir:string,data:any) {
    return new Promise(function (resolve, reject) {
      fs.writeFile(fileDir, data, { encoding: 'utf8' }, (err:any) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
  
    })
  }
  
  //时间格式化
  export function dateFormat(fmt:string, date = new Date()) {
    var o:any = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }