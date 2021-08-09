import * as pg from 'pg'

class Pgsql {
    //数据库配置
    private config: Object
    //数据池
    public pool:any
    //单例
    static instance:Pgsql | null
    constructor() {
        this.config = {
            user: 'user',           // 数据库用户名
            database: 'test',       // 数据库
            password: '123$',       // 数据库密码
            host: '127.0.0.1',        // 数据库所在IP
            port: '3060',             // 连接端口
            // 扩展属性
            max: 20, // 连接池最大连接数
            idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
        }
        this.pool  = new pg.Pool(this.config);
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Pgsql()
        }
        return this.instance
    }
}

const pgsql:Pgsql = Pgsql.getInstance()
const pool = pgsql.pool

export function query(sql:string):Promise<Object[]> {
    console.log('sql',sql)
    return new Promise((resolve, reject) => {
        pool.connect(function (error:any, client:any, done:any) {
            //数据库连接是否有问题
            if (error) {
                console.info(error)
                reject(error.toString())
            }
            //数据库查询
            client.query(sql, [], function (err: any, response: any) {
                done();
                if (err) {
                    console.info(err)
                    reject(err.toString())
                    return
                }
                //如果查询结果为空的话，则反馈查询结果为空
                if (response.rows.length == 0) {
                    reject('查询语句：'+sql+"的查询结果为空,请检查！！")
                    return
                }
                resolve(response.rows)
            })
        })
    })
}
