import { useRef, useEffect } from 'react';
import { Button, Space, message } from 'antd';
import localforage from 'localforage';
import copy from 'copy-to-clipboard';

const Copy = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleCopyText = () => {
    // * 安全上下文: 此项功能仅在一些支持的浏览器的安全上下文（HTTPS）中可用。
    // * 当前的安全上下文（HTTP）不可用
    window.navigator.clipboard.writeText('1112221321');
    messageApi.open({
      type: 'success',
      content: '文本复制成功！',
    });
  };

  const textRef = useRef<HTMLParagraphElement>(null);
  const handleCopyClipboard = () => {
    if (textRef.current?.innerHTML) {
      // Copy with options
      copy(textRef.current?.innerHTML, {
        debug: true,
        message: 'Press #{key} to copy',
      });
      messageApi.open({
        type: 'success',
        content: '文本复制成功！',
      });
    }
  };

  let localObjStore = localforage.createInstance({
    name: 'localObjStore',
    storeName: 'localObjStoreName',
    version: 1,
    description: '本地对象存储'
  });

  let localOtherStore = localforage.createInstance({
    name: 'localOtherStore',
    storeName: 'localOtherStoreName',
    version: 1,
    description: '本地其他存储'
  });

  localObjStore.setItem("key", '张小武');
  localOtherStore.setItem("key", "司马战哥");

  return (
    <div>
      <p>原生浏览器复制: 1112221321</p>
      <p ref={textRef}>插件复制：需要复制的文本内容</p>

      <Space size={"middle"}>
        <Button onClick={handleCopyText}>原生浏览器复制</Button>
        <Button onClick={handleCopyClipboard}>Plugin Copy</Button>
      </Space>

      {contextHolder}
    </div>
  );
};

export default Copy;
