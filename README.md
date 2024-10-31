# AI三行情书生成器

一个基于 Next.js 的 SaaS 服务，允许用户输入自然语言，使用 AI 生成对应的三行情书。生成的 HTML 文件可以分享链接或截图，与他人分享您的情感。

## 功能特性

- **自然语言输入**：用户可以输入任意文字，表达自己的情感或想法。
- **AI 生成**：利用 AI 技术生成独特的三行情书。
- **分享链接**：生成的情书支持链接分享，方便快捷。
- **分享截图**：一键生成情书截图，方便在社交媒体上分享。
- **响应式设计**：适配多种设备，提供良好的用户体验。

## 技术栈

- **Next.js**：用于构建服务端渲染的 React 应用。
- **Tailwind CSS**：快速建立美观的响应式界面。
- **OpenAI API**：生成 AI 文本内容。
- **Vercel**：部署和托管应用。

## 开始使用

### 克隆仓库

```bash
git clone https://github.com/yourusername/ai-love-poem-generator.git
cd ai-love-poem-generator
```

### 安装依赖

```bash
npm install
```

### 配置环境变量

在项目根目录下创建一个 `.env.local` 文件，添加以下内容：

```env
OPENAI_API_KEY=你的_OpenAI_API_Key
```

### 运行开发服务器

```bash
npm run dev
```

在浏览器中访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## 部署

### 部署到 Vercel

1. 登录 [Vercel](https://vercel.com/) 并创建新项目。
2. 关联 GitHub 仓库，导入 `ai-love-poem-generator` 项目。
3. 在 Vercel 中设置环境变量 `OPENAI_API_KEY`。
4. 点击部署，稍等片刻即可上线。

## 使用指南

1. 在主页输入你的文字内容。
2. 点击“生成三行情书”按钮。
3. 等待 AI 生成专属的三行情书。
4. 通过链接或截图与他人分享你的情书。

## 贡献指南

欢迎对本项目提出建议或贡献代码：

- 提交 Issue 描述问题或建议。
- Fork 项目并提交 Pull Request。

## 许可证

本项目采用 [MIT 许可证](LICENSE)。