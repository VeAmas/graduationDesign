package com.model;

public class LogQuery {
	private String type;
	private Integer startTime;
	private Integer endTime;
	private Integer curPage;
	private Integer itemsPrePage;
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
				+ ", itemsPrePage=" + itemsPrePage + "]";
	}
	
	
}
