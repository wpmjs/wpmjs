import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.6ce6cb1b.js";const d=JSON.parse('{"title":"插件API","description":"","frontmatter":{},"headers":[],"relativePath":"api/plugin.md","filePath":"api/plugin.md","lastUpdated":1704707355000}'),l={name:"api/plugin.md"},o=p(`<h1 id="插件api" tabindex="-1">插件API <a class="header-anchor" href="#插件api" aria-label="Permalink to &quot;插件API&quot;">​</a></h1><h3 id="set-npm-package-url" tabindex="-1">set npm package url <a class="header-anchor" href="#set-npm-package-url" aria-label="Permalink to &quot;set npm package url&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">NPMFederation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;npm-federation&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NPMFederation</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;@remix-run/router&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm/@remix-run/router@1.0.3/dist/router.umd.min.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;mf-app-02&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;mfapp02@https://cdn.jsdelivr.net/npm/mf-app-02@latest/dist/remoteEntry.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  shared: {react: {}}</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">NPMFederation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;npm-federation&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NPMFederation</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  remotes: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;@remix-run/router&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm/@remix-run/router@1.0.3/dist/router.umd.min.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;mf-app-02&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;mfapp02@https://cdn.jsdelivr.net/npm/mf-app-02@latest/dist/remoteEntry.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  shared: {react: {}}</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h3 id="set-npm-package-path" tabindex="-1">Set npm package path <a class="header-anchor" href="#set-npm-package-path" aria-label="Permalink to &quot;Set npm package path&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">NPMFederation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;npm-federation&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NPMFederation</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  baseUrl: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;@remix-run/router&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;@remix-run/router@1.0.3/dist/router.umd.min.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;mf-app-02&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      package: </span><span style="color:#9ECBFF;">&quot;mf-app-02@latest/dist/remoteEntry.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      global: </span><span style="color:#9ECBFF;">&quot;mfapp02&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  shared: {react: {}}</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">NPMFederation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;npm-federation&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NPMFederation</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  baseUrl: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  remotes: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;@remix-run/router&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;@remix-run/router@1.0.3/dist/router.umd.min.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;mf-app-02&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      package: </span><span style="color:#032F62;">&quot;mf-app-02@latest/dist/remoteEntry.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      global: </span><span style="color:#032F62;">&quot;mfapp02&quot;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  shared: {react: {}}</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h3 id="dynamically-set-npm-package-version-at-runtime" tabindex="-1">Dynamically set npm package version at runtime <a class="header-anchor" href="#dynamically-set-npm-package-version-at-runtime" aria-label="Permalink to &quot;Dynamically set npm package version at runtime&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">NPMFederation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;npm-federation&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NPMFederation</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  initial: </span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">    console.log(&quot;Inject code wpmjsInstance&quot;, wpmjs)</span></span>
<span class="line"><span style="color:#9ECBFF;">    wpmjs.sleep(new Promise(resolve =&gt; {</span></span>
<span class="line"><span style="color:#9ECBFF;">      // fetch(&quot;https://xxxxx.json&quot;)</span></span>
<span class="line"><span style="color:#9ECBFF;">      const json = {</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;@remix-run/router&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">          packageVersion: &quot;1.9.0&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">        },</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;mf-app-02&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">          packageVersion: &quot;1.0.6&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">        }</span></span>
<span class="line"><span style="color:#9ECBFF;">      }</span></span>
<span class="line"><span style="color:#9ECBFF;">      console.log(&quot;Asynchronously obtain data and dynamically set the remotes version&quot;, json)</span></span>
<span class="line"><span style="color:#9ECBFF;">      wpmjs.addImportMap(json)</span></span>
<span class="line"><span style="color:#9ECBFF;">      resolve()</span></span>
<span class="line"><span style="color:#9ECBFF;">    }))\`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  baseUrl: </span><span style="color:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  remotes: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;@remix-run/router&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;@remix-run/router/dist/router.umd.min.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;mf-app-02&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      package: </span><span style="color:#9ECBFF;">&quot;mf-app-02/dist/remoteEntry.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      global: </span><span style="color:#9ECBFF;">&quot;mfapp02&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  shared: {react: {}}</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">NPMFederation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;npm-federation&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NPMFederation</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  initial: </span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">    console.log(&quot;Inject code wpmjsInstance&quot;, wpmjs)</span></span>
<span class="line"><span style="color:#032F62;">    wpmjs.sleep(new Promise(resolve =&gt; {</span></span>
<span class="line"><span style="color:#032F62;">      // fetch(&quot;https://xxxxx.json&quot;)</span></span>
<span class="line"><span style="color:#032F62;">      const json = {</span></span>
<span class="line"><span style="color:#032F62;">        &quot;@remix-run/router&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">          packageVersion: &quot;1.9.0&quot;</span></span>
<span class="line"><span style="color:#032F62;">        },</span></span>
<span class="line"><span style="color:#032F62;">        &quot;mf-app-02&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">          packageVersion: &quot;1.0.6&quot;</span></span>
<span class="line"><span style="color:#032F62;">        }</span></span>
<span class="line"><span style="color:#032F62;">      }</span></span>
<span class="line"><span style="color:#032F62;">      console.log(&quot;Asynchronously obtain data and dynamically set the remotes version&quot;, json)</span></span>
<span class="line"><span style="color:#032F62;">      wpmjs.addImportMap(json)</span></span>
<span class="line"><span style="color:#032F62;">      resolve()</span></span>
<span class="line"><span style="color:#032F62;">    }))\`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  baseUrl: </span><span style="color:#032F62;">&quot;https://cdn.jsdelivr.net/npm&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  remotes: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;@remix-run/router&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;@remix-run/router/dist/router.umd.min.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;mf-app-02&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      package: </span><span style="color:#032F62;">&quot;mf-app-02/dist/remoteEntry.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      global: </span><span style="color:#032F62;">&quot;mfapp02&quot;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  shared: {react: {}}</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div>`,7),e=[o];function t(r,c,E,i,y,u){return n(),a("div",null,e)}const m=s(l,[["render",t]]);export{d as __pageData,m as default};
