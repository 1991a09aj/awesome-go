<template><div><ul>
<li><a href="https://github.com/cubxxw/iam" target="_blank" rel="noopener noreferrer">🔥 开源地址<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第12节-记录和设计日志" tabindex="-1"><a class="header-anchor" href="#第12节-记录和设计日志" aria-hidden="true">#</a> 第12节 记录和设计日志</h1>
<br>
<div><a href = '11.md' style='float:left'>⬆️上一节🔗  </a><a href = '13.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕During the winter vacation, I followed up and learned two projects: tiktok project and IAM project, and summarized and practiced the CloudNative project and Go language. I learned a lot in the process.Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#日志库介绍">日志库介绍</router-link></li><li><router-link to="#如何设计日志包">如何设计日志包</router-link><ul><li><router-link to="#基础功能">基础功能</router-link></li><li><router-link to="#高级功能">高级功能</router-link></li><li><router-link to="#可选功能">可选功能</router-link></li></ul></li><li><router-link to="#设计日志包时需要关注的点">设计日志包时需要关注的点</router-link></li><li><router-link to="#日志记录">日志记录</router-link><ul><li><router-link to="#在何处打印日志">在何处打印日志</router-link></li><li><router-link to="#在哪个日志级别打印日志">在哪个日志级别打印日志？</router-link></li><li><router-link to="#如何记录日志内容">如何记录日志内容</router-link></li></ul></li><li><router-link to="#记录日志的-最佳-实践总结">记录日志的“最佳”实践总结</router-link></li><li><router-link to="#扩展-分布式日志解决方案-efk-elk">扩展：分布式日志解决方案 （EFK/ELK）</router-link></li><li><router-link to="#总结">总结</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="日志库介绍" tabindex="-1"><a class="header-anchor" href="#日志库介绍" aria-hidden="true">#</a> 日志库介绍</h2>
<p>在做 Go 项目开发时，除了处理错误之外，我们必须要做的另外一件事是记录日志。通过记录日志，可以完成一些基本功能，比如开发、测试期间的 Debug，故障排除，数据分析，监控告警，以及记录发生的事件等。</p>
<p>要实现这些功能，首先我们需要一个优秀的日志包。另外，我还发现不少 Go 项目开发者记录日志很随意，输出的日志并不能有效定位到问题。所以，我们还需要知道怎么更好地记录日志，这就需要一个日志记录规范。</p>
<p>有了优秀的日志包和日志记录规范，我们就能很快地定位到问题，获取足够的信息，并完成后期的数据分析和监控告警，也可以很方便地进行调试了。这一讲，我就来详细介绍下，如何设计日志包和日志记录规范。</p>
<p>Go语言提供了一个内置的日志库<code v-pre>log</code>，但是如果你需要更高级的日志功能，你可以使用第三方库，或者自己开发一个日志库。下面是设计和开发一个日志库的一些步骤：</p>
<p><strong>1. 定义日志级别</strong></p>
<p>首先，你需要定义你的日志级别。通常，日志级别从低到高包括<code v-pre>debug</code>、<code v-pre>info</code>、<code v-pre>warning</code>、<code v-pre>error</code>、<code v-pre>fatal</code>等级别。你需要决定你需要的日志级别和对应的数字等级。</p>
<p><strong>2. 定义日志输出格式</strong></p>
<p>接下来，你需要定义日志的输出格式。通常，日志格式包括日期、时间、日志级别、日志内容等。你可以使用Go的fmt包来格式化日志。</p>
<p><strong>3. 定义日志输出方式</strong></p>
<p>你需要决定你的日志输出方式。你可以将日志输出到控制台、文件、数据库或其他位置。如果你需要将日志输出到多个位置，你可以创建多个输出器。</p>
<p><strong>4. 创建日志器</strong></p>
<p>一旦你定义了日志级别、日志输出格式和输出方式，你需要创建一个日志器，它可以接受日志消息并将其写入指定的输出位置。你可以使用Go的结构体来创建一个日志器。</p>
<p><strong>5. 编写日志函数</strong></p>
<p>你需要编写日志函数，这些函数将消息写入日志器。你可以为每个日志级别创建一个函数，并在函数中将消息和级别传递给日志器。如果你的日志器使用了多个输出器，你需要确保每个输出器都能正确处理消息。</p>
<p><strong>6. 添加可选项</strong></p>
<p>你可以添加一些可选项来增强你的日志库。例如，你可以添加一个选项来设置日志文件的最大大小，当达到最大大小时自动创建新文件。或者你可以添加一个选项来设置是否在控制台上显示调试日志。</p>
<p>最后，一旦你开发好了日志库，你可以在你的Go应用程序中使用它来记录日志。</p>
<h2 id="如何设计日志包" tabindex="-1"><a class="header-anchor" href="#如何设计日志包" aria-hidden="true">#</a> 如何设计日志包</h2>
<p>目前，虽然有很多优秀的开源日志包可供我们选择，但在一个大型系统中，这些开源日志包很可能无法满足我们定制化的需求，这时候我们就需要自己开发日志包。</p>
<p>这些日志包可能是基于某个，或某几个开源的日志包改造而来，也可能是全新开发的日志包。那么在开发日志包时，我们需要实现哪些功能，又如何实现呢？接下来，我们就来详细聊聊。</p>
<p>先来看下日志包需要具备哪些功能。根据功能的重要性，我将日志包需要实现的功能分为<strong>基础功能</strong>、<strong>高级功能</strong>和<strong>可选功能</strong>。基础功能是一个日志包必须要具备的功能；高级功能、可选功能都是在特定场景下可增加的功能。</p>
<h3 id="基础功能" tabindex="-1"><a class="header-anchor" href="#基础功能" aria-hidden="true">#</a> 基础功能</h3>
<p>基础功能，是优秀日志包必备的功能，能够满足绝大部分的使用场景，适合一些中小型的项目。一个日志包应该具备以下 4 个基础功能。</p>
<h4 id="支持基本的日志信息" tabindex="-1"><a class="header-anchor" href="#支持基本的日志信息" aria-hidden="true">#</a> 支持基本的日志信息</h4>
<p>日志包需要支持基本的日志信息，包括时间戳、文件名、行号、日志级别和日志信息。</p>
<p>时间戳可以记录日志发生的时间。在定位问题时，我们往往需要根据时间戳，来复原请求过程，核对相同时间戳下的上下文，从而定位出问题。</p>
<p><strong>文件名</strong>和<strong>行号</strong>，可以使我们更快速定位到打印日志的位置，找到问题代码。一个日志库如果不支持文件名和行号，排查故障就会变得非常困难，基本只能靠 grep 和记忆来定位代码。对于企业级的服务，需要保证服务在故障后能够快速恢复，恢复的时间越久，造成的损失就越大，影响就越大。这就要求研发人员能够快速定位并解决问题。通过文件名和行号，我们可以精准定位到问题代码，尽快地修复问题并恢复服务。</p>
<p>通过<strong>日志级别</strong>，可以知道日志的错误类型，最通常的用法是：直接过滤出 Error 级别的日志，这样就可以直接定位出问题出错点，然后再结合其他日志定位出出错的原因。如果不支持日志级别，在定位问题时，可能要查看一大堆无用的日志。在大型系统中，一次请求的日志量很多，这会大大延长我们定位问题的时间。</p>
<p>而通过日志信息，我们可以知道错误发生的具体原因。</p>
<h4 id="支持不同的日志级别" tabindex="-1"><a class="header-anchor" href="#支持不同的日志级别" aria-hidden="true">#</a> 支持不同的日志级别</h4>
<p>不同的日志级别代表不同的日志类型，例如：</p>
<ul>
<li><strong>Error 级别的日志</strong>，说明日志是错误类型，在排障时，会首先查看错误级别的日志。</li>
<li><strong>Warn 级别日志说明出现异常</strong>，但还不至于影响程序运行，如果程序执行的结果不符合预期，则可以参考 Warn 级别的日志，定位出异常所在。</li>
<li>**Info 级别的日志，**可以协助我们 Debug，并记录一些有用的信息，供后期进行分析。</li>
</ul>
<p>通常一个日志包至少要实现 6 个级别，我给你提供了一张表格，按优先级从低到高排列如下：
<img src="http://sm.nsddd.top/sm202302221652290.png" alt="在这里插入图片描述">
有些日志包，例如 <code v-pre>logrus</code>，还支持 <code v-pre>Trace</code> 日志级别。<code v-pre>Trace</code> 级别比 <code v-pre>Debug</code> 级别还低，能够打印更细粒度的日志信息。在我看来，<code v-pre>Trace</code> 级别不是必须的，你可以根据需要自行选择。打印日志时，一个日志调用其实具有两个属性：</p>
<ul>
<li>输出级别：打印日志时，我们期望日志的输出级别。例如，我们调用 <code v-pre>glog.Info(“This is info message”)</code> 打印一条日志，则输出日志级别为 Info。</li>
<li>开关级别：启动应用程序时，期望哪些输出级别的日志被打印。例如，使用 <code v-pre>glog 时 -v=4</code> ，说明了只有日志级别高于 4 的日志才会被打印。</li>
</ul>
<p>如果开关级别设置为 L ，只有输出级别 <code v-pre>&gt;=L</code> 时，日志才会被打印。例如，开关级别为 Warn，则只会记录 <code v-pre>Warn</code>、<code v-pre>Error</code> 、<code v-pre>Panic</code> 和 <code v-pre>Fatal</code> 级别的日志。具体的输出关系如下图所示：
<img src="http://sm.nsddd.top/sm202304181832774.png" alt="在这里插入图片描述"></p>
<h4 id="支持自定义配置" tabindex="-1"><a class="header-anchor" href="#支持自定义配置" aria-hidden="true">#</a> 支持自定义配置</h4>
<p>不同的运行环境，需要不同的日志输出配置，例如：开发测试环境为了能够方便地 Debug，需要设置日志级别为 Debug 级别；现网环境为了提高应用程序的性能，则需要设置日志级别为 Info 级别。又比如，现网环境为了方便日志采集，通常会输出 <code v-pre>JSON</code> 格式的日志；开发测试环境为了方便查看日志，会输出 <code v-pre>TEXT</code> 格式的日志。所以，我们的日志包需要能够被配置，还要不同环境采用不同的配置。通过配置，可以在不重新编译代码的情况下，改变记录日志的行为。</p>
<h4 id="支持输出到标准输出和文件" tabindex="-1"><a class="header-anchor" href="#支持输出到标准输出和文件" aria-hidden="true">#</a> 支持输出到标准输出和文件</h4>
<p>日志总是要被读的，要么输出到标准输出，供开发者实时读取，要么保存到文件，供开发者日后查看。输出到标准输出和保存到文件是一个日志包最基本的功能。</p>
<h3 id="高级功能" tabindex="-1"><a class="header-anchor" href="#高级功能" aria-hidden="true">#</a> 高级功能</h3>
<p>除了上面提到的这些基本功能外，在一些大型系统中，通常还会要求日志包具备一些高级功能。这些高级功能可以帮我们更好地记录日志，并实现更丰富的功能，例如日志告警。那么一个日志包可以具备哪些高级功能呢？</p>
<h4 id="支持多种日志格式" tabindex="-1"><a class="header-anchor" href="#支持多种日志格式" aria-hidden="true">#</a> 支持多种日志格式</h4>
<p>日志格式也是我们要考虑的一个点，一个好的日志格式，不仅方便查看日志，还能方便一些日志采集组件采集日志，并对接类似 Elasticsearch 这样的日志搜索引擎。</p>
<p><strong>一个日志包至少需要提供以下两种格式：</strong></p>
<ul>
<li>
<p>TEXT 格式：TEXT 格式的日志具有良好的可读性，可以方便我们在开发联调阶段查看日志，例如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">2020</span>-12-02T01:16:18+08:00 INFO example.go:11 std log
<span class="token number">2020</span>-12-02T01:16:18+08:00 DEBUG example.go:13 change std log to debug level
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>JSON 格式：JSON 格式的日志可以记录更详细的信息，日志中包含一些通用的或自定义的字段，可供日后的查询、分析使用，而且可以很方便地供 filebeat、logstash 这类日志采集工具采集并上报。下面是 JSON 格式的日志：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span><span class="token property">"level"</span><span class="token operator">:</span><span class="token string">"DEBUG"</span><span class="token punctuation">,</span><span class="token property">"time"</span><span class="token operator">:</span><span class="token string">"2020-12-02T01:16:18+08:00"</span><span class="token punctuation">,</span><span class="token property">"file"</span><span class="token operator">:</span><span class="token string">"example.go:15"</span><span class="token punctuation">,</span><span class="token property">"func"</span><span class="token operator">:</span><span class="token string">"main.main"</span><span class="token punctuation">,</span><span class="token property">"message"</span><span class="token operator">:</span><span class="token string">"log in json format"</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">"level"</span><span class="token operator">:</span><span class="token string">"INFO"</span><span class="token punctuation">,</span><span class="token property">"time"</span><span class="token operator">:</span><span class="token string">"2020-12-02T01:16:18+08:00"</span><span class="token punctuation">,</span><span class="token property">"file"</span><span class="token operator">:</span><span class="token string">"example.go:16"</span><span class="token punctuation">,</span><span class="token property">"func"</span><span class="token operator">:</span><span class="token string">"main.main"</span><span class="token punctuation">,</span><span class="token property">"message"</span><span class="token operator">:</span><span class="token string">"another log in json format"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p>建议在开发联调阶段使用 TEXT 格式的日志，在现网环境使用 JSON 格式的日志。一个优秀的日志库，例如 logrus，除了提供基本的输出格式外，还应该允许开发者自定义日志输出格式。</p>
<h4 id="能够按级别分类输出" tabindex="-1"><a class="header-anchor" href="#能够按级别分类输出" aria-hidden="true">#</a> 能够按级别分类输出</h4>
<p>为了能够快速定位到需要的日志，一个比较好的做法是将日志按级别分类输出，至少错误级别的日志可以输出到独立的文件中。这样，出现问题时，可以直接查找错误文件定位问题。例如，<a href="https://github.com/golang/glog" target="_blank" rel="noopener noreferrer">glog<ExternalLinkIcon/></a> 就支持分类输出，如下图所示：</p>
<p><img src="http://sm.nsddd.top/sm202302221700579.png" alt="image-20230222170016532"></p>
<h4 id="支持结构化日志" tabindex="-1"><a class="header-anchor" href="#支持结构化日志" aria-hidden="true">#</a> 支持结构化日志</h4>
<p>结构化日志（Structured Logging），就是使用 JSON 或者其他编码方式使日志结构化，这样可以方便后续使用 Filebeat、Logstash Shipper 等各种工具，对日志进行采集、过滤、分析和查找。就像下面这个案例，使用 zap 进行日志打印：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"time"</span>

    <span class="token string">"go.uber.org/zap"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    logger<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> zap<span class="token punctuation">.</span><span class="token function">NewProduction</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">defer</span> logger<span class="token punctuation">.</span><span class="token function">Sync</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// flushes buffer, if any</span>
    url <span class="token operator">:=</span> <span class="token string">"http://marmotedu.com"</span>
    <span class="token comment">// 结构化日志打印</span>
    logger<span class="token punctuation">.</span><span class="token function">Sugar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Infow</span><span class="token punctuation">(</span><span class="token string">"failed to fetch URL"</span><span class="token punctuation">,</span> <span class="token string">"url"</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> <span class="token string">"attempt"</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">"backoff"</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>

    <span class="token comment">// 非结构化日志打印</span>
    logger<span class="token punctuation">.</span><span class="token function">Sugar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Infof</span><span class="token punctuation">(</span><span class="token string">"failed to fetch URL: %s"</span><span class="token punctuation">,</span> url<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>上述代码输出为：</strong></p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span><span class="token property">"level"</span><span class="token operator">:</span><span class="token string">"info"</span><span class="token punctuation">,</span><span class="token property">"ts"</span><span class="token operator">:</span><span class="token number">1607303966.9903321</span><span class="token punctuation">,</span><span class="token property">"caller"</span><span class="token operator">:</span><span class="token string">"zap/structured_log.go:14"</span><span class="token punctuation">,</span><span class="token property">"msg"</span><span class="token operator">:</span><span class="token string">"failed to fetch URL"</span><span class="token punctuation">,</span><span class="token property">"url"</span><span class="token operator">:</span><span class="token string">"http://marmotedu.com"</span><span class="token punctuation">,</span><span class="token property">"attempt"</span><span class="token operator">:</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token property">"backoff"</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">"level"</span><span class="token operator">:</span><span class="token string">"info"</span><span class="token punctuation">,</span><span class="token property">"ts"</span><span class="token operator">:</span><span class="token number">1607303966.9904354</span><span class="token punctuation">,</span><span class="token property">"caller"</span><span class="token operator">:</span><span class="token string">"zap/structured_log.go:17"</span><span class="token punctuation">,</span><span class="token property">"msg"</span><span class="token operator">:</span><span class="token string">"failed to fetch URL: http://marmotedu.com"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="支持日志轮转" tabindex="-1"><a class="header-anchor" href="#支持日志轮转" aria-hidden="true">#</a> 支持日志轮转</h4>
<p>在一个大型项目中，一天可能会产生几十个 G 的日志。为了防止日志把磁盘空间占满，导致服务器或者程序异常，就需要确保日志大小达到一定量级时，对日志进行切割、压缩，并转存。</p>
<p>如何切割呢？你可以按照日志大小进行切割，也可以按日期切割。日志的切割、压缩和转存功能可以基于 GitHub 上一些优秀的开源包来封装，例如：<a href="https://github.com/natefinch/lumberjack" target="_blank" rel="noopener noreferrer">lumberjack<ExternalLinkIcon/></a>可以支持按大小和日期归档日志，<a href="https://time.geekbang.org/column/article/393905" target="_blank" rel="noopener noreferrer">file-rotatelogs<ExternalLinkIcon/></a>支持按小时数进行日志切割。</p>
<h4 id="具备-hook-能力" tabindex="-1"><a class="header-anchor" href="#具备-hook-能力" aria-hidden="true">#</a> 具备 Hook 能力</h4>
<p><strong>介绍：什么是 Hook 能力：</strong></p>
<blockquote>
<p>在软件开发中，Hook指的是一种机制，它允许你在程序执行过程中动态地修改或增强其行为。具体而言，Hook机制允许你在程序中定义一些特定的回调函数，当程序执行到特定的位置时，会自动调用这些回调函数。这些回调函数可以修改程序的行为、增强其功能、记录日志等。</p>
<p>在编程中，Hook能力是指框架、库或系统提供给开发者的可以扩展、修改其行为的能力。通常，**Hook能力通过提供可扩展的接口、事件处理程序、钩子等机制来实现。**Hook能力可以使软件更加灵活、可定制、可扩展。</p>
<p>例如，在Web开发中，HTTP框架通常提供Hook能力，允许开发者定义一些特定的回调函数，例如中间件，当HTTP请求到达时，这些回调函数会按照定义的顺序依次执行。这些回调函数可以用于身份验证、日志记录、错误处理、缓存等。通过使用Hook能力，开发者可以轻松地扩展HTTP框架的功能，实现更多的业务逻辑。</p>
<p>又如，在版本控制系统中，Hook能力允许你定义一些回调函数，例如在提交代码之前进行代码检查，在代码合并之后发送邮件通知等。通过使用Hook能力，你可以在版本控制系统中实现一些特定的行为，使你的代码更加健壮和高效。</p>
<p>总之，Hook能力是一种重要的软件设计原则，它能够提高软件的灵活性和可扩展性，使软件更加适应不同的业务需求。</p>
</blockquote>
<p><strong>Hook 能力可以使我们对日志内容进行自定义处理。</strong> 例如，当某个级别的日志产生时，发送邮件或者调用告警接口进行告警。很多优秀的开源日志包提供了 Hook 能力，例如 logrus 和 zap。</p>
<p>在一个大型系统中，日志告警是非常重要的功能，但更好的实现方式是将告警能力做成旁路功能。通过旁路功能，可以保证日志包功能聚焦、简洁。例如：可以将日志收集到 Elasticsearch，并通过 ElastAlert 进行日志告警。</p>
<h3 id="可选功能" tabindex="-1"><a class="header-anchor" href="#可选功能" aria-hidden="true">#</a> 可选功能</h3>
<p>除了基础功能和高级功能外，还有一些功能。这些功能不会影响到日志包的核心功能，但是如果具有这些功能，会使日志包更加易用。比如下面的这三个功能。</p>
<h4 id="支持颜色输出" tabindex="-1"><a class="header-anchor" href="#支持颜色输出" aria-hidden="true">#</a> 支持颜色输出</h4>
<p>在开发、测试时开启颜色输出，不同级别的日志会被不同颜色标识，这样我们可以很轻松地发现一些 Error、Warn 级别的日志，方便开发调试。发布到生产环境时，可以关闭颜色输出，以提高性能。</p>
<h4 id="兼容标准库-log-包" tabindex="-1"><a class="header-anchor" href="#兼容标准库-log-包" aria-hidden="true">#</a> 兼容标准库 log 包</h4>
<p>一些早期的 Go 项目大量使用了标准库 log 包，如果我们的日志库能够兼容标准库 log 包，我们就可以很容易地替换掉标准库 log 包。例如，logrus 就兼容标准库 log 包。这里，我们来看一个使用了标准库 log 包的代码：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"log"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"call Print: line1"</span><span class="token punctuation">)</span>
    log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"call Println: line2"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只需要使用<code v-pre>log &quot;github.com/sirupsen/logrus&quot;</code>替换&quot;log&quot;就可以完成标准库 log 包的切换：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    log <span class="token string">"github.com/sirupsen/logrus"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"call Print: line1"</span><span class="token punctuation">)</span>
    log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"call Println: line2"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="支持输出到不同的位置" tabindex="-1"><a class="header-anchor" href="#支持输出到不同的位置" aria-hidden="true">#</a> 支持输出到不同的位置</h4>
