<template><div><ul>
<li><a href="https://github.com/cubxxw/iam" target="_blank" rel="noopener noreferrer">🔥 开源地址<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第1节-iam项目介绍" tabindex="-1"><a class="header-anchor" href="#第1节-iam项目介绍" aria-hidden="true">#</a> 第1节 IAM项目介绍</h1>
<br>
<div><a href = '0.md' style='float:left'>⬆️上一节🔗  </a><a href = '2.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕During the winter vacation, I followed up and learned two projects: tiktok project and IAM project, and summarized and practiced the CloudNative project and Go language. I learned a lot in the process.Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#前言">前言</router-link></li><li><router-link to="#开始">开始</router-link></li><li><router-link to="#iam系统架构是什么样的">IAM系统架构是什么样的</router-link><ul><li><router-link to="#第-1-步-创建平台资源">第 1 步，创建平台资源</router-link></li><li><router-link to="#第-2-步-请求-api-完成资源授权">第 2 步，请求 API 完成资源授权</router-link></li><li><router-link to="#第-3-步-授权日志数据分析">第 3 步，授权日志数据分析</router-link></li><li><router-link to="#第-4-步-运营平台授权数据展示">第 4 步，运营平台授权数据展示</router-link></li></ul></li><li><router-link to="#iam-软件架构模式">IAM 软件架构模式</router-link><ul><li><router-link to="#前后端分离架构">前后端分离架构</router-link></li><li><router-link to="#mvc-软件架构">MVC 软件架构</router-link></li></ul></li><li><router-link to="#总结">总结</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<ul>
<li>
<p><a href="https://github.com/cubxxw/cs-awesome-Block_Chain" target="_blank" rel="noopener noreferrer">⭕ 📚 菜鸟成长手册🚀 CS系列 、云原生系列、区块链系列、web3系列🔥、Golang系列💡<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://go.nsddd.top/" target="_blank" rel="noopener noreferrer">🚤 Go语言基础-进阶<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/cubxxw/cs-awesome-Block_Chain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">🖱️GO 基础部分🔥<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/cubxxw/cs-awesome-Block_Chain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">🖱️Go语言100篇进阶🔥<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/cubxxw/cs-awesome-Block_Chain/blob/master/go-advancend/README.md" target="_blank" rel="noopener noreferrer">🖱️Go 高级篇<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://docker.nsddd.top/" target="_blank" rel="noopener noreferrer">🚤 docker &amp; k8s &amp; 云原生<ExternalLinkIcon/></a></p>
</li>
</ul>
<h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<ul>
<li>[x] <a href="https://github.com/cubxxw/iam" target="_blank" rel="noopener noreferrer">IAM github地址<ExternalLinkIcon/></a></li>
<li>[x] <a href="https://time.geekbang.org/column/article/378082" target="_blank" rel="noopener noreferrer">课程地址<ExternalLinkIcon/></a></li>
</ul>
<p><strong>为什么选择 IAM 项目：</strong></p>
<p>我们在做 Go 项目开发时，绕不开的一个话题是安全，如何保证 Go 应用的安全，是每个开发者都要解决的问题。虽然 Go 应用的安全包含很多方面，但大体可分为如下 2 类：</p>
<ul>
<li>服务自身的安全：为了保证服务的安全，需要禁止非法用户访问服务。这可以通过服务器层面和软件层面来解决。服务器层面可以通过物理隔离、网络隔离、防火墙等技术从底层保证服务的安全性，软件层面可以通过 HTTPS、用户认证等手段来加强服务的安全性。服务器层面一般由运维团队来保障，软件层面则需要开发者来保障。</li>
<li>服务资源的安全：服务内有很多资源，为了避免非法访问，开发者要避免 UserA 访问到 UserB 的资源，也即需要对资源进行授权。通常，我们可以通过资源授权系统来对资源进行授权。</li>
</ul>
<p>总的来说，为了保障 Go 应用的安全，我们需要对访问进行认证，对资源进行授权。</p>
<p><strong>什么是IAM系统：</strong></p>
<p><strong>IAM（Identity and Access Management，身份识别与访问管理）</strong> 系统是用 Go 语言编写的一个 Web 服务，用于给第三方用户提供访问控制服务。IAM 系统可以帮用户解决的问题是：在特定的条件下，<strong>谁能够 / 不能够</strong> 对 <strong>哪些资源做哪些操作</strong>（Who is able to do what on something given some context），也即完成资源授权功能。</p>
<p>它是Amazon Web Services的一项安全服务，允许您为您的AWS账户创建和管理用户帐户和权限。这样，您就可以控制谁可以访问您的 [[AWS]] 资源，并设置他们可以执行哪些操作。</p>
<blockquote>
<p>AWS 是 Amazon Web Services 的缩写。它是亚马逊公司提供的一组云计算服务。AWS 提供了大量的服务，包括计算、存储、数据库、分析、应用程序服务器、开发工具、人工智能和互联网 of Things（IoT）等等。这些服务可以让用户在云端运行应用程序和存储数据，而无需拥有和维护专用的硬件和基础架构。</p>
</blockquote>
<p><strong>IAM如何完成授权，分为四步：</strong></p>
<ol>
<li>用户需要提供昵称、密码、邮箱、电话等信息注册并登录到 IAM 系统，这里是以用户名和密码作为唯一的身份标识来访问 IAM 系统，并且完成认证。</li>
<li>因为访问 IAM 的资源授权接口是通过密钥（secretID/secretKey）的方式进行认证的，所以用户需要在 IAM 中创建属于自己的密钥资源。</li>
<li>因为 IAM 通过授权策略完成授权，所以用户需要在 IAM 中创建授权策略。</li>
<li>请求 IAM 提供的授权接口，IAM 会根据用户的请求内容和授权策略来决定一个授权请求是否被允许。</li>
</ol>
<p><img src="http://sm.nsddd.top/sm202301142137316.png" alt="image-20230114213702111"></p>
<p>我们可以看到，在上面的流程中，IAM 使用到了 3 种系统资源：<strong>用户（User）、密钥（Secret）和策略（Policy）</strong>，它们映射到程序设计中就是 3 种 [[RESTful]] 资源：</p>
<blockquote>
<p>RESTful 是 Representational State Transfer 的缩写。它是一种软件架构风格，用于构建网络应用程序。RESTful应用程序通过一组简单的，统一的约定来实现资源的状态转移，这些约定由 HTTP 协议提供。这些约定包括使用 HTTP 方法（如 GET、POST、PUT和DELETE）来执行操作，以及使用 HTTP 状态码来表示结果。</p>
<p>RESTful API是一种符合REST规范的API，通常采用HTTP协议，用于进行资源的查询和操作，并通过JSON或XML格式进行数据传输。</p>
</blockquote>
<ol>
<li>用户（User）：实现对用户的增、删、改、查、修改密码、批量修改等操作。</li>
<li>密钥（Secret）：实现对密钥的增、删、改、查操作。</li>
<li>策略（Policy）：实现对策略的增、删、改、查、批量删除操作。</li>
</ol>
<h2 id="iam系统架构是什么样的" tabindex="-1"><a class="header-anchor" href="#iam系统架构是什么样的" aria-hidden="true">#</a> IAM系统架构是什么样的</h2>
<p><img src="http://sm.nsddd.top/sm202301171416484.png" alt="image-20230117141609306"></p>
<p>总的来说，IAM 架构中包括 9 大组件和 3 大数据库。我将这些组件和功能都总结在下面的表格中。这里面，我们主要记住 5 个核心组件，包括 <code v-pre>iam-apiserver</code>、<code v-pre>iam-authz-server</code>、<code v-pre>iam-pump</code>、<code v-pre>marmotedu-sdk-go</code> 和 <code v-pre>iamctl</code> 的功能，还有 3 个数据库 Redis、MySQL 和 MongoDB 的功能。</p>
<p><img src="http://sm.nsddd.top/sm202301151706727.png" alt="image-20230115170558726"></p>
<blockquote>
<p>前 5 个组件是我们需要实现的核心组件。后 4 个组件是一些旁路组件，不影响项目的使用。如果感兴趣，你可以自行实现。</p>
<ul>
<li><strong>iam-apiserver</strong>：核心组件，通过 RESTful API 完成用户、密钥和授权策略的增删改查。</li>
<li><strong>iam-authz-server</strong>：授权服务，从 iam-apiserver 拉取密钥和授权策略，并缓存在内存中，用户通过请求 iam-authz-server 提供的 /v1/authz 接口来完成资源的授权。/v1/authz 接口会查询缓存的授权策略，根据这些策略决定授权是否通过。iam-authz-server 也会将授权日志上报的 Redis 中。</li>
<li><strong>iam-pump</strong>：从 redis 中拉取缓存的授权日志，分析后存入 mongo 数据库中。</li>
<li><strong>iam-watcher</strong>：分布式作业服务，间隔一定时间查询 MariaDB 数据库，执行一些业务逻辑处理，例如：从 policy_audit 表中删除超过指定天数的授权策略、禁用超过指定天数还没有登录过的用户。</li>
<li><strong>marmotedu-sdk-go</strong>：IAM 的 golang sdk，参考了 kubernetes 的 client-go，封装了 iam-apiserver 和 iam-authz-server 的所有 RESTful API，方便用户调用。</li>
<li><strong>iamctl</strong>：IAM 的客户端，参考了 kubernetes 的客户端工具 kubectl，通过 marmotedu-sdk-go 访问 iam-apiserver 和 iam-authz-server。iamctl 封装了 iam-apiserver 的所有 RESTful API，还封装了其它功能。用户可以通过命令行的方式访问 iam-apiserver。</li>
<li><strong>redis</strong>：缓存数据库，用来缓存密钥和授权策略，降低访问延时。同时也会缓存授权日志，作为运营系统的数据来源。</li>
<li><strong>mysql</strong>：持久性存储用户、密钥和授权策略信息。</li>
<li><strong>mongo</strong>：存储授权日志，供后期运营系统展示和分析。</li>
</ul>
<p>上图中，灰色部分也是 IAM 项目需要的组件：</p>
<ul>
<li><strong>app</strong>：第三方应用，是 IAM 的使用方，通过 RESTful API 或者 marmotedu-sdk-go 调用 iam-authz-server 提供的 /v1/authz 接口完成对资源的授权。</li>
<li><strong>iam-webconsole</strong>：IAM 的前端，通过 RESTful API 调用 iam-apiserver 实现用户、密钥和策略的增删改查。</li>
<li><strong>iam-operating-system</strong>： IAM 运营系统，可以用来展示运营数据或者对 IAM 进行运营类管理，比如提供上帝视角查看所有用户的资源，调整某个用户下密钥的最大个数等。</li>
<li><strong>Loadbalance</strong>：负载均衡器，可以是 Nginx、Haproxy 或者 API 网关，后端挂载多个 iam-apiserver 和 iam-authz-server 实例，实现 iam-apiserver 和 iam-authz-server 组件的高可用。</li>
</ul>
<p><strong>能力说明：</strong></p>
<ul>
<li><strong>RESTful 资源管理</strong> IAM 支持对user、secret、policy资源进行CRUD管理。</li>
<li><strong>资源授权</strong>  可以对资源访问进行授权。</li>
<li><strong>授权日志处理</strong>  支持对授权日志进行处理并展示。</li>
<li><strong>命令行工具</strong>  通过iamctl命令行工具，可以很方便的进行各类操作。</li>
<li><strong>分布式作业</strong>  iam-watcher为IAM项目的分布式作业服务，可以实现异步任务，并插件化的添加新的任务类型。</li>
</ul>
</blockquote>
<p>此外，IAM 系统为存储数据使用到的 3 种数据库的说明如下所示。</p>
<p><img src="http://sm.nsddd.top/sm202301152126726.png" alt="image-20230115212651665"></p>
<h3 id="第-1-步-创建平台资源" tabindex="-1"><a class="header-anchor" href="#第-1-步-创建平台资源" aria-hidden="true">#</a> 第 1 步，创建平台资源</h3>
<p>用户通过 iam-webconsole（RESTful API）或 iamctl（sdk marmotedu-sdk-go）客户端请求 iam-apiserver 提供的 RESTful API 接口完成用户、密钥、授权策略的增删改查，iam-apiserver 会将这些资源数据持久化存储在 MySQL 数据库中。</p>
<p>而且，<strong>为了确保通信安全，客户端访问服务端都是通过 HTTPS 协议来访问的。</strong></p>
<h3 id="第-2-步-请求-api-完成资源授权" tabindex="-1"><a class="header-anchor" href="#第-2-步-请求-api-完成资源授权" aria-hidden="true">#</a> 第 2 步，请求 API 完成资源授权</h3>
<p>用户可以通过请求 <code v-pre>iam-authz-server</code> 提供的 <code v-pre>/v1/authz</code> 接口进行资源授权，请求 <code v-pre>/v1/authz</code> 接口需要通过密钥认证，认证通过后 <code v-pre>/v1/authz</code> 接口会查询授权策略，从而决定资源请求是否被允许。</p>
<p>用户可以通过请求 <code v-pre>iam-authz-server</code> 提供的 <code v-pre>/v1/authz</code> 接口进行资源授权，请求 <code v-pre>/v1/authz</code> 接口需要通过密钥认证，认证通过后 <code v-pre>/v1/authz</code> 接口会查询授权策略，从而决定资源请求是否被允许。</p>
<h3 id="第-3-步-授权日志数据分析" tabindex="-1"><a class="header-anchor" href="#第-3-步-授权日志数据分析" aria-hidden="true">#</a> 第 3 步，授权日志数据分析</h3>
<p><code v-pre>iam-authz-server</code> 会将授权日志上报到 Redis 高速缓存中，然后 <code v-pre>iam-pump</code> 组件会异步消费这些授权日志，再把清理后的数据保存在 MongoDB 中，供运营系统 <code v-pre>iam-operating-system</code> 查询。</p>
<p>这里还有一点你要注意：<code v-pre>iam-authz-server</code> 将授权日志保存在 Redis 高性能 <code v-pre>key-value</code> 数据库中，可以最大化减少写入延时。不保存在内存中是因为授权日志量我们没法预测，当授权日志量很大时，很可能会将内存耗尽，造成服务中断。</p>
<h3 id="第-4-步-运营平台授权数据展示" tabindex="-1"><a class="header-anchor" href="#第-4-步-运营平台授权数据展示" aria-hidden="true">#</a> 第 4 步，运营平台授权数据展示</h3>
<p><code v-pre>iam-operating-system</code> 是 IAM 的运营系统，它可以通过查询 MongoDB 获取并展示运营数据，比如某个用户的授权 / 失败次数、授权失败时的授权信息等。此外，我们也可以通过 <code v-pre>iam-operating-system</code> 调用 <code v-pre>iam-apiserver</code> 服务来做些运营管理工作。比如，以上帝视角查看某个用户的授权策略供排障使用，或者调整用户可创建密钥的最大个数，再或者通过白名单的方式，让某个用户不受密钥个数限制的影响等等。</p>
<h2 id="iam-软件架构模式" tabindex="-1"><a class="header-anchor" href="#iam-软件架构模式" aria-hidden="true">#</a> IAM 软件架构模式</h2>
<p>在设计软件时，我们首先要做的就是选择一种软件架构模式，它对软件后续的开发方式、软件维护成本都有比较大的影响。因此，这里我也会和你简单聊聊 2 种最常用的软件架构模式，分别是前后端分离架构和 MVC 架构。</p>
<h3 id="前后端分离架构" tabindex="-1"><a class="header-anchor" href="#前后端分离架构" aria-hidden="true">#</a> 前后端分离架构</h3>
<p>因为 IAM 系统采用的就是 [[前后端分离]] 的架构，所以我们就以 IAM 的运营系统 iam-operating-system 为例来详细说说这个架构。一般来说，运营系统的功能可多可少，对于一些具有复杂功能的运营系统，我们可以采用前后端分离的架构。</p>
<p>其中，前端负责页面的展示以及数据的加载和渲染，后端只负责返回前端需要的数据。iam-operating-system 前后端分离架构如下图所示。</p>
<p><img src="http://sm.nsddd.top/sm202301152214453.png" alt="image-20230115221432369"></p>
<p>采用了前后端分离架构之后，当你通过浏览器请求前端 ops-webconsole 时，ops-webconsole 会先请求静态文件服务器加载静态文件，比如 HTML、CSS 和 JavaScript，然后它会执行 JavaScript，通过负载均衡请求后端数据，最后把后端返回的数据渲染到前端页面中。</p>
<p>采用前后端分离的架构，让前后端通过 <code v-pre>RESTful API</code> 通信，会带来以下 5 点好处：</p>
<ol>
<li>可以让前、后端人员各自专注在自己业务的功能开发上，让专业的人做专业的事，来提高代码质量和开发效率。</li>
<li>前后端可并行开发和发布，这也能提高开发和发布效率，加快产品迭代速度。</li>
<li>前后端组件、代码分开，职责分明，可以增加代码的维护性和可读性，减少代码改动引起的 Bug 概率，同时也能快速定位 Bug。</li>
<li>前端 JavaScript 可以处理后台的数据，减少对后台服务器的压力。</li>
<li>可根据需要选择性水平扩容前端或者后端来节约成本。</li>
</ol>
<h3 id="mvc-软件架构" tabindex="-1"><a class="header-anchor" href="#mvc-软件架构" aria-hidden="true">#</a> MVC 软件架构</h3>
<p>但是，如果运营系统功能比较少，采用前后端分离框架的弊反而大于利，比如前后端分离要同时维护 2 个组件会导致部署更复杂，并且前后端分离将人员也分开了，这会增加一定程度的沟通成本。同时，因为代码中也需要实现前后端交互的逻辑，所以会引入一定的开发量。</p>
<p><img src="http://sm.nsddd.top/sm202301152217948.png" alt="image-20230115221707852"></p>
<p>[[MVC]] 的全名是 Model View Controller，它是一种架构模式，分为 Model、View、Controller 三层，每一层的功能如下：</p>
<ul>
<li>View（视图）：提供给用户的操作界面，用来处理数据的显示。</li>
<li>Controller（控制器）：根据用户从 View 层输入的指令，选取 Model 层中的数据，然后对其进行相应的操作，产生最终结果。</li>
<li>Model（模型）：应用程序中用于处理数据逻辑的部分。</li>
</ul>
<p>MVC 架构的好处是通过控制器层将视图层和模型层分离之后，当更改视图层代码后时，我们就不需要重新编译控制器层和模型层的代码了。</p>
<p>同样，如果业务流程发生改变也只需要变更模型层的代码就可以。</p>
<p>在实际开发中为了更好的 UI 效果，视图层需要经常变更，但是通过 MVC 架构，在变更视图层时，我们根本不需要对业务逻辑层的代码做任何变化，这不仅减少了风险还能提高代码变更和发布的效率。</p>
<p>除此之外，还有一种跟 MVC 比较相似的软件开发架构叫 [[三层架构]]，**它包括 UI 层、BLL 层和 DAL 层。**其中，UI 层表示用户界面，BLL 层表示业务逻辑，DAL 层表示数据访问。在实际开发中很多人将 MVC 当成三层架构在用，比如说，很多人喜欢把软件的业务逻辑放在 Controller 层里，将数据库访问操作的代码放在 Model 层里，软件最终的代码放在 View 层里，就这样硬生生将 MVC 架构变成了伪三层架构。</p>
<p>这种代码不仅不伦不类，同时也失去了三层架构和 MVC 架构的核心优势，也就是：<strong>通过 Controller 层将 Model 层和 View 层解耦，从而使代码更容易维护和扩展。</strong> 因此在实际开发中，我们也要注意遵循 MVC 架构的开发规范，发挥 MVC 的核心价值。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p><strong>总体来说，可以分为四个步骤：</strong></p>
<ol>
<li>首先，用户通过调用 iam-apiserver 提供的 RESTful API 接口完成注册和登录系统，再调用接口创建密钥和授权策略。</li>
<li>创建完密钥对和授权策略之后，IAM 可以通过调用 iam-authz-server 的授权接口完成资源的授权。具体来说，iam-authz-server 通过 gRPC 接口获取 iam-apiserver 中存储的密钥和授权策略信息，通过 JWT 完成认证之后，再通过 ory/ladon 包完成资源的授权。</li>
<li>接着，iam-pump 组件异步消费 Redis 中的数据，并持久化存储在 MongoDB 中，供 iam-operating-system 运营平台展示。</li>
<li>最后，IAM 相关的产品、研发人员可以通过 IAM 的运营系统 iam-operating-system 来查看 IAM 系统的使用情况，进行运营分析。例如某个用户的授权 / 失败次数、授权失败时的授权信息等。</li>
</ol>
<p>另外，为了提高开发和访问效率，IAM 分别提供了 marmotedu-sdk-go SDK 和 iamctl 命令行工具，二者通过 HTTPS 协议访问 IAM 提供的 RESTful 接口。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '0.md' style='float:left'>⬆️上一节🔗  </a><a href = '2.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


