<template><div><ul>
<li><a href="https://github.com/cubxxw/iam" target="_blank" rel="noopener noreferrer">🔥 开源地址<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第17节-认证机制-应用程序如何进行访问认证" tabindex="-1"><a class="header-anchor" href="#第17节-认证机制-应用程序如何进行访问认证" aria-hidden="true">#</a> 第17节 认证机制：应用程序如何进行访问认证？</h1>
<br>
<div><a href = '16.md' style='float:left'>⬆️上一节🔗  </a><a href = '18.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕During the winter vacation, I followed up and learned two projects: tiktok project and IAM project, and summarized and practiced the CloudNative project and Go language. I learned a lot in the process.Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#认证">认证</router-link></li><li><router-link to="#认证和授权有什么区别">认证和授权有什么区别？</router-link></li><li><router-link to="#四种基本的认证方式">四种基本的认证方式</router-link><ul><li><router-link to="#basic">Basic</router-link></li><li><router-link to="#digest">Digest</router-link></li><li><router-link to="#oauth">OAuth</router-link></li><li><router-link to="#bearer">Bearer</router-link></li></ul></li><li><router-link to="#基于-jwt-的-token-认证机制实现">基于 JWT 的 Token 认证机制实现</router-link><ul><li><router-link to="#jwt-简介">JWT 简介</router-link></li><li><router-link to="#jwt-认证流程">JWT 认证流程</router-link></li><li><router-link to="#jwt-格式">JWT 格式</router-link></li></ul></li><li><router-link to="#总结">总结</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="认证" tabindex="-1"><a class="header-anchor" href="#认证" aria-hidden="true">#</a> 认证</h2>
<p>保证应用的安全是软件开发的最基本要求，我们有多种途径来保障应用的安全，例如网络隔离、设置防火墙、设置 IP 黑白名单等。不过在我看来，这些更多是从运维角度来解决应用的安全问题。作为开发者，我们也可以从软件层面来保证应用的安全，这可以通过认证来实现。</p>
<p>这一讲，我以 HTTP 服务为例，来给你介绍下当前常见的四种认证方法：Basic、Digest、OAuth、Bearer。还有很多基于这四种方法的变种，这里就不再介绍了。</p>
<p>IAM 项目使用了 <code v-pre>Basic</code>、<code v-pre>Bearer</code> 两种认证方法。这一讲，我先来介绍下这四种认证方法，下一讲，我会给你介绍下 IAM 项目是如何设计和实现访问认证功能的。</p>
<h2 id="认证和授权有什么区别" tabindex="-1"><a class="header-anchor" href="#认证和授权有什么区别" aria-hidden="true">#</a> 认证和授权有什么区别？</h2>
<p>在介绍四种基本的认证方法之前，我想先带你区分下认证和授权，这是很多开发者都容易搞混的两个概念。</p>
<p>认证（Authentication，英文缩写 authn）：用来验证某个用户是否具有访问系统的权限。如果认证通过，该用户就可以访问系统，从而创建、修改、删除、查询平台支持的资源。</p>
<p>授权（Authorization，英文缩写 authz）：用来验证某个用户是否具有访问某个资源的权限，如果授权通过，该用户就能对资源做增删改查等操作。</p>
<p>这里，我通过下面的图片，来让你明白二者的区别：</p>
<p><img src="http://sm.nsddd.top/sm202302231446365.jpeg" alt="GO 语言项目开发实战 – 认证机制：应用程序如何进行访问认证？"></p>
<p>图中，我们有一个仓库系统，用户 james、colin、aaron 分别创建了 Product-A、Product-B、Product-C。现在用户 colin 通过用户名和密码（认证）成功登陆到仓库系统中，但他尝试访问 Product-A、Product-C 失败，因为这两个产品不属于他（授权失败），但他可以成功访问自己创建的资源 Product-B（授权成功）。由此可见：认证证明了你是谁，授权决定了你能做什么。</p>
<p>上面，我们介绍了认证和授权的区别。那么接下来，我们就回到这一讲的重心：应用程序如何进行访问认证。</p>
<h2 id="四种基本的认证方式" tabindex="-1"><a class="header-anchor" href="#四种基本的认证方式" aria-hidden="true">#</a> 四种基本的认证方式</h2>
<p>常见的认证方式有四种，分别是 Basic、Digest、OAuth 和 Bearer。先来看下 Basic 认证。</p>
<h3 id="basic" tabindex="-1"><a class="header-anchor" href="#basic" aria-hidden="true">#</a> Basic</h3>
<p><strong>Basic 认证（基础认证）</strong>，是最简单的认证方式。它简单地将用户名:密码进行 base64 编码后，放到 HTTP Authorization Header 中。HTTP 请求到达后端服务后，后端服务会解析出 Authorization Header 中的 base64 字符串，解码获取用户名和密码，并将用户名和密码跟数据库中记录的值进行比较，如果匹配则认证通过。例如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token assign-left variable">basic</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">'admin:Admin@2021'</span><span class="token operator">|</span>base64<span class="token variable">`</span></span>

$ <span class="token function">curl</span> <span class="token parameter variable">-XPOST</span> -H<span class="token string">"Authorization: Basic <span class="token variable">${basic}</span>"</span> http://127.0.0.1:8080/login
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 base64 编码，可以将密码以非明文的方式传输，增加一定的安全性。但是，base64 不是加密技术，入侵者仍然可以截获 base64 字符串，并反编码获取用户名和密码。另外，即使 Basic 认证中密码被加密，入侵者仍可通过加密后的用户名和密码进行重放攻击。</p>
<p>所以，Basic 认证虽然简单，但极不安全。使用 Basic 认证的唯一方式就是将它和 SSL 配合使用，来确保整个认证过程是安全的。</p>
<p>IAM 项目中，为了支持前端通过用户名和密码登录，仍然使用了 Basic 认证，但前后端使用 HTTPS 来通信，保证了认证的安全性。</p>
<p>这里需要注意，在设计系统时，要遵循一个通用的原则：不要在请求参数中使用明文密码，也不要在任何存储中保存明文密码。</p>
<h3 id="digest" tabindex="-1"><a class="header-anchor" href="#digest" aria-hidden="true">#</a> Digest</h3>
<p><strong>Digest 认证（摘要认证）</strong>，是另一种 HTTP 认证协议，它与基本认证兼容，但修复了基本认证的严重缺陷。Digest 具有如下特点：</p>
<ol>
<li>绝不会用明文方式在网络上发送密码。</li>
<li>可以有效防止恶意用户进行重放攻击。</li>
<li>可以有选择地防止对报文内容的篡改。</li>
</ol>
<p>摘要认证的过程见下图：</p>
<p><img src="http://sm.nsddd.top/sm202302231446882.jpeg" alt="GO 语言项目开发实战 – 认证机制：应用程序如何进行访问认证？"></p>
<p>在上图中，完成摘要认证需要下面这四步：</p>
<ol>
<li>客户端请求服务端的资源。</li>
<li>在客户端能够证明它知道密码从而确认其身份之前，服务端认证失败，返回401 Unauthorized，并返回WWW-Authentication头，里面包含认证需要的信息。</li>
<li>客户端根据WWW-Authentication头中的信息，选择加密算法，并使用密码随机数 nonce，计算出密码摘要 response，并再次请求服务端。</li>
<li>服务器将客户端提供的密码摘要与服务器内部计算出的摘要进行对比。如果匹配，就说明客户端知道密码，认证通过，并返回一些与授权会话相关的附加信息，放在 Authorization-Info 中。</li>
</ol>
<p><strong>WWW-Authentication头中包含的信息见下表：</strong></p>
<p><img src="http://sm.nsddd.top/sm202302231447063.jpeg" alt="GO 语言项目开发实战 – 认证机制：应用程序如何进行访问认证？"></p>
<p>虽然使用摘要可以避免密码以明文方式发送，一定程度上保护了密码的安全性，但是仅仅隐藏密码并不能保证请求是安全的。因为请求（包括密码摘要）仍然可以被截获，这样就可以重放给服务器，带来安全问题。</p>
<p>为了防止重放攻击，服务器向客户端发送了密码随机数 nonce，nonce 每次请求都会变化。客户端会根据 nonce 生成密码摘要，这种方式，可以使摘要随着随机数的变化而变化。服务端收到的密码摘要只对特定的随机数有效，而没有密码的话，攻击者就无法计算出正确的摘要，这样我们就可以防止重放攻击。</p>
<p>摘要认证可以保护密码，比基本认证安全很多。但摘要认证并不能保护内容，所以仍然要与 HTTPS 配合使用，来确保通信的安全。</p>
<h3 id="oauth" tabindex="-1"><a class="header-anchor" href="#oauth" aria-hidden="true">#</a> OAuth</h3>
<p>OAuth（开放授权）是一个开放的授权标准，允许用户让第三方应用访问该用户在某一 Web 服务上存储的私密资源（例如照片、视频、音频等），而无需将用户名和密码提供给第三方应用。OAuth 目前的版本是 2.0 版。</p>
<p>OAuth2.0 一共分为四种授权方式，分别<strong>为密码式、隐藏式、拼接式和授权码模式</strong>。接下来，我们就具体介绍下每一种授权方式。</p>
<p><strong>第一种，密码式。密码式的授权方式，就是用户把用户名和密码直接告诉给第三方应用，然后第三方应用使用用户名和密码换取令牌。所以，使用此授权方式的前提是无法采用其他授权方式，并且用户高度信任某应用。</strong></p>
<p><strong>认证流程如下：</strong></p>
<ol>
<li>网站 A 向用户发出获取用户名和密码的请求；</li>
<li>用户同意后，网站 A 凭借用户名和密码向网站 B 换取令牌；</li>
<li>网站 B 验证用户身份后，给出网站 A 令牌，网站 A 凭借令牌可以访问网站 B 对应权限的资源。</li>
</ol>
<p><strong>第二种，隐藏式。这种方式适用于前端应用。认证流程如下：</strong></p>
<ol>
<li>A 网站提供一个跳转到 B 网站的链接，用户点击后跳转至 B 网站，并向用户请求授权；</li>
<li>用户登录 B 网站，同意授权后，跳转回 A 网站指定的重定向 <code v-pre>redirect_url</code> 地址，并携带 B 网站返回的令牌，用户在 B 网站的数据给 A 网站使用。</li>
</ol>
<p>这个授权方式存在着“中间人攻击”的风险，因此只能用于一些安全性要求不高的场景，并且令牌的有效时间要非常短。</p>
<p><strong>第三种，凭借式。这种方式是在命令行中请求授权，适用于没有前端的命令行应用。认证流程如下：</strong></p>
<ol>
<li>应用 A 在命令行向应用 B 请求授权，此时应用 A 需要携带应用 B 提前颁发的 secretID 和 secretKey，其中 secretKey 出于安全性考虑，需在后端发送；</li>
<li>应用 B 接收到 secretID 和 secretKey，并进行身份验证，验证通过后返回给应用 A 令牌。</li>
</ol>
<p><strong>第四种，授权码模式。这种方式就是第三方应用先提前申请一个授权码，然后再使用授权码来获取令牌。相对来说，这种方式安全性更高，前端传送授权码，后端存储令牌，与资源的通信都是在后端，可以避免令牌的泄露导致的安全问题。认证流程如下：</strong></p>
<p><img src="http://sm.nsddd.top/sm202302231453859.jpeg" alt="GO 语言项目开发实战 – 认证机制：应用程序如何进行访问认证？"></p>
<p>A 网站提供一个跳转到 B 网站的链接 <code v-pre>+redirect_url</code>，用户点击后跳转至 B 网站；</p>
<p>用户携带向 B 网站提前申请的 <code v-pre>client_id</code>，向 B 网站发起身份验证请求；</p>
<p>用户登录 B 网站，通过验证，授予 A 网站权限，此时网站跳转回 redirect_url，其中会有 B 网站通过验证后的授权码附在该 url 后；</p>
<p>网站 A 携带授权码向网站 B 请求令牌，网站 B 验证授权码后，返回令牌即 access_token。</p>
<h3 id="bearer" tabindex="-1"><a class="header-anchor" href="#bearer" aria-hidden="true">#</a> Bearer</h3>
<p>Bearer 认证，也称为令牌认证，是一种 HTTP 身份验证方法。Bearer 认证的核心是 bearer token。bearer token 是一个加密字符串，通常由服务端根据密钥生成。客户端在请求服务端时，必须在请求头中包含Authorization: Bearer 。服务端收到请求后，解析出 ，并校验 的合法性，如果校验通过，则认证通过。跟基本认证一样，Bearer 认证需要配合 HTTPS 一起使用，来保证认证安全性。</p>
<p>当前最流行的 token 编码方式是 JSON Web Token（JWT，音同 jot，详见 JWT RFC 7519）。接下来，我通过讲解 JWT 认证来帮助你了解 Bearer 认证的原理。</p>
<h2 id="基于-jwt-的-token-认证机制实现" tabindex="-1"><a class="header-anchor" href="#基于-jwt-的-token-认证机制实现" aria-hidden="true">#</a> 基于 JWT 的 Token 认证机制实现</h2>
<p>在典型业务场景中，为了区分用户和保证安全，必须对 API 请求进行鉴权，但是不能要求每一个请求都进行登录操作。合理做法是，在第一次登录之后产生一个有一定有效期的 token，并将它存储在浏览器的 Cookie 或 LocalStorage 之中。之后的请求都携带这个 token ，请求到达服务器端后，服务器端用这个 token 对请求进行认证。在第一次登录之后，服务器会将这个 token 用文件、数据库或缓存服务器等方法存下来，用于之后请求中的比对。</p>
<p>或者也可以采用更简单的方法：直接用密钥来签发 Token。这样，就可以省下额外的存储，也可以减少每一次请求时对数据库的查询压力。这种方法在业界已经有一种标准的实现方式，就是 JWT。</p>
<p>接下来，我就来具体介绍下 JWT。</p>
<h3 id="jwt-简介" tabindex="-1"><a class="header-anchor" href="#jwt-简介" aria-hidden="true">#</a> JWT 简介</h3>
<p>JWT 是 Bearer Token 的一个具体实现，由 JSON 数据格式组成，通过 HASH 散列算法生成一个字符串。该字符串可以用来进行授权和信息交换。</p>
<p>使用 JWT Token 进行认证有很多优点，比如说无需在服务端存储用户数据，可以减轻服务端压力；而且采用 JSON 数据格式，比较易读。除此之外，使用 JWT Token 还有跨语言、轻量级等优点。</p>
<h3 id="jwt-认证流程" tabindex="-1"><a class="header-anchor" href="#jwt-认证流程" aria-hidden="true">#</a> JWT 认证流程</h3>
<p>使用 JWT Token 进行认证的流程如下图：</p>
<p><img src="http://sm.nsddd.top/sm202302231456606.jpeg" alt="GO 语言项目开发实战 – 认证机制：应用程序如何进行访问认证？"></p>
<p><strong>具体可以分为四步：</strong></p>
<ol>
<li>客户端使用用户名和密码请求登录。</li>
<li>服务端收到请求后，会去验证用户名和密码。如果用户名和密码跟数据库记录不一致，则验证失败；如果一致则验证通过，服务端会签发一个 Token 返回给客户端。</li>
<li>客户端收到请求后会将 Token 缓存起来，比如放在浏览器 Cookie 中或者 LocalStorage 中，之后每次请求都会携带该 Token。</li>
<li>服务端收到请求后，会验证请求中的 Token，验证通过则进行业务逻辑处理，处理完后返回处理后的结果。</li>
</ol>
<h3 id="jwt-格式" tabindex="-1"><a class="header-anchor" href="#jwt-格式" aria-hidden="true">#</a> JWT 格式</h3>
<p>JWT 由三部分组成，分别是 Header、Payload 和 Signature，它们之间用圆点<code v-pre>.</code>连接，并使用 Base64 编码，例如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>JhdWQiOiJpYW0uYXV0aHoubWFybW90ZWR1LmNvbSIsImV4cCI6MTYwNDE1ODk4NywiaWF0IjoxNjA0MTUxNzg3LCJpc3MiOiJpYW1jdGwiLCJuYmYiOjE2MDQxNTE3ODd9.d_2gj3vyEUlMq1b9A0tJoKdLvMInAEfQmdK7XZkB980
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>JWT 中，每部分包含的信息见下图：</strong></p>
<p><img src="http://sm.nsddd.top/sm202302231505816.jpeg" alt="GO 语言项目开发实战 – 认证机制：应用程序如何进行访问认证？"></p>
<p>下面我来具体介绍下这三部分，以及它们包含的信息。</p>
<h4 id="header" tabindex="-1"><a class="header-anchor" href="#header" aria-hidden="true">#</a> Header</h4>
<p>JWT Token 的 Header 中，包含两部分信息：一是 Token 的类型，二是 Token 所使用的加密算法。</p>
<p><strong>例如：</strong></p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>

<span class="token property">"typ"</span><span class="token operator">:</span> <span class="token string">"JWT"</span><span class="token punctuation">,</span>

<span class="token property">"alg"</span><span class="token operator">:</span> <span class="token string">"HS256"</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>参数说明：</strong></p>
<ol>
<li><code v-pre>typ</code>：说明 Token 类型是 JWT。</li>
<li><code v-pre>alg</code>：说明 Token 的加密算法，这里是 HS256（alg 算法可以有多种）。</li>
</ol>
<p>这里，我们将 Header 进行 base64 编码：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>$ echo -n '<span class="token punctuation">{</span><span class="token property">"typ"</span><span class="token operator">:</span><span class="token string">"JWT"</span><span class="token punctuation">,</span><span class="token property">"alg"</span><span class="token operator">:</span><span class="token string">"HS256"</span><span class="token punctuation">}</span>'|base64

eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在某些场景下，可能还会有 kid 选项，用来标识一个密钥 ID，例如：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>

<span class="token property">"alg"</span><span class="token operator">:</span> <span class="token string">"HS256"</span><span class="token punctuation">,</span>

<span class="token property">"kid"</span><span class="token operator">:</span> <span class="token string">"XhbY3aCrfjdYcP1OFJRu9xcno8JzSbUIvGE2"</span><span class="token punctuation">,</span>

<span class="token property">"typ"</span><span class="token operator">:</span> <span class="token string">"JWT"</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">'{"typ":"JWT","alg":"HS256","kid":"XhbY3aCrfjdYcP1OFJRu9xcno8JzSbUIvGE2"}'</span><span class="token operator">|</span>base64
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IlhoYlkzYUNyZmpkWWNQMU9GSlJ1OXhj
bm84SnpTYlVJdkdFMiJ9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="payload-载荷" tabindex="-1"><a class="header-anchor" href="#payload-载荷" aria-hidden="true">#</a> Payload（载荷）</h4>
<p>Payload 中携带 Token 的具体内容由三部分组成：<strong>JWT 标准中注册的声明（可选）、公共的声明、私有的声明。</strong> 下面来分别看下。</p>
<p><strong>JWT 标准中注册的声明部分，有以下标准字段：</strong></p>
<p><img src="http://sm.nsddd.top/sm202302231507274.png" alt="GO 语言项目开发实战 – 认证机制：应用程序如何进行访问认证？"></p>
<p><strong>本例中的 payload 内容为：</strong></p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>

<span class="token property">"aud"</span><span class="token operator">:</span> <span class="token string">"iam.authz.marmotedu.com"</span><span class="token punctuation">,</span>

<span class="token property">"exp"</span><span class="token operator">:</span> <span class="token number">1604158987</span><span class="token punctuation">,</span>

<span class="token property">"iat"</span><span class="token operator">:</span> <span class="token number">1604151787</span><span class="token punctuation">,</span>

<span class="token property">"iss"</span><span class="token operator">:</span> <span class="token string">"iamctl"</span><span class="token punctuation">,</span>

<span class="token property">"nbf"</span><span class="token operator">:</span> <span class="token number">1604151787</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们将 Payload 进行 base64 编码：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>$ echo -n '<span class="token punctuation">{</span><span class="token property">"aud"</span><span class="token operator">:</span><span class="token string">"iam.authz.marmotedu.com"</span><span class="token punctuation">,</span><span class="token property">"exp"</span><span class="token operator">:</span><span class="token number">1604158987</span><span class="token punctuation">,</span><span class="token property">"iat"</span><span class="token operator">:</span><span class="token number">1604151787</span><span class="token punctuation">,</span><span class="token property">"iss"</span><span class="token operator">:</span><span class="token string">"iamctl"</span><span class="token punctuation">,</span><span class="token property">"nbf"</span><span class="token operator">:</span><span class="token number">1604151787</span><span class="token punctuation">}</span>'|base64

eyJhdWQiOiJpYW0uYXV0aHoubWFybW90ZWR1LmNvbSIsImV4cCI6MTYwNDE1ODk4NywiaWF0Ijox

NjA0MTUxNzg3LCJpc3MiOiJpYW1jdGwiLCJuYmYiOjE2MDQxNTE3ODd9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外，还有公共的声明和私有的声明。公共的声明可以添加任何的需要的信息，一般添加用户的相关信息或其他业务需要的信息，注意不要添加敏感信息；私有声明是客户端和服务端所共同定义的声明，因为 base64 是对称解密的，所以一般不建议存放敏感信息。</p>
<h4 id="signature-签名" tabindex="-1"><a class="header-anchor" href="#signature-签名" aria-hidden="true">#</a> Signature（签名）</h4>
<p>Signature 是 Token 的签名部分，通过如下方式生成：将 Header 和 Payload 分别 base64 编码后，用 <code v-pre>.</code> 连接。然后再使用 Header 中声明的加密方式，利用 secretKey 对连接后的字符串进行加密，加密后的字符串即为最终的 Token。</p>
<p>secretKey 是密钥，保存在服务器中，一般通过配置文件来保存，例如：</p>
<p><img src="https://www.zadmei.com/wp-content/uploads/2022/08/1661745075-6bb61e3b7bce093.png" alt="GO 语言项目开发实战 – 认证机制：应用程序如何进行访问认证？"></p>
<p>这里要注意，密钥一定不能泄露。密钥泄露后，入侵者可以使用该密钥来签发 JWT Token，从而入侵系统。</p>
<p>最后生成的 Token 如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJpYW0uYXV0aHoubWFybW90ZWR1LmNvbSIsImV4cCI6MTYwNDE1ODk4NywiaWF0IjoxNjA0MTUxNzg3LCJpc3MiOiJpYW1jdGwiLCJuYmYiOjE2MDQxNTE3ODd9.LjxrK9DuAwAzUD8-9v43NzWBN7HXsSLfebw92DKd1JQ
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>签名后服务端会返回生成的 Token，客户端下次请求会携带该 Token。服务端收到 Token 后会解析出 header.payload，然后用相同的加密算法和密钥，对 header.payload 再进行一次加密得到 Signature，并对比加密后的 Signature 和收到的 Signature 是否相同。如果相同则验证通过，不相同则返回HTTP 401 Unauthorized的错误。</p>
<p><strong>最后，关于 JWT 的使用，我还有两点建议：</strong></p>
<ul>
<li>不要存放敏感信息在 Token 里；</li>
<li>Payload 中的 exp 值不要设置的太大，一般开发版本 2 小时，上线版本 7 天。当然，你也可以根据需要自行设置。</li>
</ul>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>在开发 Go 应用时，我们需要通过认证来保障应用的安全。认证，用来验证某个用户是否具有访问系统的权限，如果认证通过，该用户就可以访问系统，从而创建、修改、删除、查询平台支持的资源。业界目前有四种常用的认证方式：Basic、Digest、OAuth、Bearer。其中 Basic 和 Bearer 用得最多。</p>
<ul>
<li>Basic 认证通过用户名和密码来进行认证，主要用在用户登录场景；Bearer 认证通过 Token 来进行认证，通常用在 API 调用场景。不管是 Basic 认证还是 Bearer 认证，都需要结合 HTTPS 来使用，来最大程度地保证请求的安全性。</li>
<li>Basic 认证简单易懂，但是 Bearer 认证有一定的复杂度，所以这一讲的后半部分通过 JWT Token，讲解了 Bearer Token 认证的原理。</li>
<li>JWT Token 是 Bearer 认证的一种比较好的实现，主要包含了 3 个部分：
<ul>
<li>Header：包含了 Token 的类型、Token 使用的加密算法。在某些场景下，你还可以添加 kid 字段，用来标识一个密钥 ID。</li>
<li>Payload：Payload 中携带 Token 的具体内容，由 JWT 标准中注册的声明、公共的声明和私有的声明三部分组成。</li>
<li>Signature：Signature 是 Token 的签名部分，程序通过验证 Signature 是否合法，来决定认证是否通过。</li>
</ul>
</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '16.md' style='float:left'>⬆️上一节🔗  </a><a href = '18.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/projects/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://nsddd.top/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © ：本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


