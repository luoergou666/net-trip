package com.example.wechatservice.web.service;

import com.alibaba.csp.sentinel.Entry;
import com.alibaba.csp.sentinel.SphU;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.alibaba.csp.sentinel.slots.block.RuleConstant;
import com.alibaba.csp.sentinel.slots.block.flow.FlowRule;
import com.alibaba.csp.sentinel.slots.block.flow.FlowRuleManager;
import com.example.wechatservice.web.controller.SentinelController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

/**
 * SentinelService
 *
 * @author hcjwork
 * @date 2022年07月05日 13:31
 */
@Service
public class SentinelService {
    private static final Logger log = LoggerFactory.getLogger(SentinelController.class);

    public String hello() {
        log.info("do something in SentinelService");
        try (Entry entry = SphU.entry("HelloWorld")) {
            // 业务处理
            return "服务正常响应";
        } catch (BlockException e) {
            // 处理被流控的逻辑
            return "系统繁忙，请稍候再试";
        }
    }

    /**
     * 通过流控规则来指定允许资源通过的请求次数
     */
    @PostConstruct // 执行完构造方法后调用此方法
    private void initFlowRules() {
        List<FlowRule> rules = new ArrayList<>();

        // 流控规则
        FlowRule flowRule = new FlowRule();
        // 资源名称
        flowRule.setResource("HelloWorld");
        // 流量控制的规则采用响应时间方式来限制；QPS: Query Per Second，每秒查询次数
        flowRule.setGrade(RuleConstant.FLOW_GRADE_QPS);
        // QPS具体数值；限制QPS最大为20
        flowRule.setCount(2);

        rules.add(flowRule);

        // 将自定义的流控规则添加到Sentinel的配置中
        FlowRuleManager.loadRules(rules);
    }
}
