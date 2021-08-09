import { Router,Request, Response,NextFunction as NF } from "express";
import { Result } from "./result";

export function Get(params?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target.router || (target.router = Router())
        target.router.get(params, function (req: Request, res: Response, next: NF) {
            descriptor.value.call(target,req,res).then((data:Object) => {
                res.json(data)
            })
            // res.json(descriptor.value.call(target,req,res))
        })
    }
}

export function Post(params?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target.router || (target.router = Router())
        target.router.post(params, function (req: Request, res: Response, next: NF) {
            // new Result(descriptor.value(), '操作成功').success(res)
            descriptor.value.call(target,req,res).then((data:Object) => {
                res.json(data)
            })
        })
    }
}

export function Put(params?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target.router || (target.router = Router())
        target.router.put(params, function (req: Request, res: Response, next: NF) {
            // new Result(descriptor.value(), '操作成功').success(res)
            descriptor.value.call(target,req,res).then((data:Object) => {
                res.json(data)
            })
        })
    }
}

export function Delete(params?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target.router || (target.router = Router())
        target.router.delete(params, function (req: Request, res: Response, next: NF) {
            // new Result(descriptor.value(), '操作成功').success(res)
            descriptor.value.call(target,req,res).then((data:Object) => {
                res.json(data)
            })
        })
    }
}

//添加统一的路径
//实例化
export function Controller(params?: string) {
    return function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
        // console.log('constructor',constructor.prototype)
        // constructor.prototype.instance = null
        // constructor.prototype.getInstance = (function() {
        //             let instance:any
        //             return function() {
        //                 instance = instance || new constructor()
        //                 return instance
        //             }
        //         })()

        // constructor.prototype.router = Router()
        // return class extends constructor {
            //构造器，初始化参数赋值
            // classUnifyApiPath: string
            // constructor(..._: any[]) {
            //     super()
            //     this.classUnifyApiPath = params || ""
            // }
            // public router:Router
            // constructor(..._: any[]) {
            //     super()
            //     // this.router = Router()
            // }
        // }
    }
}

export function Service() {
    return function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
        // console.log('constructor',constructor.prototype)
        //重写类中的所有方法，添加try错误处理
        const copyObj = constructor.prototype
        for (let i in copyObj) {
            // console.log(typeof copyObj[i])
            if (typeof copyObj[i] === 'function') {
                const copyMethod = constructor.prototype[i]
                constructor.prototype[i] = async function(...params:any) {
                    try {
                        // return copyObj[i](...params)
                        return await copyMethod.call(constructor.prototype,...params)
                    }catch(err) {
                        return new Result(err.toString(),'服务器报错',-1)
                    }
                }
            }
        }
    }
}

export function Dao() {
    return function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
        // console.log('constructor',constructor.prototype)
        //重写类中的所有方法，添加try错误处理
        const copyObj = constructor.prototype
        for (let i in copyObj) {
            // console.log(typeof copyObj[i])
            if (typeof copyObj[i] === 'function') {
                const copyMethod = constructor.prototype[i]
                constructor.prototype[i] = function(...params:any) {
                    try {
                        // return copyObj[i](...params)
                        return copyMethod.call(constructor.prototype,...params)
                    }catch(err) {
                        throw(err.toString())
                    }
                }
            }
        }
    }
}

export function Autowired<T>(params: {new(): T; }) {
    // target--->类的原型对象；attr--->传入的参数url
    return function (target: any, attr: any) {
      target[attr] = new params()
    }
  }


  function PromiseObjMethod(instance: string, ...params: string[]) {
    console.log('params', params)
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('this', target)
        Promise.all(params.map((e: string) => {
            console.log('e', e)
            target[instance][e]
        })).then(data => {
            descriptor.value(data)
        })
    }
}
