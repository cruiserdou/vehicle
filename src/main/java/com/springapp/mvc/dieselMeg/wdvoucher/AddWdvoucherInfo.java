package com.springapp.mvc.dieselMeg.wdvoucher;

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
@RequestMapping("/add_wdvoucher_info")
public class AddWdvoucherInfo {

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
//            @PathVariable String user_id,
            @RequestParam("id") String id,
            @RequestParam("tracdt") String tracdt,
            @RequestParam("plate") String plate,
            @RequestParam("wv") Float wv,
            @RequestParam("wvl") Float wvl,
            @RequestParam("dv") Float dv,
            @RequestParam("price") Float price,
            @RequestParam("wvmon") Float wvmon,
            @RequestParam("dvmon") Float dvmon,
            @RequestParam("surplus") Float surplus,
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

            String sql = "insert into car.diesel_wdvoucher" +
                    "(id, tracdt, plate, wv, wvl, dv, price, wvmon, dvmon, surplus,  remark) " +
                    " values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  ?)";
            pst = conn.prepareStatement(sql);
            pst.setString(1, id);
            java.sql.Date sql_tracdt = null;
            if (tracdt!= null && tracdt.length() > 2)
                sql_tracdt = java.sql.Date.valueOf(tracdt);
            pst.setDate(2, sql_tracdt);
            pst.setString(3, plate);
            pst.setFloat(4, wv);
            pst.setFloat(5, wvl);
            pst.setFloat(6, dv);
            pst.setFloat(7, price);
            pst.setFloat(8, wvmon);
            pst.setFloat(9, dvmon);
            pst.setFloat(10, surplus);
            pst.setString(11, remark);



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