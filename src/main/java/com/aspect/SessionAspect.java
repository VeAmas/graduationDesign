package com.aspect;

import javax.servlet.http.HttpSession;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

@Aspect
@Component
public class SessionAspect {

	@Around(  "execution(public * com.controller.LogController.*(javax.servlet.http.HttpSession,..)) or "
			+ "execution(public * com.controller.ParkingController.*(javax.servlet.http.HttpSession,..)) or "
			+ "execution(public * com.controller.ParkingSetController.*(javax.servlet.http.HttpSession,..)) or "
			+ "execution(public * com.controller.UserController.queryUser(..)) or "
			+ "execution(public * com.controller.VehicleController.*(javax.servlet.http.HttpSession,..))")
	public Object declareJoinPointExpression(ProceedingJoinPoint pjd) throws Throwable{
		HttpSession session = (HttpSession)pjd.getArgs()[0];
		if(session.getAttribute("LoginUser") == null){
			return "exit";
		}
		return (Object)pjd.proceed();
	}
}
