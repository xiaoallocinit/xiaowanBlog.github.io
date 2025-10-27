# MasterGo MCP 工具使用指南

## 简介

MasterGo MCP（Model-Controller-Protocol）工具可以将MasterGo设计文件转换为前端代码。这个工具能够提取设计系统的DSL（领域特定语言）数据，并将其转换为各种前端框架的代码。

## 访问权限要求

根据我们的测试，使用MasterGo MCP工具需要以下权限：

1. **MasterGo团队版或更高版本**的订阅
2. **编辑席位**或**研发席位**权限
3. 正确的**认证令牌**

## 如何获取访问权限

1. 确保您拥有MasterGo团队版或企业版订阅
2. 联系您的团队管理员，确保您具有研发席位权限
3. 在MasterGo中生成个人访问令牌（Personal Access Token）

## 使用步骤

### 1. 准备设计文件

- 在MasterGo中打开您的设计文件
- 选择要转换为代码的具体组件或页面
- 复制包含完整参数的URL，例如：
  ```
  https://mastergo.com/file/FILE_ID?page_id=PAGE_ID&layer_id=LAYER_ID
  ```

### 2. 使用MCP工具提取DSL

使用以下命令格式提取设计系统的DSL数据：
```bash
# 使用完整的URL
mcp_mastermastergo-magic_mcp__getDsl(shortLink="https://mastergo.com/file/...")

# 或者分别提供fileId和layerId
mcp_mastermastergo-magic_mcp__getDsl(fileId="FILE_ID", layerId="LAYER_ID")
```

### 3. 生成组件代码

获取DSL数据后，可以使用以下工具生成组件代码：
```bash
# 获取组件生成器
mcp_mastermastergo-magic_mcp__getComponentGenerator(fileId="FILE_ID", layerId="LAYER_ID", rootPath="项目路径")

# 获取页面元数据
mcp_mastermastergo-magic_mcp__getMeta(fileId="FILE_ID", layerId="LAYER_ID")
```

## 常见问题

### 权限错误
如果遇到以下错误：
```
🔒 禁止访问，请确认token是否正确或确保您有MasterGo团队版及以上权限的编辑席位或研发席位
```

解决方法：
1. 检查您的MasterGo订阅级别
2. 确认您具有研发席位权限
3. 验证认证令牌是否正确配置

### 参数错误
如果遇到以下错误：
```
Could not extract layerId from URL
```

解决方法：
1. 确保URL包含完整的[layer_id](file:///Users/xiaozhibin/xiaowanBlog/node_modules/@types/node/ts4.8/globals.d.ts#L61-L61)参数
2. 使用实际的fileId和layerId参数而不是仅提供文件链接

## 最佳实践

1. 在使用MCP工具之前，确保设计文件结构清晰，组件命名规范
2. 将复杂的设计拆分为多个可复用的组件
3. 使用MasterGo的设计系统功能来确保一致性
4. 在生成代码后，根据需要进行手动调整和优化

## 示例工作流程

1. 在MasterGo中完成设计
2. 选择要转换的组件并获取其完整URL
3. 使用MCP工具提取DSL数据
4. 根据DSL数据生成前端代码
5. 集成生成的代码到您的项目中
6. 根据需要进行手动调整