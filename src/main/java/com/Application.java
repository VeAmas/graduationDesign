package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


@ComponentScan				//开启组件扫描
@EnableAutoConfiguration 	//开启自动扫描
@RestController
public class Application extends SpringBootServletInitializer{

	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }
	
    public static void main(String[] args) {  
        SpringApplication.run(Application.class, args);  
    }  

//    @RequestMapping("/")
//	public ModelAndView home() {
//        return new ModelAndView("home");
//    }
}
