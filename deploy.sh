#!/bin/bash

# 设置变量
PROJECT_NAME="storybook-react"
BUILD_COMMAND="yarn run build-storybook"  # 打包命令
SOURCE_DIR="storybook-static"   # 要推送的目录
TARGET_REPO_URL="git@github.com:howardwzh/howardwzh.github.io.git" # GitHub 目标仓库地址
TARGET_BRANCH="master"         # 推送目标分支
COMMIT_MESSAGE_PREFIX="Deploy $PROJECT_NAME - " # 提交信息前缀

# 打印日志
echo "🚀 Starting deployment script..."

# 执行打包命令
echo "🏗️  Building the project..."
if ! $BUILD_COMMAND; then
  echo "❌ Build failed. Please check your build script."
  exit 1
fi

# 检查 dist 文件夹是否生成
if [[ ! -d "$SOURCE_DIR" ]]; then
  echo "❌ Error: Directory '$SOURCE_DIR' does not exist after build."
  exit 1
fi

# 获取当前工作目录
CURRENT_DIR=$(pwd)

# 创建临时目录（在当前目录下）
TEMP_DIR="$CURRENT_DIR/deploy_temp"
echo "📂 Created temporary directory: $TEMP_DIR"
mkdir -p "$TEMP_DIR"

# 克隆目标分支内容到临时目录
echo "🔄 Cloning repository: $TARGET_REPO_URL (branch: $TARGET_BRANCH)"
if ! git clone --branch "$TARGET_BRANCH" "$TARGET_REPO_URL" "$TEMP_DIR"; then
  echo "❌ Failed to clone repository. Please check the repository URL and branch."
  exit 1
fi

# 进入临时目录
cd "$TEMP_DIR"

# 复制 dist 文件夹内容到临时目录，并重命名
echo "📋 Copying built files to the repository (renaming to '$PROJECT_NAME')..."
cp -r "../$SOURCE_DIR/." "$TEMP_DIR/$PROJECT_NAME"

# 检查是否有变更
if git diff --quiet; then
  echo "✅ No changes detected. Deployment skipped."
  cd -
  rm -rf "$TEMP_DIR"
  exit 0
fi

# 动态生成提交信息
CURRENT_DATE=$(date "+%Y-%m-%d %H:%M:%S")
COMMIT_MESSAGE="${COMMIT_MESSAGE_PREFIX}${CURRENT_DATE}"

# 提交变更
echo "📝 Committing changes with message: '$COMMIT_MESSAGE'"
git add .
git commit -m "$COMMIT_MESSAGE"

# 推送到远程分支
echo "📤 Pushing changes to remote repository..."
if git push; then
  echo "✅ Deployment successful!"
else
  echo "❌ Deployment failed. Please check your remote repository and permissions."
  exit 1
fi

# 清理临时目录
cd -
rm -rf "$TEMP_DIR"
echo "🧹 Temporary directory cleaned up."

# 打印成功日志
echo "✅ Successfully built and deployed '$SOURCE_DIR' to '$TARGET_REPO_URL' branch '$TARGET_BRANCH'."
