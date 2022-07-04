package com.example.nettripgetway.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.InetSocketAddress;

/**
 * 自定义令牌算法
 */
@Component
public class CustomKeyResolver implements KeyResolver {
    private static final Logger log = LoggerFactory.getLogger(CustomKeyResolver.class);

    @Override
    public Mono<String> resolve(ServerWebExchange exchange) {
        String monoResult = "";
        InetSocketAddress remoteAddress = exchange.getRequest().getRemoteAddress();
        if (null == remoteAddress) {
            log.error("远程客户端地址获取失败");
        } else {
            monoResult = remoteAddress.getAddress().getHostAddress();
        }

        return Mono.just(monoResult);
    }
}
