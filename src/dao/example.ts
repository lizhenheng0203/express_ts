import { Dao } from "../utils/comment";
import { query } from "../utils/pgsql";

@Dao()
export class Example {
  //单alid展示
  getOneAlidData(alid: string, gameName: string) {
   let sql = ``
    return query(sql);
  }
}
