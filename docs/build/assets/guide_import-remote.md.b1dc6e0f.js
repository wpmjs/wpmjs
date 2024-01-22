import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.6ce6cb1b.js";const F=JSON.parse('{"title":"使用远程npm包","description":"","frontmatter":{},"headers":[],"relativePath":"guide/import-remote.md","filePath":"guide/import-remote.md","lastUpdated":1704707355000}'),l={name:"guide/import-remote.md"},o=p(`<h1 id="使用远程npm包" tabindex="-1">使用远程npm包 <a class="header-anchor" href="#使用远程npm包" aria-label="Permalink to &quot;使用远程npm包&quot;">​</a></h1><p>npm-federatio是wpmjs配套的webpack插件, 它的参数会透传给wpmjs</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>要通过插件使用远程npm包需要遵循module-federation的方式对源码的入口文件进行一步简单改造（详看: bootstrap）</p></div><h2 id="使用远程umd包" tabindex="-1">使用远程umd包 <a class="header-anchor" href="#使用远程umd包" aria-label="Permalink to &quot;使用远程umd包&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> remoteReact </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react&quot;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> remoteReactDom </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react-dom&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> remoteReact </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react&quot;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> remoteReactDom </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react-dom&quot;</span></span></code></pre></div><ul><li>方式一, 使用jsdelivr作为源</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">NpmFederation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;npm-federation&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NpmFederation</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 设置域名</span></span>
<span class="line"><span style="color:#E1E4E8;">  baseUrl: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 设置npm包path</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react-dom&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;react-dom/umd/react-dom.development.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;react/umd/react.development.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">NpmFederation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;npm-federation&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NpmFederation</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 设置域名</span></span>
<span class="line"><span style="color:#24292E;">  baseUrl: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  remotes: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 设置npm包path</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react-dom&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;react-dom/umd/react-dom.development.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;react/umd/react.development.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><ul><li>方式2, 使用url作为源</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">NpmFederation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;npm-federation&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NpmFederation</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react-dom&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.development.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm/react/umd/react.development.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">NpmFederation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;npm-federation&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NpmFederation</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  remotes: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react-dom&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.development.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm/react/umd/react.development.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="使用远程umd多入口包" tabindex="-1">使用远程umd多入口包 <a class="header-anchor" href="#使用远程umd多入口包" aria-label="Permalink to &quot;使用远程umd多入口包&quot;">​</a></h2><p>大型umd模块需要自己暴露多入口进行懒加载, 下面例如我们自己上传一个umd的react模块, 对其useState、useEffect拆分成多个入口（chunk）进行懒加载</p><p>remote-react:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useState</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./useState&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useEffect</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./useEffect&quot;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useState</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./useState&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useEffect</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./useEffect&quot;</span><span style="color:#24292E;">)</span></span></code></pre></div><p>host-app:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">NpmFederation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;npm-federation&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NpmFederation</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://xx.com/react/dist/index.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">NpmFederation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;npm-federation&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NpmFederation</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  remotes: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://xx.com/react/dist/index.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ModuleA </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react/useState&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 加载react.js, react-chunk1.js</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ModuleB </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react/useEffect&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 加载react-chunk2.js</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ModuleA </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react/useState&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 加载react.js, react-chunk1.js</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ModuleB </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react/useEffect&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 加载react-chunk2.js</span></span></code></pre></div><h2 id="使用远程system包" tabindex="-1">使用远程system包 <a class="header-anchor" href="#使用远程system包" aria-label="Permalink to &quot;使用远程system包&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> remoteReact </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react&quot;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> remoteReactDom </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react-dom&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> remoteReact </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react&quot;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> remoteReactDom </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react-dom&quot;</span></span></code></pre></div><ul><li>方式一, 使用jsdelivr作为源</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">NpmFederation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;npm-federation&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NpmFederation</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 设置域名</span></span>
<span class="line"><span style="color:#E1E4E8;">  baseUrl: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 设置npm包path</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react-dom&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;react-dom/umd/react-dom.development.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;react/umd/react.development.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">NpmFederation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;npm-federation&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NpmFederation</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 设置域名</span></span>
<span class="line"><span style="color:#24292E;">  baseUrl: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  remotes: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 设置npm包path</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react-dom&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;react-dom/umd/react-dom.development.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;react/umd/react.development.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><ul><li>方式2, 使用url作为源</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">NpmFederation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;npm-federation&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NpmFederation</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react-dom&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.development.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm/react/umd/react.development.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">NpmFederation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;npm-federation&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NpmFederation</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  remotes: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react-dom&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.development.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm/react/umd/react.development.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="使用远程module-federation包" tabindex="-1">使用远程module-federation包 <a class="header-anchor" href="#使用远程module-federation包" aria-label="Permalink to &quot;使用远程module-federation包&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> App1 </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;mf-app-01/App&quot;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> App2 </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;mf-app-02/App&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> App1 </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;mf-app-01/App&quot;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> App2 </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;mf-app-02/App&quot;</span></span></code></pre></div><ul><li>方式一, 使用jsdelivr作为源</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">NpmFederation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;npm-federation&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NpmFederation</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 设置域名</span></span>
<span class="line"><span style="color:#E1E4E8;">  baseUrl: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 设置npm包path</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;mf-app-01&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;mf-app-01/dist/remoteEntry.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;mf-app-02&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;mf-app-02/dist/remoteEntry.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">NpmFederation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;npm-federation&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NpmFederation</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 设置域名</span></span>
<span class="line"><span style="color:#24292E;">  baseUrl: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  remotes: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 设置npm包path</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;mf-app-01&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;mf-app-01/dist/remoteEntry.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;mf-app-02&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;mf-app-02/dist/remoteEntry.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><ul><li>方式2, 使用url作为源</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">NpmFederation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;npm-federation&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NpmFederation</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 设置域名</span></span>
<span class="line"><span style="color:#E1E4E8;">  remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 设置npm包path</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;mf-app-01&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm/mf-app-01/dist/remoteEntry.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;mf-app-02&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm/mf-app-02/dist/remoteEntry.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">NpmFederation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;npm-federation&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NpmFederation</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 设置域名</span></span>
<span class="line"><span style="color:#24292E;">  remotes: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 设置npm包path</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;mf-app-01&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm/mf-app-01/dist/remoteEntry.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;mf-app-02&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm/mf-app-02/dist/remoteEntry.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="使用远程json数据" tabindex="-1">使用远程json数据 <a class="header-anchor" href="#使用远程json数据" aria-label="Permalink to &quot;使用远程json数据&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> remoteJson </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;remoteJson&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> remoteJson </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;remoteJson&quot;</span></span></code></pre></div><ul><li>方式一, 使用统一域名</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">NpmFederation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;npm-federation&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NpmFederation</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 设置域名</span></span>
<span class="line"><span style="color:#E1E4E8;">  baseUrl: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 设置npm包path</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;remoteJson&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      moduleType: </span><span style="color:#9ECBFF;">&quot;json&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      packageFilename: </span><span style="color:#9ECBFF;">&quot;react/package.json&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">NpmFederation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;npm-federation&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NpmFederation</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 设置域名</span></span>
<span class="line"><span style="color:#24292E;">  baseUrl: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  remotes: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 设置npm包path</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;remoteJson&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      moduleType: </span><span style="color:#032F62;">&quot;json&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      packageFilename: </span><span style="color:#032F62;">&quot;react/package.json&quot;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><ul><li>方式2, 使用url作为源</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">NpmFederation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;npm-federation&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NpmFederation</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;remoteJson&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      moduleType: </span><span style="color:#9ECBFF;">&quot;json&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      url: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm/react/package.json&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">NpmFederation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;npm-federation&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NpmFederation</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  remotes: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;remoteJson&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      moduleType: </span><span style="color:#032F62;">&quot;json&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      url: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm/react/package.json&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="自定义模块源url" tabindex="-1">自定义模块源url <a class="header-anchor" href="#自定义模块源url" aria-label="Permalink to &quot;自定义模块源url&quot;">​</a></h2><p>如果你并非通过npm而是自行上传资源通过cdn访问, 可以通过重写各模块的加载器, 自定义请求的url的规则</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">NpmFederation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;npm-federation&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NpmFederation</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  initial: </span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">    console.log(&quot;Inject code wpmjsInstance&quot;, wpmjs)</span></span>
<span class="line"><span style="color:#9ECBFF;">    wpmjs.registerLoader({</span></span>
<span class="line"><span style="color:#9ECBFF;">      moduleType: &quot;system&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      resolveUrl({}) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">      }</span></span>
<span class="line"><span style="color:#9ECBFF;">    })</span></span>
<span class="line"><span style="color:#9ECBFF;">    wpmjs.registerLoader({</span></span>
<span class="line"><span style="color:#9ECBFF;">      moduleType: &quot;mf&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      resolveUrl({}) {</span></span>
<span class="line"><span style="color:#9ECBFF;">        </span></span>
<span class="line"><span style="color:#9ECBFF;">      }</span></span>
<span class="line"><span style="color:#9ECBFF;">    })</span></span>
<span class="line"><span style="color:#9ECBFF;">    \`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  baseUrl: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;@remix-run/router&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;@remix-run/router/dist/router.umd.min.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;mf-app-02&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      package: </span><span style="color:#9ECBFF;">&quot;mf-app-02/dist/remoteEntry.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      global: </span><span style="color:#9ECBFF;">&quot;mfapp02&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">NpmFederation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;npm-federation&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NpmFederation</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  initial: </span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">    console.log(&quot;Inject code wpmjsInstance&quot;, wpmjs)</span></span>
<span class="line"><span style="color:#032F62;">    wpmjs.registerLoader({</span></span>
<span class="line"><span style="color:#032F62;">      moduleType: &quot;system&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      resolveUrl({}) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">      }</span></span>
<span class="line"><span style="color:#032F62;">    })</span></span>
<span class="line"><span style="color:#032F62;">    wpmjs.registerLoader({</span></span>
<span class="line"><span style="color:#032F62;">      moduleType: &quot;mf&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      resolveUrl({}) {</span></span>
<span class="line"><span style="color:#032F62;">        </span></span>
<span class="line"><span style="color:#032F62;">      }</span></span>
<span class="line"><span style="color:#032F62;">    })</span></span>
<span class="line"><span style="color:#032F62;">    \`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  baseUrl: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  remotes: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;@remix-run/router&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;@remix-run/router/dist/router.umd.min.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;mf-app-02&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      package: </span><span style="color:#032F62;">&quot;mf-app-02/dist/remoteEntry.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      global: </span><span style="color:#032F62;">&quot;mfapp02&quot;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="运行时api" tabindex="-1">运行时API <a class="header-anchor" href="#运行时api" aria-label="Permalink to &quot;运行时API&quot;">​</a></h2><p>除了使用npm-federation插件, 还可以使用运行时api引入远程模块, 与插件的api一致。</p><p>插件的remotes为wpmjs.addImportMap(), 插件的baseUrl为wpmjs.setConfig({baseUrl})。</p><p>例, 使用远程umd模块:</p><ul><li>方式一, 使用jsdelivr作为源</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">wpmjs.</span><span style="color:#B392F0;">setConfig</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 设置域名</span></span>
<span class="line"><span style="color:#E1E4E8;">  baseUrl: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">wpmjs.</span><span style="color:#B392F0;">addImportMap</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 设置npm包path</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react-dom&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;react-dom/umd/react-dom.development.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;react/umd/react.development.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> wpmjs.</span><span style="color:#B392F0;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;react-dom&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> wpmjs.</span><span style="color:#B392F0;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">wpmjs.</span><span style="color:#6F42C1;">setConfig</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 设置域名</span></span>
<span class="line"><span style="color:#24292E;">  baseUrl: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">wpmjs.</span><span style="color:#6F42C1;">addImportMap</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  remotes: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 设置npm包path</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react-dom&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;react-dom/umd/react-dom.development.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;react/umd/react.development.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#D73A49;">await</span><span style="color:#24292E;"> wpmjs.</span><span style="color:#6F42C1;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;react-dom&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">await</span><span style="color:#24292E;"> wpmjs.</span><span style="color:#6F42C1;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">)</span></span></code></pre></div><ul><li>方式2, 使用url作为源</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">wpmjs.</span><span style="color:#B392F0;">addImportMap</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react-dom&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.development.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm/react/umd/react.development.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> wpmjs.</span><span style="color:#B392F0;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;react-dom&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> wpmjs.</span><span style="color:#B392F0;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">wpmjs.</span><span style="color:#6F42C1;">addImportMap</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  remotes: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react-dom&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.development.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm/react/umd/react.development.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#D73A49;">await</span><span style="color:#24292E;"> wpmjs.</span><span style="color:#6F42C1;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;react-dom&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">await</span><span style="color:#24292E;"> wpmjs.</span><span style="color:#6F42C1;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">)</span></span></code></pre></div><h2 id="版本配置化" tabindex="-1">版本配置化 <a class="header-anchor" href="#版本配置化" aria-label="Permalink to &quot;版本配置化&quot;">​</a></h2><p>远程模块的版本可以动态配置, 例如可以通过读取一个远程返回的json数据来决定加载模块的版本:</p><ul><li>方式1, 异步获取远程版本配置, 使用wpmjs.sleep() :</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NpmFederation</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 注入代码</span></span>
<span class="line"><span style="color:#E1E4E8;">  initial: </span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">    wpmjs.sleep(new Promise(resolve =&gt; {</span></span>
<span class="line"><span style="color:#9ECBFF;">      fetch(&quot;http://xxx.json&quot;).then(json =&gt; {</span></span>
<span class="line"><span style="color:#9ECBFF;">        // 注册</span></span>
<span class="line"><span style="color:#9ECBFF;">        wpmjs.addImportMap({</span></span>
<span class="line"><span style="color:#9ECBFF;">          react: {packageVersion: json.react},</span></span>
<span class="line"><span style="color:#9ECBFF;">          antd: {packageVersion: json.antd}</span></span>
<span class="line"><span style="color:#9ECBFF;">        })</span></span>
<span class="line"><span style="color:#9ECBFF;">        resolve()</span></span>
<span class="line"><span style="color:#9ECBFF;">      })</span></span>
<span class="line"><span style="color:#9ECBFF;">    }))</span></span>
<span class="line"><span style="color:#9ECBFF;">  \`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react-dom&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;react-dom/umd/react-dom.development.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;react/umd/react.development.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NpmFederation</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 注入代码</span></span>
<span class="line"><span style="color:#24292E;">  initial: </span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">    wpmjs.sleep(new Promise(resolve =&gt; {</span></span>
<span class="line"><span style="color:#032F62;">      fetch(&quot;http://xxx.json&quot;).then(json =&gt; {</span></span>
<span class="line"><span style="color:#032F62;">        // 注册</span></span>
<span class="line"><span style="color:#032F62;">        wpmjs.addImportMap({</span></span>
<span class="line"><span style="color:#032F62;">          react: {packageVersion: json.react},</span></span>
<span class="line"><span style="color:#032F62;">          antd: {packageVersion: json.antd}</span></span>
<span class="line"><span style="color:#032F62;">        })</span></span>
<span class="line"><span style="color:#032F62;">        resolve()</span></span>
<span class="line"><span style="color:#032F62;">      })</span></span>
<span class="line"><span style="color:#032F62;">    }))</span></span>
<span class="line"><span style="color:#032F62;">  \`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  remotes: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react-dom&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;react-dom/umd/react-dom.development.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;react/umd/react.development.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><ul><li>方式2, 通过ssr或注入等方式在页面响应时返回版本配置</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">wpmjs.</span><span style="color:#B392F0;">addImportMap</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  initial: </span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">  wpmjs.addImportMap({</span></span>
<span class="line"><span style="color:#9ECBFF;">    react: {packageVersion: window.$json.react},</span></span>
<span class="line"><span style="color:#9ECBFF;">    react: {packageVersion: window.$json.reactDom},</span></span>
<span class="line"><span style="color:#9ECBFF;">  })</span></span>
<span class="line"><span style="color:#9ECBFF;">  \`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react-dom&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.development.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm/react/umd/react.development.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">wpmjs.</span><span style="color:#6F42C1;">addImportMap</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  initial: </span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">  wpmjs.addImportMap({</span></span>
<span class="line"><span style="color:#032F62;">    react: {packageVersion: window.$json.react},</span></span>
<span class="line"><span style="color:#032F62;">    react: {packageVersion: window.$json.reactDom},</span></span>
<span class="line"><span style="color:#032F62;">  })</span></span>
<span class="line"><span style="color:#032F62;">  \`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  remotes: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react-dom&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.development.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm/react/umd/react.development.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div>`,51),e=[o];function t(c,r,E,y,i,d){return n(),a("div",null,e)}const m=s(l,[["render",t]]);export{F as __pageData,m as default};
