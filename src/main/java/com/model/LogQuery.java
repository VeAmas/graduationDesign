package com.model;

public class LogQuery {
	private String type;
	private Integer startTime;
	private Integer endTime;
	private Integer curPage;
	private Integer itemsPrePage;
	private String parking;
	private String license;
	private String set;
	
	

	public String getParking() {
		return parking;
	}
	public void setParking(String parking) {
		this.parking = parking;
	}
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
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Integer getStartTime() {
		return startTime;
	}
	public void setStartTime(Integer startTime) {
		this.startTime = startTime;
	}
	public Integer getEndTime() {
		return endTime;
	}
	public void setEndTime(Integer endTime) {
		this.endTime = endTime;
	}
	public Integer getCurPage() {
		return curPage;
	}
	public void setCurPage(Integer curPage) {
		this.curPage = curPage;
	}
	public Integer getItemsPrePage() {
		return itemsPrePage;
	}
	public void setItemsPrePage(Integer itemsPrePage) {
		this.itemsPrePage = itemsPrePage;
	}
	@Override
	public String toString() {
		return "LogQuery [type=" + type + ", startTime=" + startTime + ", endTime=" + endTime + ", curPage=" + curPage
				+ ", itemsPrePage=" + itemsPrePage + ", parkingId=" + parking + ", license=" + license + ", set="
				+ set + "]";
	}
	
	
}
