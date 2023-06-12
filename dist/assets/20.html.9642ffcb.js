import{_ as c,r as o,o as d,c as r,a as n,b as e,w as l,e as s,d as i}from"./app.798d5e9d.js";const p={},u={href:"https://github.com/3293172751",target:"_blank",rel:"noopener noreferrer"},k=s("author"),v=n("h1",{id:"\u7B2C20\u8282-golang\u4E91\u539F\u751F\u90E8\u7F72",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u7B2C20\u8282-golang\u4E91\u539F\u751F\u90E8\u7F72","aria-hidden":"true"},"#"),s(" \u7B2C20\u8282 Golang\u4E91\u539F\u751F\u90E8\u7F72")],-1),m=s("\u56DE\u5230\u76EE\u5F55"),h=s("\u4E0A\u4E00\u8282"),b=s("\u2764\uFE0F\u{1F495}\u{1F495}Go\u8BED\u8A00\u9AD8\u7EA7\u7BC7\u7AE0,\u5728\u6B64\u4E4B\u524D\u5EFA\u8BAE\u60A8\u5148\u4E86\u89E3\u57FA\u7840\u548C\u8FDB\u9636\u7BC7\u3002Myblog:"),g={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},_=s("http://nsddd.top"),y={id:"go\u8BED\u8A00\u57FA\u7840\u7BC7",tabindex:"-1"},f=n("a",{class:"header-anchor",href:"#go\u8BED\u8A00\u57FA\u7840\u7BC7","aria-hidden":"true"},"#",-1),w=s(),x={href:"https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/TOC.md",target:"_blank",rel:"noopener noreferrer"},R=s("Go\u8BED\u8A00\u57FA\u7840\u7BC7"),P={id:"go\u8BED\u8A00100\u7BC7\u8FDB\u9636",tabindex:"-1"},N=n("a",{class:"header-anchor",href:"#go\u8BED\u8A00100\u7BC7\u8FDB\u9636","aria-hidden":"true"},"#",-1),O=s(),D={href:"https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/Gomd_super/README.md",target:"_blank",rel:"noopener noreferrer"},E=s("Go\u8BED\u8A00100\u7BC7\u8FDB\u9636"),q=i(`<hr><p>[TOC]</p><h2 id="\u5F00\u59CB" tabindex="-1"><a class="header-anchor" href="#\u5F00\u59CB" aria-hidden="true">#</a> \u5F00\u59CB</h2><p><strong>\u6211\u4EEC\u4F7F\u7528 <code>beego</code> \u6559\u7A0B\u4E2D\u5B66\u5230\u7684 <code>bee</code> \u547D\u4EE4\u6784\u5EFA\u4E00\u4E2A dockerfile\uFF0C\u5F53\u7136\u4E5F\u53EF\u4EE5\u81EA\u5DF1\u5199\uFF1A</strong></p><h3 id="dockerize-\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#dockerize-\u547D\u4EE4" aria-hidden="true">#</a> dockerize \u547D\u4EE4</h3><p>\u8FD9\u4E2A\u547D\u4EE4\u53EF\u4EE5\u901A\u8FC7\u751F\u6210<code>Dockerfile</code>\u6587\u4EF6\u6765\u5B9E\u73B0<code>docker</code>\u5316\u4F60\u7684\u5E94\u7528\u3002</p><p><strong>\u4F8B\u5B50:</strong></p><p>\u751F\u6210\u4E00\u4E2A\u4EE5<code>1.9.2</code>\u7248\u672CGo\u73AF\u5883\u4E3A\u57FA\u7840\u955C\u50CF\u7684Dockerfile,\u5E76\u66B4\u97329000\u7AEF\u53E3:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>bee dockerize -image=&quot;library/golang:1.9.2&quot; -expose=8080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u66F4\u591A\u5E2E\u52A9\u4FE1\u606F\u53EF\u6267\u884C<code>bee help dockerize</code>.</p><div class="custom-container tip"><p class="custom-container-title">\u6253\u5F00 dockerfile \u6587\u4EF6\uFF1A</p><div class="language-docker ext-docker line-numbers-mode"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> library/golang:1.9.2</span>

<span class="token comment"># Godep for vendoring</span>
<span class="token instruction"><span class="token keyword">RUN</span> go get github.com/tools/godep</span>

<span class="token comment"># Recompile the standard library without CGO</span>
<span class="token instruction"><span class="token keyword">RUN</span> CGO_ENABLED=0 go install -a std</span>

<span class="token instruction"><span class="token keyword">ENV</span> APP_DIR <span class="token variable">$GOPATHD</span>:\\\u6587\u6863\\\u6700\u8FD1\u7684\\awesome-golang\\docs\\code\\beego</span>
<span class="token instruction"><span class="token keyword">RUN</span> mkdir -p <span class="token variable">$APP_DIR</span></span>

<span class="token comment"># Set the entrypoint</span>
<span class="token instruction"><span class="token keyword">ENTRYPOINT</span> (cd <span class="token variable">$APP_DIR</span> &amp;&amp; ./D:\\\u6587\u6863\\\u6700\u8FD1\u7684\\awesome-golang\\docs\\code\\beego)</span>
<span class="token instruction"><span class="token keyword">ADD</span> . <span class="token variable">$APP_DIR</span></span>

<span class="token comment"># Compile the binary and statically link</span>
<span class="token instruction"><span class="token keyword">RUN</span> cd <span class="token variable">$APP_DIR</span> &amp;&amp; CGO_ENABLED=0 godep go build -ldflags <span class="token string">&#39;-d -w -s&#39;</span></span>

<span class="token instruction"><span class="token keyword">EXPOSE</span> 8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h4 id="\u90E8\u7F72dockerfile" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72dockerfile" aria-hidden="true">#</a> \u90E8\u7F72dockerfile</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker build -t mybeego:1.0 .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u65B9\u5F0F\u4E8C-\u6D4B\u8BD5\u9879\u76EE" tabindex="-1"><a class="header-anchor" href="#\u65B9\u5F0F\u4E8C-\u6D4B\u8BD5\u9879\u76EE" aria-hidden="true">#</a> \u65B9\u5F0F\u4E8C\uFF1A\u6D4B\u8BD5\u9879\u76EE</h2><p><strong>\u62C9\u53D6\u955C\u50CF\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> clone https://gitee.com/nickdemo/helloworld.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u6784\u5EFA\u955C\u50CF\uFF1A</strong></p>`,17),A={class:"custom-container tip"},G=i(`<p class="custom-container-title">\u63D0\u793A</p><ul><li><code>go env -w </code>\uFF1A\u8BBE\u7F6E\u955C\u50CF</li><li><code>WORKDIR</code>\uFF1A\u8BBE\u7F6E\u5DE5\u4F5C\u76EE\u5F55\uFF08\u6307\u5B9A\u521B\u5EFA\u5BB9\u5668\u540E\uFF0C\u7EC8\u7AEF <strong>\u9ED8\u8BA4\u767B\u9646\u8FDB\u6765\u7684\u5DE5\u4F5C\u76EE\u5F55</strong>\uFF09</li></ul><div class="language-docker ext-docker line-numbers-mode"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> golang:1.18</span>
<span class="token instruction"><span class="token keyword">ADD</span> ./ /go/src/helloworld/</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /go/src/helloworld</span>
<span class="token instruction"><span class="token keyword">RUN</span> go env -w GOPROXY=https://proxy.golang.com.cn,https://goproxy.cn,direct</span>
<span class="token instruction"><span class="token keyword">RUN</span> CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o app .</span>

<span class="token instruction"><span class="token keyword">FROM</span> alpine:latest</span>
<span class="token instruction"><span class="token keyword">ENV</span> env1=env1value</span>
<span class="token instruction"><span class="token keyword">ENV</span> env2=env2value</span>
<span class="token instruction"><span class="token keyword">MAINTAINER</span> nick</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /app/</span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">0</span></span> /go/src/helloworld/app ./</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 80</span>
<span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">&quot;./app&quot;</span>]</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;--param1=p1&quot;</span>,<span class="token string">&quot;--param2=p2&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u90E8\u7F72dockerfile-1" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72dockerfile-1" aria-hidden="true">#</a> \u90E8\u7F72dockerfile</h4><ul><li><code>\u2013no-cache</code>\uFF1A\u4E0D\u4F7F\u7528\u7F13\u5B58</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker build -t helloworld:1.0 .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u63A8\u9001\u955C\u50CF" tabindex="-1"><a class="header-anchor" href="#\u63A8\u9001\u955C\u50CF" aria-hidden="true">#</a> \u63A8\u9001\u955C\u50CF</h2><p>name\uFF1Ahello-world</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> push <span class="token number">3293172751</span>/hello-world:tagname
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>tag\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span>  tag helloworld:1.0 <span class="token number">3293172751</span>/hello-world:1.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>push:</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker push  3293172751/hello-world:1.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u5B9A\u4E49-k8s-\u5E94\u7528\u7A0B\u5E8F\u8F7D\u4F53-pod" tabindex="-1"><a class="header-anchor" href="#\u5B9A\u4E49-k8s-\u5E94\u7528\u7A0B\u5E8F\u8F7D\u4F53-pod" aria-hidden="true">#</a> \u5B9A\u4E49 k8s \u5E94\u7528\u7A0B\u5E8F\u8F7D\u4F53 Pod</h2><ul><li><code>restartPolicy</code><ul><li>Always\uFF1A\u9664\u6B63\u5E38\u9000\u51FA\u5916\uFF0C\u90FD\u4F1A\u91CD\u542F\u6211\u4EEC\u7684\u5BB9\u5668</li><li>Never\uFF1A\u4EFB\u4F55\u60C5\u51B5\u4E0B\uFF0C\u5BB9\u5668\u5173\u95ED\u90FD\u4E0D\u4F1A\u91CD\u542F</li><li>Onfailure\uFF1A\u7A0B\u5E8F\u5F02\u5E38\u9000\u51FA</li></ul></li><li><code>imagePullPolicy</code><ul><li>Always\uFF1A\u6BCF\u6B21\u90E8\u7F72\u90FD\u91CD\u65B0\u62C9\u53D6\u955C\u50CF</li><li>Never\uFF1A\u53EA\u4F7F\u7528\u672C\u5730\u955C\u50CF</li><li>ifNotPresent\uFF1A\u5982\u679C\u672C\u5730\u5B58\u5728\uFF0C\u5219\u4E0D\u62C9\u53D6</li></ul></li><li><code>command</code>\uFF1A\u542F\u52A8\u547D\u4EE4</li><li><code>resources</code>\uFF1A\u5BF9\u8D44\u6E90\u7684\u9650\u7528</li></ul><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code>apiVersion v1
kind Pod 
metadata
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myhello<span class="token punctuation">-</span>pod<span class="token punctuation">-</span>demo
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
  	<span class="token key atrule">name</span><span class="token punctuation">:</span> myhello<span class="token punctuation">-</span>pod<span class="token punctuation">-</span>demo
  	<span class="token key atrule">env</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myhello
  	<span class="token key atrule">image</span><span class="token punctuation">:</span> 
  	<span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> ifNotPresent
  	<span class="token key atrule">ports</span><span class="token punctuation">:</span>
  	<span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
  	<span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;./app&quot;</span><span class="token punctuation">]</span>
  	<span class="token key atrule">args</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;--param1=k8s-p1&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;--param2=k8s-p2&quot;</span><span class="token punctuation">]</span>
  	<span class="token key atrule">resources</span><span class="token punctuation">:</span>
  	  <span class="token key atrule">limits</span><span class="token punctuation">:</span>
  	    <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
  	  <span class="token key atrule">requests</span><span class="token punctuation">:</span>
  	  	<span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
  	  	<span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
 <span class="token key atrule">env</span><span class="token punctuation">:</span> 
 <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> env1
   <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;k8s-env1&quot;</span>
 <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> env2
   <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;k8s-env2&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2>`,17),I=s("\u56DE\u5230\u76EE\u5F55"),C=s("\u4E0A\u4E00\u8282"),M=s("\u4E0B\u4E00\u8282"),T=n("hr",null,null,-1),V={href:"https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/Git/git-contributor.md",target:"_blank",rel:"noopener noreferrer"},L=s("\u53C2\u4E0E\u8D21\u732E\u2764\uFE0F\u{1F495}\u{1F495}");function B(U,z){const a=o("ExternalLinkIcon"),t=o("RouterLink");return d(),r("div",null,[n("ul",null,[n("li",null,[n("a",u,[k,e(a)])])]),v,n("ul",null,[n("li",null,[e(t,{to:"/go-advancend/"},{default:l(()=>[m]),_:1})]),n("li",null,[e(t,{to:"/go-advancend/markdown/19.html"},{default:l(()=>[h]),_:1})])]),n("blockquote",null,[n("p",null,[b,n("a",g,[_,e(a)])])]),n("h3",y,[f,w,n("strong",null,[n("a",x,[R,e(a)])])]),n("h3",P,[N,O,n("strong",null,[n("a",D,[E,e(a)])])]),q,n("div",A,[G,n("ul",null,[n("li",null,[e(t,{to:"/go-advancend/"},{default:l(()=>[I]),_:1})]),n("li",null,[e(t,{to:"/go-advancend/markdown/19.html"},{default:l(()=>[C]),_:1})]),n("li",null,[e(t,{to:"/go-advancend/markdown/21.html"},{default:l(()=>[M]),_:1})])]),T,n("ul",null,[n("li",null,[n("a",V,[L,e(a)])])])])])}const $=c(p,[["render",B],["__file","20.html.vue"]]);export{$ as default};