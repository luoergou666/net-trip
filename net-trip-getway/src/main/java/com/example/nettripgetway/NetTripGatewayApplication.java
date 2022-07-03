package com.example.nettripgetway;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class NetTripGatewayApplication {
    private static final Logger log = LoggerFactory.getLogger(NetTripGatewayApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(NetTripGatewayApplication.class, args);

        log.info("NetTrip API网关服务启动成功！！！");
    }
}
