# rc-alert
message alert

# Install
```
npm install rc-alert
```
# Usage
```
import rcAlert from 'rc-alert';

message.success(content, [duration], onClose)
message.error(content, [duration], onClose)
message.info(content, [duration], onClose)
message.warning(content, [duration], onClose)
message.warn(content, [duration], onClose) // alias of warning
```
# Parameter

| 参数 | 说明 | 类型 | 默认值|
| ------ | ------ | ------ | ------ |
| content | 提示内容 | string|ReactNode | 无 |
| duration |自动关闭的延时，单位秒 | number | 3秒 |
| onClose |关闭时触发的回调函数 | Function | 无 |
