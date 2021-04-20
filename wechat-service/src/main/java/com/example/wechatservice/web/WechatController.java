package com.example.wechatservice.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: luoergou
 * @description:
 * @date: 2021-04-20 20:14
 */
@RestController
@AllArgsConstructor

public class WechatController {

    private final ConfigController configController;

    @GetMapping(path = "/user")
    public String fun() {
        return "我是微信服务" + configController.getWxApp();
    }
}
