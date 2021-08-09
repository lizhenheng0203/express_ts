// import { CODE_SUCCESS,CODE_ERROR } from "./constant"

export class Result {
  private data: any
  private msg: string
  private code: number
  constructor(data: any = undefined, msg: string = '操作成功', code: number = 0) {
    this.data = data
    this.code = code
    this.msg = msg
  }
}