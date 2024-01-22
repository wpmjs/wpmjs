import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.6ce6cb1b.js";const F=JSON.parse('{"title":"上传远程npm包","description":"","frontmatter":{},"headers":[],"relativePath":"guide/upload-remote.md","filePath":"guide/upload-remote.md","lastUpdated":1704707355000}'),l={name:"guide/upload-remote.md"},o=p(`<h1 id="上传远程npm包" tabindex="-1">上传远程npm包 <a class="header-anchor" href="#上传远程npm包" aria-label="Permalink to &quot;上传远程npm包&quot;">​</a></h1><p>上传方式与普通npm包无异, 正常通过npm publish对npm或私有源进行上传即可</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><ol><li>需要暴露至少一个模块规范为umd、amd、system、module-federation其中一种的入口文件</li><li>如果当前要上传的模块需要使用其他远程模块, 可以通过各构件工具的externals或module-federation的remotes、shared来声明不要将这些远程依赖打包进输出产物中</li></ol></div><h2 id="上传umd包" tabindex="-1">上传umd包 <a class="header-anchor" href="#上传umd包" aria-label="Permalink to &quot;上传umd包&quot;">​</a></h2><p>下面是一个简单的umd包webpack配置示例, 设置externals将react、react-dom外置, wpmjs会自动处理remotes和shared以及umd的依赖共享</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;path&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  entry: </span><span style="color:#9ECBFF;">&quot;src/index.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&quot;./dist&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    filename: </span><span style="color:#9ECBFF;">&quot;./index.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    library: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      name: </span><span style="color:#9ECBFF;">&quot;umdName&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: </span><span style="color:#9ECBFF;">&quot;umd&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  externals: [</span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;react-dom&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">path</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;path&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  entry: </span><span style="color:#032F62;">&quot;src/index.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  output: {</span></span>
<span class="line"><span style="color:#24292E;">    path: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&quot;./dist&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    filename: </span><span style="color:#032F62;">&quot;./index.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    library: {</span></span>
<span class="line"><span style="color:#24292E;">      name: </span><span style="color:#032F62;">&quot;umdName&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      type: </span><span style="color:#032F62;">&quot;umd&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  externals: [</span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;react-dom&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="上传module-federation包" tabindex="-1">上传module-federation包 <a class="header-anchor" href="#上传module-federation包" aria-label="Permalink to &quot;上传module-federation包&quot;">​</a></h2><p>下面是一个简单的module-federation包webpack配置示例, 可以设置remotes和shared声明外部模块或共享模块, npm-federation插件会自动处理remotes和shared以及umd的依赖共享</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">NpmFederation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;npm-federation&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  entry: </span><span style="color:#9ECBFF;">&quot;src/index.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&quot;./dist&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    filename: </span><span style="color:#9ECBFF;">&quot;./index.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NpmFederation</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 设置域名</span></span>
<span class="line"><span style="color:#E1E4E8;">      baseUrl: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;react-dom&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;react-dom/umd/react-dom.development.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      shared: {react: {}},</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 拥有name和filename属性会自动将本地端口上报到websocket中</span></span>
<span class="line"><span style="color:#E1E4E8;">      filename: </span><span style="color:#9ECBFF;">&quot;remoteEntry.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      name: </span><span style="color:#9ECBFF;">&quot;remoteApp&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      exposes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;./App&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./src/App&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">NpmFederation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;npm-federation&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  entry: </span><span style="color:#032F62;">&quot;src/index.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  output: {</span></span>
<span class="line"><span style="color:#24292E;">    path: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&quot;./dist&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    filename: </span><span style="color:#032F62;">&quot;./index.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NpmFederation</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 设置域名</span></span>
<span class="line"><span style="color:#24292E;">      baseUrl: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      remotes: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;react-dom&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;react-dom/umd/react-dom.development.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      shared: {react: {}},</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 拥有name和filename属性会自动将本地端口上报到websocket中</span></span>
<span class="line"><span style="color:#24292E;">      filename: </span><span style="color:#032F62;">&quot;remoteEntry.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      name: </span><span style="color:#032F62;">&quot;remoteApp&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      exposes: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;./App&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./src/App&quot;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="开发-调试" tabindex="-1">开发&amp;调试 <a class="header-anchor" href="#开发-调试" aria-label="Permalink to &quot;开发&amp;调试&quot;">​</a></h2><p>如果这个包需要能够线上和本地服务能够<a href="./debug-panel.html#connect">一键切换</a>, 则需要将本地服务的端口上报到websocket服务中。可以通过npm-federation或webpack-port-collector插件实现</p><ul><li>方式1, webpack-port-collector插件 webpack-port-collector插件会收集本地启动的dev-server端口上报到websocket服务中, 给调试面板使用</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Port</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;webpack-port-collector&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  entry: </span><span style="color:#9ECBFF;">&quot;src/index.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    path: path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&quot;./dist&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    filename: </span><span style="color:#9ECBFF;">&quot;./index.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Port</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      projectName:</span><span style="color:#9ECBFF;">&#39;remoteApp&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      filename: </span><span style="color:#9ECBFF;">&quot;remoteEntry.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Port</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;webpack-port-collector&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  entry: </span><span style="color:#032F62;">&quot;src/index.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  output: {</span></span>
<span class="line"><span style="color:#24292E;">    path: path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&quot;./dist&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    filename: </span><span style="color:#032F62;">&quot;./index.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Port</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      projectName:</span><span style="color:#032F62;">&#39;remoteApp&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      filename: </span><span style="color:#032F62;">&quot;remoteEntry.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>方式2, npm-federation插件会自动处理remotes和shared以及umd的依赖共享, 还会自动将设置了name、filename的模块的端口上报供调试面板使用</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">NpmFederation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;npm-federation&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NpmFederation</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 拥有name和filename属性会自动将本地端口上报到websocket中</span></span>
<span class="line"><span style="color:#E1E4E8;">      filename: </span><span style="color:#9ECBFF;">&quot;remoteEntry.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      name: </span><span style="color:#9ECBFF;">&quot;remoteApp&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      exposes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;./App&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;./src/App&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">NpmFederation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;npm-federation&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  plugins: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NpmFederation</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 拥有name和filename属性会自动将本地端口上报到websocket中</span></span>
<span class="line"><span style="color:#24292E;">      filename: </span><span style="color:#032F62;">&quot;remoteEntry.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      name: </span><span style="color:#032F62;">&quot;remoteApp&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      exposes: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;./App&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./src/App&quot;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,15),e=[o];function t(c,r,E,y,i,u){return n(),a("div",null,e)}const m=s(l,[["render",t]]);export{F as __pageData,m as default};