<p>在分布式系统中，一个服务会被部署在多台机器上，这时候如果我们要查看日志，就需要分别登录不同的机器查看，非常麻烦。我们更希望将日志统一投递到 Elasticsearch 上，在 Elasticsearch 上查看日志。</p>
<p>我们还可能需要从日志中分析某个接口的调用次数、某个用户的请求次数等信息，这就需要我们能够对日志进行处理。一般的做法是将日志投递到 Kafka，数据处理服务消费 Kafka 中保存的日志，从而分析出调用次数等信息。</p>
<p>以上两种场景，分别需要把日志投递到 <code v-pre>Elasticsearch</code>、<code v-pre>Kafka</code> 等组件，如果我们的日志包支持将日志投递到不同的目的端，那会是一项非常让人期待的功能：</p>
<p><img src="http://sm.nsddd.top/sm202302221714536.png" alt="image-20230222171407474"></p>
<h2 id="设计日志包时需要关注的点" tabindex="-1"><a class="header-anchor" href="#设计日志包时需要关注的点" aria-hidden="true">#</a> 设计日志包时需要关注的点</h2>
<p>上面，我们介绍了日志包具备的功能，这些功能可以指导我们完成日志包设计。这里，我们再来看下设计日志包时，我们还需要关注的几个层面：</p>
<ul>
<li><strong>高性能</strong>：因为我们要在代码中频繁调用日志包，记录日志，所以日志包的性能是首先要考虑的点，一个性能很差的日志包必然会导致整个应用性能很差。</li>
<li><strong>并发安全</strong>：Go 应用程序会大量使用 Go 语言的并发特性，也就意味着需要并发地记录日志，这就需要日志包是并发安全的。</li>
<li><strong>插件化能力</strong>：日志包应该能提供一些插件化的能力，比如允许开发者自定义输出格式，自定义存储位置，自定义错误发生时的行为（例如 告警、发邮件等）。插件化的能力不是必需的，因为日志自身的特性就能满足绝大部分的使用需求，例如：输出格式支持 JSON 和 TEXT，存储位置支持标准输出和文件，日志监控可以通过一些旁路系统来实现。</li>
<li><strong>日志参数控制</strong>：日志包应该能够灵活地进行配置，初始化时配置或者程序运行时配置。例如：初始化配置可以通过 Init 函数完成，运行时配置可以通过 SetOptions / SetLevel 等函数来完成。</li>
</ul>
<h2 id="日志记录" tabindex="-1"><a class="header-anchor" href="#日志记录" aria-hidden="true">#</a> 日志记录</h2>
<p>前面我们介绍了在设计日志包时，要包含的一些功能、实现方法和注意事项。但在这个过程中，还有一项重要工作需要注意，那就是日志记录问题。</p>
<p>日志并不是越多越好，在实际开发中，经常会遇到一大堆无用的日志，却没有我们需要的日志；或者有效的日志被大量无用的日志淹没，查找起来非常困难。</p>
<p>一个优秀的日志包可以协助我们更好地记录、查看和分析日志，但是如何记录日志决定了我们能否获取到有用的信息。日志包是工具，日志记录才是灵魂。这里，我就来详细讲讲如何记录日志。</p>
<h3 id="在何处打印日志" tabindex="-1"><a class="header-anchor" href="#在何处打印日志" aria-hidden="true">#</a> 在何处打印日志</h3>
<p>日志主要是用来定位问题的，所以整体来说，我们要在有需要的地方打印日志。那么具体是哪些地方呢？我给你几个建议。</p>
<ul>
<li><strong>在分支语句处打印日志</strong>。在分支语句处打印日志，可以判断出代码走了哪个分支，有助于判断请求的下一跳，继而继续排查问题。</li>
<li><strong>写操作必须打印日志</strong>。写操作最可能会引起比较严重的业务故障，写操作打印日志，可以在出问题时找到关键信息。</li>
<li><strong>在循环中打印日志要慎重</strong>。如果循环次数过多，会导致打印大量的日志，严重拖累代码的性能，建议的办法是在循环中记录要点，在循环外面总结打印出来。</li>
<li><strong>在错误产生的最原始位置打印日志</strong>。对于嵌套的 Error，可在 Error 产生的最初位置打印 Error 日志，上层如果不需要添加必要的信息，可以直接返回下层的 Error。</li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"flag"</span>
    <span class="token string">"fmt"</span>

    <span class="token string">"github.com/golang/glog"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">defer</span> glog<span class="token punctuation">.</span><span class="token function">Flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">loadConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        glog<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">loadConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">decodeConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 直接返回</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">decodeConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">readConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"could not decode configuration data for user %s: %v"</span><span class="token punctuation">,</span> <span class="token string">"colin"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span> <span class="token comment">// 添加必要的信息，用户名称</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">readConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
    glog<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read: end of input."</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"read: end of input"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过在最初产生错误的位置打印日志，我们可以很方便地追踪到日志的根源，进而在上层追加一些必要的信息。这可以让我们了解到该错误产生的影响，有助于排障。另外，直接返回下层日志，还可以减少重复的日志打印。</p>
