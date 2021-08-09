import { Dao } from "../utils/comment";
import { query } from "../utils/pgsql";

@Dao()
export class OneAlidDataShowDao {
  //单alid展示
  getOneAlidData(alid: string, gameName: string) {
    let sql;
    if (gameName === "wg")
      sql = `
        SELECT
          alid,
          biz_dt,
          al_rank,
          uid_cnt,
          activity_uid,
          activity_avg,
          activity_mid
      FROM
          op_dw_${gameName}.ads_alid_acitvity_stat_dd 
      WHERE
          1 = 1 
          AND alid = ${alid}
        order by biz_dt;`;
    else
      sql = `
        SELECT
          alid,
          biz_dt,
          al_rank,
          uid_cnt,
          activity_uid,
          activity_avg,
          activity_mid,
        al_flag_num, 
        construct_al_flag_uid
      FROM
          op_dw_${gameName}.ads_alid_acitvity_stat_dd 
      WHERE
          1 = 1 
          AND alid = ${alid}
        order by biz_dt;`;
    return query(sql);
  }

  //获取某各联盟在世界地图的人员分布情况
  getLeaguePersonMap(alid: string, gameName: string) {
    let sql = `
      SELECT install_country as name
         , user_ct as value
      FROM op_dw_${gameName}.ads_alid_country_dd
      WHERE 1= 1
        AND alid = ${alid}
        AND install_country IS NOT NULL
      `;
    return query(sql);
  }
}
