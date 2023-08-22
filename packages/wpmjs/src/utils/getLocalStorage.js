/**
 * 在qiankun等微前端sandbox内, 需要跨微前端应用设置缓存
 * 借助iframe来跳出sandbox
 */
let _localStorage = localStorage
if (localStorage.getItem('wpm-debug-open') == 1) {
  if(!document.getElementById('wpm-iframe')) {
    const wpmIframe = document.createElement('iframe');
    
    wpmIframe.id = 'wpm-iframe';
    wpmIframe.style = 'display: none';
  
    document.body.appendChild(wpmIframe);
  }

  _localStorage = document.getElementById('wpm-iframe').contentWindow.localStorage;
}

export default _localStorage;
