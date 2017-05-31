package com.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.model.Log;
import com.model.LogQuery;
import com.serviceImpl.LogDaoImpl;

@RestController  
@RequestMapping(value = "/log")  
public class LogController {
	@Autowired
	LogDaoImpl logDao;
	
	@RequestMapping(value = "/queryLog", method = RequestMethod.POST)  
    public ArrayList<Log> queryLog(@RequestBody LogQuery lq) {  
		if (lq.getCurPage() != null && lq.getItemsPrePage() != null) {
			lq.setCurPage(lq.getCurPage() * lq.getItemsPrePage());
		} else if (lq.getCurPage() == null && lq.getItemsPrePage() == null) {
			lq.setCurPage(0);
			lq.setItemsPrePage(10000);
	    }
    	ArrayList<Log> p = logDao.queryLog(lq);
        return p;  
    }
	
	@RequestMapping(value = "/getLogNum", method = RequestMethod.POST)  
    public Integer getLogNum(@RequestBody LogQuery lq) {  
		lq.setCurPage(0);
		lq.setItemsPrePage(10000);
    	ArrayList<Log> p = logDao.queryLog(lq);
        return p.size();  
    }
	
}
