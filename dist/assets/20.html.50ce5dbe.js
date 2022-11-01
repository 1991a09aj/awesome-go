import{_ as c,r as i,o as r,c as p,a as n,b as a,w as e,e as s,d}from"./app.f18da10e.js";const u={},v=n("h1",{id:"mysql\u4F7F\u7528",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#mysql\u4F7F\u7528","aria-hidden":"true"},"#"),s(" Mysql\u4F7F\u7528")],-1),m={class:"table-of-contents"},h=s("\u65B0\u5EFAtest\u6570\u636E\u5E93\uFF0Cperson\u3001place \u8868"),k=s("mysql\u4F7F\u7528"),b=s("\u6216\u8BB8\u4F60\u53EF\u4EE5\u9009\u62E9mysql\u5E93"),_=s("END \u94FE\u63A5"),g=d(`<p>[toc]</p><h2 id="\u65B0\u5EFAtest\u6570\u636E\u5E93-person\u3001place-\u8868" tabindex="-1"><a class="header-anchor" href="#\u65B0\u5EFAtest\u6570\u636E\u5E93-person\u3001place-\u8868" aria-hidden="true">#</a> \u65B0\u5EFAtest\u6570\u636E\u5E93\uFF0Cperson\u3001place \u8868</h2><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>CREATE TABLE \`person\` (
    \`user_id\` int(11) NOT NULL AUTO_INCREMENT,
    \`username\` varchar(260) DEFAULT NULL,
    \`sex\` varchar(260) DEFAULT NULL,
    \`email\` varchar(260) DEFAULT NULL,
    PRIMARY KEY (\`user_id\`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE place (
    country varchar(200),
    city varchar(200),
    telcode int
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
    mysql&gt; desc person;
    +----------+--------------+------+-----+---------+----------------+
    | Field    | Type         | Null | Key | Default | Extra          |
    +----------+--------------+------+-----+---------+----------------+
    | user_id  | int(11)      | NO   | PRI | NULL    | auto_increment |
    | username | varchar(260) | YES  |     | NULL    |                |
    | sex      | varchar(260) | YES  |     | NULL    |                |
    | email    | varchar(260) | YES  |     | NULL    |                |
    +----------+--------------+------+-----+---------+----------------+
    4 rows in set (0.00 sec)

    mysql&gt; desc place;
    +---------+--------------+------+-----+---------+-------+
    | Field   | Type         | Null | Key | Default | Extra |
    +---------+--------------+------+-----+---------+-------+
    | country | varchar(200) | YES  |     | NULL    |       |
    | city    | varchar(200) | YES  |     | NULL    |       |
    | telcode | int(11)      | YES  |     | NULL    |       |
    +---------+--------------+------+-----+---------+-------+
    3 rows in set (0.01 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mysql\u4F7F\u7528-1" tabindex="-1"><a class="header-anchor" href="#mysql\u4F7F\u7528-1" aria-hidden="true">#</a> mysql\u4F7F\u7528</h2><div class="custom-container warning"><p class="custom-container-title">\u7ECF\u5E38\u4F7F\u7528\u7684\u5E93\uFF1A</p><ol><li><p><code>Gorm</code>\uFF1A</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code>user <span class="token operator">:=</span> User<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;jonson&quot;</span><span class="token punctuation">,</span> Age<span class="token punctuation">:</span> <span class="token number">18</span><span class="token punctuation">,</span> Birthday<span class="token punctuation">:</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
db<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>User<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>Xorm</code>\uFF1A</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code>user <span class="token operator">:=</span> User<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;jonson&quot;</span><span class="token punctuation">,</span> Age<span class="token punctuation">:</span> <span class="token number">18</span><span class="token punctuation">,</span> Birthday<span class="token punctuation">:</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
db<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>User<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ol></div><h2 id="\u6216\u8BB8\u4F60\u53EF\u4EE5\u9009\u62E9mysql\u5E93" tabindex="-1"><a class="header-anchor" href="#\u6216\u8BB8\u4F60\u53EF\u4EE5\u9009\u62E9mysql\u5E93" aria-hidden="true">#</a> \u6216\u8BB8\u4F60\u53EF\u4EE5\u9009\u62E9mysql\u5E93</h2><p>\u4F7F\u7528\u7B2C\u4E09\u65B9\u5F00\u6E90\u7684mysql\u5E93: <code>github.com/go-sql-driver/mysql</code> \uFF08mysql\u9A71\u52A8\uFF09 <code>github.com/jmoiron/sqlx</code> \uFF08\u57FA\u4E8Emysql\u9A71\u52A8\u7684\u5C01\u88C5\uFF09</p><p>\u547D\u4EE4\u884C\u8F93\u5165\uFF1A</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">go</span> get github<span class="token punctuation">.</span>com<span class="token operator">/</span><span class="token keyword">go</span><span class="token operator">-</span>sql<span class="token operator">-</span>driver<span class="token operator">/</span>mysql 
<span class="token keyword">go</span> get github<span class="token punctuation">.</span>com<span class="token operator">/</span>jmoiron<span class="token operator">/</span>sqlx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u94FE\u63A5<code>mysql</code>\uFF1A</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code>database<span class="token punctuation">,</span> err <span class="token operator">:=</span> sqlx<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">&quot;mysql&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;root:XXXX@tcp(127.0.0.1:3306)/test&quot;</span><span class="token punctuation">)</span>
<span class="token comment">//database, err := sqlx.Open(&quot;\u6570\u636E\u5E93\u7C7B\u578B&quot;, &quot;\u7528\u6237\u540D:\u5BC6\u7801@tcp(\u5730\u5740:\u7AEF\u53E3)/\u6570\u636E\u5E93\u540D&quot;)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="19.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517}</a><a href="21.md" style="float:right;">\u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,13),q=s("\u24C2\uFE0F\u56DE\u5230\u9996\u9875\u{1F3E0}"),E={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},y=n("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),f=s(")"),N=s("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 :\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),L={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},x=s("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function U(A,T){const t=i("router-link"),o=i("RouterLink"),l=i("ExternalLinkIcon");return r(),p("div",null,[v,n("nav",m,[n("ul",null,[n("li",null,[a(t,{to:"#\u65B0\u5EFAtest\u6570\u636E\u5E93-person\u3001place-\u8868"},{default:e(()=>[h]),_:1})]),n("li",null,[a(t,{to:"#mysql\u4F7F\u7528-1"},{default:e(()=>[k]),_:1})]),n("li",null,[a(t,{to:"#\u6216\u8BB8\u4F60\u53EF\u4EE5\u9009\u62E9mysql\u5E93"},{default:e(()=>[b]),_:1})]),n("li",null,[a(t,{to:"#end-\u94FE\u63A5"},{default:e(()=>[_]),_:1})])])]),g,n("ul",null,[n("li",null,[n("p",null,[a(o,{to:"/Gomd_super/"},{default:e(()=>[q]),_:1})])]),n("li",null,[n("p",null,[n("a",E,[y,a(l)]),f])]),n("li",null,[n("p",null,[N,n("a",L,[x,a(l)])])])])])}const w=c(u,[["render",U],["__file","20.html.vue"]]);export{w as default};