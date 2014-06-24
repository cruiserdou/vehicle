package com.springapp.mvc.traffic.traannual;

/**
 * Created by xwq on 14-4-15.
 */

import com.xwq.common.model.DataShop;
import com.xwq.common.util.DBInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

@Controller
@RequestMapping("/add_traannual_info")
public class AddTraannualInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
//            @PathVariable String user_id,
            @RequestParam("id") String id,
            @RequestParam("plate") String plate,
            @RequestParam("team") String team,
            @RequestParam("annualdt") String annualdt,
            @RequestParam("expiredt") String expiredt,
            @RequestParam("fees") Float fees,
            @RequestParam("handling") String handling,
            @RequestParam("remark") String remark


            ) throws Exception{
        DataShop dataShop = new DataShop();
        Connection conn = null;
        PreparedStatement pst = null;
        try {
            Class.forName("org.postgresql.Driver").newInstance();
        } catch (Exception e) {
            System.out.print(e.getMessage());
        }

        DBInfo connstr = new DBInfo();
        String url = connstr.getUrl();
        String user = connstr.getUser();
        String password = connstr.getPassword();

        try {
            conn = DriverManager.getConnection(url, user, password);

            String sql = "insert into car.traffic_annual" +
                    "(id, plate, team, annualdt, expiredt, fees, handling, remark) " +
                    " values(?, ?, ?, ?, ?, ?, ?, ?)";
            pst = conn.prepareStatement(sql);
            pst.setString(1, id);
            pst.setString(2, plate);
            pst.setString(3, team);
            java.sql.Date sql_annualdt= null;
            if (annualdt!= null && annualdt.length() > 2)
                sql_annualdt = java.sql.Date.valueOf(annualdt);
            pst.setDate(4, sql_annualdt);
            java.sql.Date sql_expiredt = null;
            if (expiredt!= null && expiredt.length() > 2)
                sql_expiredt = java.sql.Date.valueOf(expiredt);
            pst.setDate(5, sql_expiredt);
            pst.setFloat(6, fees);
            pst.setString(6, handling);
            pst.setString(8, remark);


            pst.executeUpdate();

            dataShop.setSuccess(true);

        } catch (SQLException e) {
            System.out.print(e.getMessage());
        } finally {
            try {
                if (pst != null) pst.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                System.out.print(e.getMessage());
            }
        }

        return dataShop;
    }
}