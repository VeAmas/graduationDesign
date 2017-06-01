package com.controller;

import java.io.InputStream;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Workbook;
import org.jeecgframework.poi.excel.ExcelExportUtil;
import org.jeecgframework.poi.excel.ExcelImportUtil;
import org.jeecgframework.poi.excel.entity.ExportParams;
import org.jeecgframework.poi.excel.entity.ImportParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.model.Log;
import com.model.User;
import com.model.UserQuery;
import com.serviceImpl.LogDaoImpl;
import com.serviceImpl.UserDaoImpl;

import net.sf.json.JSONObject;

@RestController  
@RequestMapping(value = "/user")  
public class UserController {
	@Autowired
	UserDaoImpl userDao;
	
	@Autowired
	LogDaoImpl logDao;	
	
    @RequestMapping(value = "/login", method = RequestMethod.POST)  
    public Boolean login(@RequestBody String many) {
    	JSONObject jo = JSONObject.fromObject(many);
    	
    	String userName = jo.getString("many");
    	String password = jo.getString("password");
    	User u = userDao.getUserByMany(userName);
    	if (u == null) {
    		return false;
    	}
    	if (u.getPassword().equals(password)) {
    		Log l = new Log();
    		l.setContent("用户登录");
    		l.setType("登录");
    		l.setUser(u.getName());
    		logDao.addLog(l);
    		
			return true;
		}
        return false;  
    }
    
    @RequestMapping(value = "/getUserPhoto", method = RequestMethod.POST)  
    public User getUserPhoto(@RequestBody String many) {
    	
    	User u = userDao.getUserByMany(many);
    	if (u == null) {
    		return null;
    	}
    	u.setPassword(null);
    	return u;
    }
    
    @RequestMapping(value = "/getUser", method = RequestMethod.POST)  
    public User getUser(@RequestBody String userId) {    	
    	User u = userDao.getUserByUserId(userId);
    	return u;
    }
    
    @RequestMapping(value = "/getUserByCurVehicle", method = RequestMethod.POST)  
    public User getUserByCurVehicle(@RequestBody String license) {   
    	System.out.println(license); 	
    	User u = userDao.getUserByUserVehicleLicense(license);
    	return u;
    }
    
    @RequestMapping(value = "/queryUser", method = RequestMethod.POST)  
    public ArrayList<User> queryUser(@RequestBody UserQuery uq) {    	
 	   if (uq.getCurPage() != null && uq.getItemsPrePage() != null) {
 		   uq.setCurPage(uq.getCurPage() * uq.getItemsPrePage());
	   } else if (uq.getCurPage() == null && uq.getItemsPrePage() == null) {
		   uq.setCurPage(0);
		   uq.setItemsPrePage(10000);
	   }   	
    	return userDao.queryUser(uq);
    }   
    
    @RequestMapping(value = "/getUserNum", method = RequestMethod.POST)  
    public Integer getUserNum(@RequestBody UserQuery uq) {    	
    	uq.setCurPage(0);
    	uq.setItemsPrePage(10000);
     	return userDao.queryUser(uq).size();
     }
    
    @RequestMapping(value = "/addUser", method = RequestMethod.POST)  
    public boolean addUser(@RequestBody User u) {  
    	System.out.println(u);
        return userDao.addUser(u);
    }
    
    @RequestMapping(value = "/updateUser", method = RequestMethod.POST)  
    public boolean updateUser(@RequestBody User user) {  
    	System.out.println(user);
        return userDao.updateUser(user);
    }
    
    @RequestMapping(value = "/deleteUser", method = RequestMethod.POST)  
    public boolean deleteUser(@RequestBody String userId) {  
        return userDao.deleteUser(userId);
    }
    
    @RequestMapping(value = "/getExcel", method = RequestMethod.GET)  
    public void getExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {  
        response.setHeader("content-Type", "application/vnd.ms-excel");
        // 下载文件的默认名称
        response.setHeader("Content-Disposition", "attachment;filename=user.xls");
        ArrayList<User> list = new ArrayList<User>();
        User u = new User();
        u.setAddress("123");
        u.setAge("12");
        u.setBirth(12345);
        u.setCellPhone("12354");
        u.setCurVehicle("");
        u.setEmail("sdfde");
        u.setGender("sdf");
        u.setID("sdfsdf");
        u.setLastRecordTime(134);
        u.setName("sdf");
        u.setPhoto("sefs");
        u.setStartDate("sefsfe");
        u.setUserId("sef");
        u.setUserType("sefsef");
        list.add(u);
        
        Workbook workbook = ExcelExportUtil.exportExcel(new ExportParams(), User.class, list);
        workbook.write(response.getOutputStream());
        
    }
    
    @RequestMapping(value = "/importExcel", method = RequestMethod.POST)  
    public String importExcel( @RequestParam("file") MultipartFile file) throws Exception {  
    	System.out.println("in");
    	
    	if (!file.isEmpty()) {  
            try {  
            	InputStream is = file.getInputStream();
                
                System.out.println(ExcelImportUtil.importExcel(is, User.class, new ImportParams()));
                
                return "You successfully uploaded "  + " into "  + "-uploaded !";  
            } catch (Exception e) {  
                return "You failed to upload "  + " => " + e.getMessage();  
            }  
        } else {  
            return "You failed to upload "  + " because the file was empty.";  
        }  
        
    }  
    
}