<p><strong>当代码调用第三方包的函数，且第三方包函数出错时，会打印错误信息。比如：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">if</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Chdir</span><span class="token punctuation">(</span><span class="token string">"/root"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"change dir failed: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="在哪个日志级别打印日志" tabindex="-1"><a class="header-anchor" href="#在哪个日志级别打印日志" aria-hidden="true">#</a> 在哪个日志级别打印日志？</h3>
<p>不同级别的日志，具有不同的意义，能实现不同的功能，在开发中，我们应该根据目的，在合适的级别记录日志，这里我同样给你一些建议。</p>
<h4 id="debug-级别" tabindex="-1"><a class="header-anchor" href="#debug-级别" aria-hidden="true">#</a> Debug 级别</h4>
<p>为了获取足够的信息进行 Debug，通常会在 Debug 级别打印很多日志。例如，可以打印整个 HTTP 请求的请求 Body 或者响应 Body。</p>
<p>Debug 级别需要打印大量的日志，这会严重拖累程序的性能。并且，Debug 级别的日志，主要是为了能在开发测试阶段更好地 Debug，多是一些不影响现网业务的日志信息。所以，对于 Debug 级别的日志，在服务上线时我们一定要禁止掉。否则，就可能会因为大量的日志导致硬盘空间快速用完，从而造成服务宕机，也可能会影响服务的性能和产品体验。</p>
<p>Debug 这个级别的日志可以随意输出，任何你觉得有助于开发、测试阶段调试的日志，都可以在这个级别打印。</p>
<h4 id="info-级别" tabindex="-1"><a class="header-anchor" href="#info-级别" aria-hidden="true">#</a> Info 级别</h4>
<p>Info 级别的日志可以记录一些有用的信息，供以后的运营分析，所以 Info 级别的日志不是越多越好，也不是越少越好，应以满足需求为主要目标。一些关键日志，可以在 Info 级别记录，但如果日志量大、输出频度过高，则要考虑在 Debug 级别记录。现网的日志级别一般是 Info 级别，为了不使日志文件占满整个磁盘空间，在记录日志时，要注意避免产生过多的 Info 级别的日志。例如，在 for 循环中，就要慎用 Info 级别的日志。</p>
<h4 id="warn-级别" tabindex="-1"><a class="header-anchor" href="#warn-级别" aria-hidden="true">#</a> Warn 级别</h4>
<p>一些警告类的日志可以记录在 Warn 级别，Warn 级别的日志往往说明程序运行异常，不符合预期，但又不影响程序的继续运行，或者是暂时影响，但后续会恢复。像这些日志，就需要你关注起来。Warn 更多的是业务级别的警告日志。</p>
<h4 id="error-级别" tabindex="-1"><a class="header-anchor" href="#error-级别" aria-hidden="true">#</a> Error 级别</h4>
<p>Error 级别的日志告诉我们程序执行出错，这些错误肯定会影响到程序的执行结果，例如请求失败、创建资源失败等。要记录每一个发生错误的日志，避免日后排障过程中这些错误被忽略掉。大部分的错误可以归在 Error 级别。</p>
<h4 id="panic-级别" tabindex="-1"><a class="header-anchor" href="#panic-级别" aria-hidden="true">#</a> Panic 级别</h4>
<p>Panic 级别的日志在实际开发中很少用，通常只在需要错误堆栈，或者不想因为发生严重错误导致程序退出，而采用 defer 处理错误时使用。</p>
<h4 id="fatal-级别" tabindex="-1"><a class="header-anchor" href="#fatal-级别" aria-hidden="true">#</a> Fatal 级别</h4>
<p>Fatal 是最高级别的日志，这个级别的日志说明问题已经相当严重，严重到程序无法继续运行，通常是系统级的错误。在开发中也很少使用，除非我们觉得某个错误发生时，整个程序无法继续运行。</p>
<p>这里用一张图来总结下，如何选择 Debug、Info、Warn、Error、Panic、Fatal 这几种日志级别。
<img src="http://sm.nsddd.top/sm202302221731344.png" alt="在这里插入图片描述"></p>
<h3 id="如何记录日志内容" tabindex="-1"><a class="header-anchor" href="#如何记录日志内容" aria-hidden="true">#</a> 如何记录日志内容</h3>
<p>关于如何记录日志内容，我有几条建议：</p>
<ul>
<li>在记录日志时，不要输出一些敏感信息，例如密码、密钥等。</li>
<li>了方便调试，通常会在 Debug 级别记录一些临时日志，这些日志内容可以用一些特殊的字符开头，例如 <code v-pre>log.Debugf(&quot;XXXXXXXXXXXX-1:Input key was: %s&quot;, setKeyName)</code> 。这样，在完成调试后，可以通过查找 <code v-pre>XXXXXXXXXXXX</code> 字符串，找到这些临时日志，在 commit 前删除。</li>
<li>日志内容应该小写字母开头，以英文点号 <code v-pre>.</code> 结尾，例如 <code v-pre>log.Info(&quot;update user function called.&quot;)</code> 。</li>
<li>为了提高性能，尽可能使用明确的类型，例如使用 <code v-pre>log.Warnf(&quot;init datastore: %s&quot;, err.Error())</code> 而非 <code v-pre>log.Warnf(&quot;init datastore: %v&quot;, err)</code> 。</li>
<li>根据需要，日志最好包含两个信息。一个是请求 ID（RequestID），是每次请求的唯一 ID，便于从海量日志中过滤出某次请求的日志，可以将请求 ID 放在请求的通用日志字段中。另一个是用户和行为，用于标识谁做了什么。</li>
<li>要将日志记录在错误的日志级别上。例如，我在项目开发中，经常会发现有同事将正常的日志信息打印在 Error 级别，将错误的日志信息打印在 Info 级别。</li>
</ul>
<h2 id="记录日志的-最佳-实践总结" tabindex="-1"><a class="header-anchor" href="#记录日志的-最佳-实践总结" aria-hidden="true">#</a> 记录日志的“最佳”实践总结</h2>
<p><strong>方便以后查看的一些总结：</strong></p>
<ul>
<li>开发调试、现网故障排障时，不要遗忘一件事情：根据排障的过程优化日志打印。好的日志，可能不是一次就可以写好的，可以在实际开发测试，还有现网定位问题时，不断优化。但这需要你重视日志，而不是把日志仅仅当成记录信息的一种方式，甚至不知道为什么打印一条 Info 日志。</li>
<li>打印日志要“不多不少”，避免打印没有作用的日志，也不要遗漏关键的日志信息。最好的信息是，仅凭借这些关键的日志就能定位到问题。</li>
<li>支持动态日志输出，方便线上问题定位。</li>
<li>总是将日志记录在本地文件：通过将日志记录在本地文件，可以和日志中心化平台进行解耦，这样当网络不可用，或者日志中心化平台故障时，仍然能够正常的记录日志。</li>
<li>集中化日志存储处理：因为应用可能包含多个服务，一个服务包含多个实例，为了查看日志方便，最好将这些日志统一存储在同一个日志平台上，例如 Elasticsearch，方便集中管理和查看日志。</li>
<li>结构化日志记录：添加一些默认通用的字段到每行日志，方便日志查询和分析。</li>
<li>支持 RequestID：使用 RequestID 串联一次请求的所有日志，这些日志可能分布在不同的组件，不同的机器上。支持 RequestID 可以大大提高排障的效率，降低排障难度。在一些大型分布式系统中，没有 RequestID 排障简直就是灾难。</li>
<li>支持动态开关 Debug 日志：对于定位一些隐藏得比较深的问题，可能需要更多的信息，这时候可能需要打印 Debug 日志。但现网的日志级别会设置为 Info 级别，为了获取 Debug 日志，我们可能会修改日志级别为 Debug 级别并重启服务，定位完问题后，再修改日志级别为 Info 级别，然后再重启服务，这种方式不仅麻烦而且还可能会对现网业务造成影响，最好的办法是能够在请求中通过 debug=true 这类参数动态控制某次请求是否开启 Debug 日志。</li>
</ul>
<h2 id="扩展-分布式日志解决方案-efk-elk" tabindex="-1"><a class="header-anchor" href="#扩展-分布式日志解决方案-efk-elk" aria-hidden="true">#</a> 扩展：分布式日志解决方案 （EFK/ELK）</h2>
<p>在实际 Go 项目开发中，为了实现高可用，同一个服务至少需要部署两个实例，通过轮询的负载均衡策略转发请求。另外，一个应用又可能包含多个服务。假设我们的应用包含两个服务，每个服务部署两个实例，如果应用出故障，我们可能需要登陆 4（2 x 2）台服务器查看本地的日志文件，定位问题，非常麻烦，会增加故障恢复时间。所以在真实的企业场景中，我们会将这些日志统一收集并展示。</p>
<p>在业界，日志的收集、处理和展示，早已经有了一套十分流行的日志解决方案：EFK（Elasticsearch + Filebeat + Kibana）或者 ELK（Elasticsearch + Logstash + Kibana），EFK 可以理解为 ELK 的演进版，把日志收集组件从 Logstash 替换成了 Filebeat。用 Filebeat 替换 Logstash，主要原因是 Filebeat 更轻量级，占用的资源更少。关于日志处理架构，你可以参考这张图。</p>
<p><img src="http://sm.nsddd.top/sm202302221740053.png" alt="在这里插入图片描述">
通过 log 包将日志记录在本地文件中（*.log 文件)，再通过 <code v-pre>Shipper</code> 收集到 <code v-pre>Kafka</code> 中。Shipper 可以根据需要灵活选择，常见的 Shipper 有 <code v-pre>Logstash Shipper</code>、<code v-pre>Flume</code>、<code v-pre>Fluentd</code>、<code v-pre>Filebeat</code>。其中 Filebeat 和 Logstash Shipper 用得最多。Shipper 没有直接将日志投递到 Logstash indexer，或者 Elasticsearch，是因为 Kafka 能够支持更大的吞吐量，起到削峰填谷的作用。</p>
<p>Kafka 中的日志消息会被 Logstash indexer 消费，处理后投递到 Elasticsearch 中存储起来。Elasticsearch 是实时全文搜索和分析引擎，提供搜集、分析、存储数据三大功能。Elasticsearch 中存储的日志，可以通过 Kibana 提供的图形界面来展示。Kibana 是一个基于 Web 的图形界面，用于搜索、分析和可视化存储在 Elasticsearch 中的日志数据。</p>
<p>Logstash 负责采集、转换和过滤日志。它支持几乎任何类型的日志，包括系统日志、错误日志和自定义应用程序日志。<code v-pre>Logstash</code> 又分为 Logstash Shipper 和 Logstash indexer。其中，Logstash Shipper 监控并收集日志，并将日志内容发送到 Logstash indexer，然后 Logstash indexer 过滤日志，并将日志提交给 Elasticsearch。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>记录日志，是应用程序必备的功能。记录日志最大的作用是排障，如果想更好地排障，我们需要一个优秀的工具，日志包。那么如何设计日志包呢？首先我们需要知道日志包的功能，在我看来日志包需要具备以下功能：</p>
<ul>
<li>基础功能：支持基本的日志信息、支持不同的日志级别、支持自定义配置、支持输出到标准输出和文件。</li>
<li>高级功能：支持多种日志格式、能够按级别分类输出、支持结构化日志、支持日志轮转、具备 Hook 能力。</li>
<li>可选功能：支持颜色输出、兼容标准库 log 包、支持输出到不同的位置。</li>
</ul>
<p>另外，一个日志包还需要支持不同级别的日志，按日志级别优先级从低到高分别是：<code v-pre>Trace &lt; Debug &lt; Info &lt; Warn/Warning &lt; Error &lt; Panic &lt; Fatal</code>。其中 Debug、Info、Warn、Error、Fatal 是比较基础的级别，建议在开发一个日志包时包含这些级别。Trace、Panic 是可选的级别。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '11.md' style='float:left'>⬆️上一节🔗  </a><a href = '13.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


