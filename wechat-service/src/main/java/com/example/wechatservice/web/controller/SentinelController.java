package com.example.wechatservice.web.controller;

import com.example.wechatservice.web.service.SentinelService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * Sentinel示例Controller
 *
 * @author hcjwork
 * @date 2022年07月05日 13:28
 */
@RestController
@RequestMapping("/sentinel")
public class SentinelController {
    private static final Logger log = LoggerFactory.getLogger(SentinelController.class);

    @Resource
    private SentinelService sentinelService;

    @RequestMapping("/requestSource")
    public String requestSource() {
        return sentinelService.hello();
    }
}
