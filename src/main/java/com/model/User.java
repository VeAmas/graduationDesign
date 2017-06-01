package com.model;

import org.jeecgframework.poi.excel.annotation.Excel;

public class User {
    private String userId;
    @Excel(name = "userType", orderNum = "1", mergeVertical = false, isImportField = "userType") 
    private String userType;
    @Excel(name = "name", orderNum = "2", mergeVertical = false, isImportField = "name") 
    private String name;
    @Excel(name = "age", orderNum = "3", mergeVertical = false, isImportField = "age") 
    private String age;
    @Excel(name = "gender", orderNum = "4", mergeVertical = false, isImportField = "gender") 
    private String gender;
    @Excel(name = "birth", orderNum = "5", mergeVertical = false, isImportField = "birth") 
    private String birth;
    @Excel(name = "ID", orderNum = "6", mergeVertical = false, isImportField = "ID") 
    private String ID;
    @Excel(name = "address", orderNum = "7", mergeVertical = false, isImportField = "address") 
    private String address;
    @Excel(name = "cellPhone", orderNum = "8", mergeVertical = false, isImportField = "cellPhone") 
    private String cellPhone;
    @Excel(name = "email", orderNum = "9", mergeVertical = false, isImportField = "email") 
    private String email;
    @Excel(name = "startDate", orderNum = "10", mergeVertical = false, isImportField = "startDate") 
    private String startDate;
    private Integer lastRecordTime;
    private String photo;
    private String curVehicle;
	private String password;
    
    
    public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
    
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getBirth() {
		return birth;
	}
	public void setBirth(String birth) {
		this.birth = birth;
	}
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCellPhone() {
		return cellPhone;
	}
	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getCurVehicle() {
		return curVehicle;
	}
	public void setCurVehicle(String curVehicle) {
		this.curVehicle = curVehicle;
	}
	public Integer getLastRecordTime() {
		return lastRecordTime;
	}
	public void setLastRecordTime(Integer lastRecordTime) {
		this.lastRecordTime = lastRecordTime;
	}
	@Override
	public String toString() {
		return "User [userId=" + userId + ", userType=" + userType + ", name=" + name + ", age=" + age + ", photo="
				+ photo + ", gender=" + gender + ", birth=" + birth + ", ID=" + ID + ", address=" + address
				+ ", cellPhone=" + cellPhone + ", email=" + email + ", startDate=" + startDate + ", curVehicle="
				+ curVehicle + ", lastRecordTime=" + lastRecordTime + "]";
	}
}

