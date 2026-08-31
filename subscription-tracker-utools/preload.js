/**
 * 订阅账本 uTools 插件 - preload.js
 * 预加载脚本，暴露 Node.js 文件读写能力给前端页面
 */

const fs = require('fs');
const path = require('path');

// 暴露给前端的 API
window.subscriptionTrackerAPI = {
  /**
   * 读取 JSON 文件
   * @param {string} filePath - 文件绝对路径
   * @returns {object|null} - 解析后的 JSON 对象，失败返回 null
   */
  readJSONFile(filePath) {
    try {
      if (!fs.existsSync(filePath)) return null;
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      console.error('读取文件失败:', e.message);
      return null;
    }
  },

  /**
   * 写入 JSON 文件
   * @param {string} filePath - 文件绝对路径
   * @param {object} data - 要写入的数据对象
   * @returns {boolean} - 是否成功
   */
  writeJSONFile(filePath, data) {
    try {
      // 确保目录存在
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.error('写入文件失败:', e.message);
      return false;
    }
  },

  /**
   * 检查文件是否存在
   * @param {string} filePath - 文件绝对路径
   * @returns {boolean}
   */
  fileExists(filePath) {
    try {
      return fs.existsSync(filePath);
    } catch (e) {
      return false;
    }
  },

  /**
   * 获取插件所在目录路径
   * @returns {string}
   */
  getPluginDir() {
    try {
      return __dirname;
    } catch (e) {
      return '';
    }
  },

  /**
   * 拼接路径
   * @param  {...string} paths
   * @returns {string}
   */
  joinPath(...paths) {
    return path.join(...paths);
  }
};

console.log('[订阅账本] preload.js 已加载');
