import mq from 'mysql'

class Mysql {
    //数据库配置
    private config: Object
    //数据池
    public connect: any
    //单例
    static instance: Mysql | null
    constructor() {
        this.config = {
            host: '127.0.0.1',
            user: 'user',
            password: 'user',
            database: 'user',
            multipleStatements: true,            // 连接端口
            // 扩展属性
            max: 20, // 连接池最大连接数
            idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
        }
        this.connect = mq.createConnection(this.config)
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Mysql()
        }
        return this.instance
    }
}

const mysql: Mysql = Mysql.getInstance()
const conn = mysql.connect()

export function querySql(sql: string) {
    console.log('sql', sql)
    return new Promise((resolve, reject) => {
        try {
            conn.query(sql, (err: any, results: any) => {
                if (err) {
                    console.log('查询失败，原因:' + JSON.stringify(err))
                    reject(err)
                    return
                }
                //如果查询结果为空的话，则反馈查询结果为空
                if (results.rows.length == 0) {
                    reject('查询语句：' + sql + "的查询结果为空,请检查！！")
                    return
                }
                // debug && console.log('查询成功', JSON.stringify(results))
                resolve(results)
            })
        } catch (e) {
            reject(e)
        } finally {
            conn.end()
        }
    })
}

