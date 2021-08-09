import { Result } from "../utils/result";
import { ConfigServiceDao } from "../dao/configServiceDao";
import { Autowired, Service } from "../utils/comment";
import path from 'path'
import { myReadFile, myWriteFile, dateFormat } from "../utils";
import { nanoid } from 'nanoid'

@Service()
export class ConfigService {

    @Autowired(ConfigServiceDao)
    private uasd: ConfigServiceDao = new ConfigServiceDao();

    //获取历史记录
    async getUploadHistoryData(gameName: string) {
        let file = path.resolve(__dirname, '../../../configDB/' + gameName + '/history.json')
        return myReadFile(file)
            .then((data: any) => {
                //判断是否为空文件,空文件返回[]
                if (data.toString() == '') {
                    data = '[]'
                }
                // console.log(JSON.parse(data))
                return new Result(JSON.parse(data))
            })
            .catch(err => {
                return new Result(err, '操作失败', -1)
            })
    }

    //文件写入
    async saveUploadConfigInfo(gameName: string, data: any, info: any, res?: any) {
        const configFile = path.resolve(__dirname, '../../../configDB/' + gameName + '/config.json')
        const historyFile = path.resolve(__dirname, '../../../configDB/' + gameName + '/history.json')
        return myWriteFile(configFile, JSON.stringify(data))
            //文件写入conifg.json文件
            .then(() => {
                //读取configHistory.json数据
                return myReadFile(historyFile)
            })
            //文件读取history文件,然后对读取的数据进行合并
            .then((historyFileData: any) => {
                //判断是否为空文件,空文件返回[]
                if (historyFileData.toString() == '') {
                    historyFileData = '[]'
                }
                let historyFileDataJson = JSON.parse(historyFileData)
                //判断历史记录数量，最多存在10条 ...historyFileDataJson.slice(0,9)
                const uploadTime = dateFormat('yyyy-MM-dd hh:mm:ss')
                const dealHistoryData = [{ ...info, data, uploadTime }, ...historyFileDataJson.slice(0, 9)]
                //对处理后的数据进行写入处理
                return myWriteFile(historyFile, JSON.stringify(dealHistoryData))
            })
            //写入处理
            .then((historyFileData: any) => {
                return new Result(JSON.parse(historyFileData))
            })
            .catch(err => {
                return new Result(err, '操作失败', -1)
            })
    }

    async saveUploadConfigInfoService(outdata: any, frontData: any, gameName: string, info: any, saveWay: string) {
        const arr = await this.dealUploadConfigFileData(outdata)
        //保存方式
        if (saveWay == 'add') {
            //追加是保存
            return await this.saveUploadConfigInfo(gameName, [...frontData, ...arr], { ...info, uploadType: '追加式上传', id: nanoid() })
        } else {
            //覆盖保存
            return await this.saveUploadConfigInfo(gameName, arr, { ...info, uploadType: '覆盖式上传', id: nanoid() })
        }

    }

    dealUploadConfigFileData(outdata: any) {
        let arr = []
        let typeFlag = 'flag' //csv表格type列的识别表示
        let children: any
        for (let i = 0; i < outdata.length; i++) {
            let ind = 1
            const type = outdata[i]['type']
            if (typeFlag != type) {
                typeFlag = type
                arr.push({ id: nanoid(), display: 1, label: type, children: [], name: type, class: 1 })
            }
            children = arr[arr.length - 1].children
            while (outdata[i]['layer' + ind]) {
                //如果为undefined,推出循环
                const label = outdata[i]['layer' + ind]
                if (!label) break

                //如果outdata的key不是undefined,
                //循环遍历arr，是否存在对应的lable值，不存在的话创建
                let labelFlag = -1; // label的值存在与否的标志
                for (let j = 0; j < children.length; j++) {
                    if (children[j].label === label) {
                        labelFlag = j
                        break
                    }
                }
                //根据labelFlag标志,是否添加key
                // console.log('labelFlag', outdata[i]['layer' + (ind + 1)])
                if (labelFlag === -1) {//不存在key
                    //判断是不是最后一层节点
                    if (outdata[i]['layer' + (ind + 1)]) {
                        //如果是undefined，则是最后一层节点)
                        children.push({ id: nanoid(), display: 1, label, children: [], name: label, class: ind + 1 })
                    } else {
                        children.push({ id: nanoid(), display: 1, label, data: outdata[i]['data_name'], name: label, class: ind + 1 })
                    }
                    children = children[children.length - 1].children
                } else {
                    // console.log('qwe')
                    children = children[labelFlag].children
                }
                //下一节点
                ind += 1
                // console.log('arr',JSON.stringify(arr))
            }

        }
        return arr
    }

    //获取行为节点配置数据
    getConfigData(gameName: string) {
        return this.readFile('all', gameName)
    }

    //获取展示的行为节点配置数据
    getConfigShowData(gameName: string) {
        return this.readFile('1', gameName)
    }

    async readFile(status: string, gameName: string) {
        const file = path.resolve(__dirname, '../../../configDB/' + gameName + '/config.json')
        return myReadFile(file).then(async (data: any) => {
            if (status == 'all') {
                return new Result(JSON.parse(data), '操作成功')
            } else {
                let checkData = await this.checkReturnData(JSON.parse(data), status)
                return new Result(checkData, '操作成功')
            }
        })
    }

    async checkReturnData(data: any, status: string) {
        let arr = []
        for (let i in data) {
            //如果状态符合status，加入数组
            if (data[i].display == status) {
                arr.push(data[i])
            }
            //判断是否还存在子节点,存在的话递归遍历
            if (data[i].children != undefined)
                data[i].children = await this.checkReturnData(data[i].children, status)
        }
        return arr
    }

    async saveEndData(gameName: string, data: string) {
        const file = path.resolve(__dirname, '../../../configDB/' + gameName + '/config.json')
        return myWriteFile(file, JSON.stringify(data)).then(_ => {
            return this.readFile('1', gameName)
        }).catch(err => {
            return new Result(err, '操作失败',-1)
        })
    }

}
