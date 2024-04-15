import { FileTextOutlined, SaveOutlined, SettingOutlined } from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import type { MenuProps } from 'antd';
import type { Theme } from '@monaco-editor/react';
import { Button, Dropdown, message, Switch, Menu } from 'antd';
import { useRef, useState } from 'react';
import './index.less';

const Webide = () => {
  const [code, setCode] = useState('');
  const [currentFileHandle, setCurrentFileHandle] = useState<any>(null);
  const editorRef = useRef(null);

  const handleOpenFile = async () => {
    // @ts-ignore
    const handle = await window.showOpenFilePicker();
    const root = await processHandle(handle)
    setCurrentFileHandle(root.children[0]);
    const fileData = await root.children[0].getFile();
    languageByfileType(fileData.type)
    const reader = new FileReader();
    reader.readAsText(fileData, 'utf-8');
    reader.onload = e => {
      // @ts-ignore
      setCode((prev) => {
        return e.target?.result
      })
    }
  };

  const [languageType, setLanguageType] = useState<string>('text/javascript');
  const languageByfileType = (type: string) => {
    switch (type) {
      case "text/javascript": {
        setLanguageType("text/javascript")
      }
        break;
      case "text/plain": {
        setLanguageType("text/plain")
      }
        break;
      default:
        break;
    }
  }

  async function processHandle(handle: any) {
    if (handle.kind === 'file') {
      return handle;
    }
    handle.children = [];
    const iter = await handle.entries();
    for await (let item of iter) {
      handle.children.push(await processHandle(item[1]))
    }
    return handle;
  }

  // 异步函数用于将给定内容写入到文件句柄，从而写入磁盘
  async function writeFile(filehandle: any, contents: any) {
    const writable = await filehandle.createWritable();
    await writable.write(contents)
    await writable.close();
  }

  const handleSaveFile = async () => {
    if (editorRef.current) {
      // @ts-ignore
      const newFileDataBySaved = editorRef.current.getValue()
      await writeFile(currentFileHandle, newFileDataBySaved);
      message.success('文件保存完成！');
    }
  }

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  const [themeType, setThemeType] = useState<Theme>('light');
  const handleSwitchOnChange = (checked: boolean) => {
    checked ? setThemeType("light") : setThemeType("vs-dark")
  }

  const handleMenuClick: MenuProps['onClick'] = e => {
    switch (e.key) {
      case 'openFile': {
        handleOpenFile();
      }
        break;
      case 'saveFile': {
        handleSaveFile();
      }
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick} items={[
      {
        label: '打开...(仅支持.txt,.js文件)',
        key: 'openFile',
        icon: <FileTextOutlined />,
      },
      {
        label: '保存文件',
        key: 'saveFile',
        icon: <SaveOutlined />,
        disabled: currentFileHandle !== null ? false : true
      },
      {
        label: <Switch checkedChildren="嘿色主题" unCheckedChildren="白色主题" defaultChecked onChange={handleSwitchOnChange} />,
        key: 'themeSetting',
        icon: <SettingOutlined />,
      }
    ]} />
  );

  return (
    <>
      <div className="btngroud">
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button style={{ marginRight: '10px' }}> 文件 </Button>
        </Dropdown>
      </div>

      <div className='idearea'>
        <Editor
          width={"100%"}
          height={"79vh"}
          language={languageType}
          value={code}
          theme={themeType}
          onMount={handleEditorDidMount}
          options={{ fontSize: 16, lineHeight: 30 }}
        />
      </div>
    </>
  );
};

export default Webide;
