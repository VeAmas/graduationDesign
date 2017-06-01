package com.model;

import java.util.Date;

public class Log {
	private String logId;
	private String type;
	private String user;
	private Integer time;
	private String remark;
	private String content;
	private String set;
	private String parking;
	private String license;
	
	public String getLicense() {
		return license;
	}

	public void setLicense(String license) {
		this.license = license;
	}

	public String getSet() {
		return set;
	}

	public void setSet(String set) {
		this.set = set;
	}

	public String getParking() {
		return parking;
	}

	public void setParking(String parking) {
		this.parking = parking;
	}

	public Log() {
		this.time = (int) (new Date().getTime() / 1000);
	}
	
	public String getLogId() {
		return logId;
	}
	public void setLogId(String logId) {
		this.logId = logId;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public Integer getTime() {
		return time;
	}
	public void setTime(Integer time) {
		this.time = time;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	@Override
	public String toString() {
		return "Log [logId=" + logId + ", type=" + type + ", user=" + user + ", time=" + time + ", remark=" + remark
				+ ", content=" + content + "]";
	}
	
	
}
