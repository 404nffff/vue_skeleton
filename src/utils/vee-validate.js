import {configure, defineRule,} from 'vee-validate';

import * as rules from '@vee-validate/rules';


export const setupVeeValidate = () => {
    // 全局定义验证规则
Object.keys(rules).forEach(rule => {

    //过滤all
    if (rule === 'all') {
      return;
    }
  
    defineRule(rule, rules[rule]);
  });
  
  
  configure({
    generateMessage: context => {
      
      const messages = {
        alpha_dash: `${context.field}只能包含字母数字字符、破折号和下划线`,
        alpha_num: `${context.field}只能包含字母和数字字符`,
        alpha_spaces: `${context.field}只能包含字母字符和空格`,
        between: `${context.field}必须在${context.rule.params[0]}和${context.rule.params[1]}之间`,
        confirmed: `${context.field}与确认字段不匹配`,
        digits: `${context.field}必须是${context.rule.params[0]}位数字`,
        dimensions: `${context.field}必须是${context.rule.params[0]}像素到${context.rule.params[1]}像素之间`,
        email: `${context.field}必须是有效的电子邮件地址`,
        ext: `${context.field}必须是有效的文件扩展名`,
        image: `${context.field}必须是图像文件`,
        integer: `${context.field}必须是整数`,
        is: `${context.field}必须是${context.rule.params[0]}`,
        is_not: `${context.field}不能是${context.rule.params[0]}`,
        length: `${context.field}必须是${context.rule.params[0]}字符`,
        max: `${context.field}最多不能超过${context.rule.params[0]}个字符`,
        max_value: `${context.field}必须小于或等于${context.rule.params[0]}`,
        mimes: `${context.field}必须是有效的文件类型`,
        min: `${context.field}至少需要${context.rule.params[0]}个字符`,
        min_value: `${context.field}必须大于或等于${context.rule.params[0]}`,
        not_one_of: `${context.field}不能是以下值之一：${context.rule.params.join(', ')}`,
        numeric: `${context.field}必须是数字`,
        one_of: `${context.field}必须是以下值之一：${context.rule.params.join(', ')}`,
        regex: `${context.field}格式无效`,
        required: `${context.field}是必填项`,
        size: `${context.field}大小必须小于${context.rule.params[0]}KB`,
        url: `${context.field}必须是有效的URL`
      };
  
  
      const message = messages[context.rule.name]
        ? messages[context.rule.name]
        : `${context.field}的值无效`;
  
      return message;
    },
    validateOnInput: true,
  });  
}