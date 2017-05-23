package com.model;

public class User {
    private String userId;
    private String userType;
    private String name;
    private String age;
    private String photo;
    private String gender;
    private Integer birth;
    private String ID;
    private String address;
    private String cellPhone;
    private String email;
    private String startDate;
    private String curVehicle;
    private Integer lastRecordTime;
    
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
	public Integer getBirth() {
		return birth;
	}
	public void setBirth(Integer birth) {
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

