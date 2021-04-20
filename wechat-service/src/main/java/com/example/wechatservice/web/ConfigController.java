package com.example.wechatservice.web;

import com.alibaba.nacos.api.config.annotation.NacosValue;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: luoergou
 * @description:
 * @date: 2021-04-20 21:31
 */
@RestController
@Data
@RefreshScope
public class ConfigController {
    @Value("${wx.app}")
    public String wxApp;

    @RequestMapping("/refreshConfig")
    public String refreshConfig() {
        return wxApp;
    }


}
