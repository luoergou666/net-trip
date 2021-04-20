package com.example.wechatservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class WechatServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(WechatServiceApplication.class, args);
    }

}
