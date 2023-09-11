import React, {useEffect, useState, lazy, Suspense} from 'react';
import Tabs from 'antd/es/Tabs'; // 加载 JS
import 'antd/es/Tabs/style/css'; // 加载 CSS
import Button from 'antd/es/Button'; // 加载 JS
import 'antd/es/Button/style/css'; // 加载 CSS
import Icon from 'antd/es/Icon'; // 加载 JS
import 'antd/es/Icon/style/css'; // 加载 CSS
import Switch from 'antd/es/Switch'; // 加载 JS
import 'antd/es/Switch/style/css'; // 加载 CSS
import parseURLQuery from './parseURLQuery';
import './DevelopPanel.less';
import {SettingTwoTone} from "@ant-design/icons"

const { TabPane } = Tabs

const PreviewComp = lazy(async () => window.wpmjs.import("cosmos-kraken-preview").then(e => e.default()))

const AsyncPreviewComp = props => <Suspense fallback={<div>loading...</div>}>
  <PreviewComp {...props} />
</Suspense>

// const AsyncPreviewComp = () => 111

const queryMap = parseURLQuery();
let ws = null
let wsConnected = false;
try {
  const queryDebugMap = JSON.parse(decodeURIComponent(queryMap.wpmDebugMap || ""))
  localStorage.setItem('wpm-debug-map', JSON.stringify({
    ...getDebugMap(),
    ...(queryDebugMap || {})
  }));
  const activePkgMap = getActiveMap()
  Object.keys(queryDebugMap).forEach(key => {
    activePkgMap[key] = true
  })
  localStorage.setItem('wpm-activePkgMap', JSON.stringify(activePkgMap));
} catch (e) {
}

function getPkgInfo(pkgname) {
  var {
    1: name,
    5: version = 'latest',
    6: entry = "",
    9: query = ""
  } = pkgname.match(/^((@[_\-A-Za-z\d]+\/)?([_\-A-Za-z\d]+))(@(.+?))?(\/([_\-A-Za-z\d/]+))?(\?(.+?))?$/) || []
  return {
    entry,
    name,
    version,
    query
  }
}

function getDebugMap() {
  try {
    return JSON.parse(localStorage.getItem("wpm-debug-map") || "{}")
  } catch (e) {
    return {}
  }
}

function getActiveMap() {
  try {
    return JSON.parse(localStorage.getItem("wpm-activePkgMap") || "{}")
  } catch (e) {
    return {}
  }
}

// function Switch(props) {
//   const {onChange, display} = props;
//   return (
//     <span
//       className="wpm-switch"
//       style={{position: "relative", top: 10, right: 5, background: display ? '#ccc' : '#2f2'}}
//       onClick={() => onChange(display)}
//     />
//   )
// }

function ArouseButton(props) {
  return (
    <div className="arouse-button" style={{padding: 10}} onClick={props.onClick}>
      <SettingTwoTone className="icon" />
      <span style={{paddingTop: 8}}>W</span>
      <span style={{paddingTop: 5}}>P</span>
      <span style={{paddingTop: 5}}>M</span>
    </div>
  )
}

function PackageListItem(props) {
  const {display, onChange, name, url} = props;
  return (
    <li className="package-list-item">
      <div className='switch-area'>
        <Switch size="small" checked={!display} onChange={onChange}/>
        <span className='text'>
          {name}
        </span>
      </div>
      <div className="pack-url">{url}</div>
    </li>
  )
}

function EditMap() {
  return (
    <div>切换版本</div>
  )
}

function Panel(props) {
  const storageShowPanel = localStorage.getItem("wpm-dev-panel-default-show")
  const queryParamShowPanel = queryMap["defaultPlugin"]
  console.log("storage value: ", storageShowPanel, queryParamShowPanel)
  const {onAdd, onPackUp, onChange, onClose, activePkgMap, pkgList} = props;

  const [curShowPanel, setCurShowPanel] = useState(storageShowPanel || queryParamShowPanel || "local")

  const switchPanelType = type => {
    localStorage.setItem("wpm-dev-panel-default-show", type)
    // 切换逻辑
    setCurShowPanel(type)
  }


  const LocalPanel = () => <div className="local-panel">
  <ul className="package-list">
    {
      pkgList.length ?
        pkgList.map(item => {
          const {name, url} = item;
          return (
            <PackageListItem
              key={name}
              name={name}
              url={url}
              display={!activePkgMap[name]}
              onChange={display => {
                onChange({...activePkgMap, [name]: display})
              }}
            />
          )
        })
        : (
          <div style={{textAlign: 'center', padding: 20, color: '#aaa'}}>
            <div>暂无wpm调试项目</div>
            {/*<div style={{color:'red'}}>未如期出现调试包，请更新wpm-webpack-plugin</div>*/}
            {/*<div style={{color:'red'}}>【改用socket传输】</div>*/}
          </div>
        )
    }
  </ul>
  </div> 

  return (
    <div className="panel">
      <Tabs
        size="small"
        activeKey={curShowPanel}
        onChange={ key => switchPanelType(key) }
      >
        <TabPane tab="connect" key="connect">
          <LocalPanel />
        </TabPane>
        {/* <TabPane tab="preview" key="preview">
          <AsyncPreviewComp connectorList={pkgList} localStorage={localStorage} />
        </TabPane> */}
      </Tabs>
      <div className="panel-foot">
        <Button className="refresh-button" type="link" onClick={onClose}>退出</Button>
        {/* <Button className="refresh-button" type="link" onClick={onAdd}>配置</Button> */}
        <Button className="pack-up-button" type="link" onClick={onPackUp}>收起</Button>
      </div>
    </div>
  )
}

