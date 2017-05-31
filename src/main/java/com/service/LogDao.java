package com.service;

import java.util.ArrayList;

import com.model.Log;
import com.model.LogQuery;

public interface LogDao {
	public Boolean addLog(Log l);
	public ArrayList<Log> queryLog(LogQuery lq);
}
