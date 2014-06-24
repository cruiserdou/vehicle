package com.springapp.mvc.carMeg.outward;

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
@RequestMapping("/update_outward_info")
public class UpdateOutwardInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
//            @PathVariable String user_id,
            @RequestParam("id") String id,
            @RequestParam("dept") String dept,
            @RequestParam("users") String users,
            @RequestParam("usedt") String usedt,
            @RequestParam("estimatedt") String estimatedt,
            @RequestParam("pernum") Integer pernum,
            @RequestParam("cause") String cause,
            @RequestParam("remark") String remark
            ) throws Exception{
        DataShop dataShop = new DataShop();
        dataShop.setSuccess(true);
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

            String sql = "update car.outward_car set " +
                    "dept=?, users=?, usedt=?, estimatedt=?, pernum=?, cause=?, remark=?" +
                    "where id = ?";
            pst = conn.prepareStatement(sql);
            pst.setString(1, dept);
            pst.setString(2, users);
            java.sql.Date sql_usedt = null;
            if (usedt!= null && usedt.length() > 2)
                sql_usedt = java.sql.Date.valueOf(usedt);
            pst.setDate(3,  sql_usedt);
            java.sql.Date sql_estimatedt = null;
            if (estimatedt!= null && estimatedt.length() > 2)
                sql_estimatedt = java.sql.Date.valueOf(estimatedt);
            pst.setDate(4,  sql_estimatedt);
            pst.setInt(5, pernum);
            pst.setString(6, cause);
            pst.setString(7, remark);
            pst.setString(8, id);

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