function Main() {
  const [display, setDisplay] = useState(true);
  const [count, setCount] = useState(1);

  const wpmDebugURL = localStorage.getItem('wpm-debug-url');
  const [pkgList, setPkgList] = useState(JSON.parse(localStorage.getItem('wpm-pkgList')) || []);
  function updatePkgList() {
    const wpmDebugMap = getDebugMap()
    const list = JSON.parse(localStorage.getItem('wpm-pkgList'))
    const mapList = Object.keys(wpmDebugMap).map(name => {
      return {
        name,
        url: wpmDebugMap[name]
      }
    })
    setPkgList([...list, ...mapList])
  }
  let activePkgMap = JSON.parse(localStorage.getItem('wpm-activePkgMap')) || {};

  // async function getPkgList() {
  //   try {
  //     const wpmDebugMap = getDebugMap()
  //     const mapList = Object.keys(wpmDebugMap).map(name => {
  //       return {
  //         name,
  //         url: wpmDebugMap[name]
  //       }
  //     })
  //     let data = []
  //     try {
  //       const res = await fetch(wpmDebugURL + '/list').then(res => res.json());
  //       data = res.data || []
  //     } catch (e) {
  //       console.log(e)
  //     }
  //     localStorage.setItem('wpm_pkgList', JSON.stringify(data));
  //     setPkgList([...data, ...mapList])
  //     setCount(count + 1)
  //   } catch (error) {
  //     console.error(`${wpmDebugURL}下没有启动任何WPM项目`);
  //   }
  // }

  let prevTimeoutId = null

  function panelHandleChange(activePkgMap) {
    localStorage.setItem('wpm-activePkgMap', JSON.stringify(activePkgMap));
    setCount(count + 1);
    clearTimeout(prevTimeoutId)
    window.location.reload();
  }

  function handleClose() {
    const keys = Object.keys(queryMap).filter(k => k !== 'wpmDebug');
    const query = keys.length ? '?' + keys.map(k => `${k}=${queryMap[k]}`).join('&') : '';

    localStorage.removeItem('wpm-debug-open');
    window.location.href = window.location.href.replace(/\?[^\#]+/, query);
  }

  function initWS(){
    ws = new WebSocket('ws://localhost:9120');
    ws.onopen = function () {
      console.log('dev panel ws connected');
      wsConnected = true;
    }
    ws.onmessage = function(event) {
      const data = event.data;
      try {
        const {type, list=[]} = JSON.parse(data);
        if (type === 'change'){
          const wpmDebugMap = getDebugMap()
          const mapList = Object.keys(wpmDebugMap).map(name => {
            return {
              name,
              url: wpmDebugMap[name]
            }
          })
          localStorage.setItem('wpm-pkgList', JSON.stringify(list));
          updatePkgList()
        }
      }catch (e){
        console.log('dev panel error->',e)
      }
    };
  }

  function askLatestList(){
    if (wsConnected){ //如果有连接成功，可以在server反馈最新包的时候合并，否则则自己合并一下
      ws.send('give me latest list');
    }else{
      updatePkgList()
    }
  }

  useEffect(() => {
    // getPkgList();
    // setInterval(() => {
    //   getPkgList();
    // }, 5000)
    initWS()
  }, []);

  return (
    <div className="wpmjs-develop-panel">
      <div className={ `root ${display ? 'panel-show' : 'panel-hidden'}` }>
      {
        display
          ? <Panel
            activePkgMap={activePkgMap}
            pkgList={pkgList}
            onPackUp={() => setDisplay(false)}
            onChange={panelHandleChange}
            onClose={handleClose}
            onAdd={() => {
              const res = prompt("请配置包版本（添加配置: vue@latest; 删除配置: vue）", "")
              const {name} = getPkgInfo(res)
              const map = {
                ...getDebugMap(),
                [name]: res
              }
              if (name === res) {
                delete map[name]
              }
              localStorage.setItem("wpm-debug-map", JSON.stringify(map))
              askLatestList()
            }}
          />
          : <ArouseButton onClick={() => setDisplay(true)}/>
      }
    </div>
    </div>
  )
}

export default Main;
