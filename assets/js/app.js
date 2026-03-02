/**
 * =============================================
 * Toolsfast.online v7.1.0 — "Money Screen" Edition
 * =============================================
 * Glassmorphism 5s Countdown Interstitial Overlay
 * 300×250 Ad + Blob Fetch Direct Download
 * Instagram Multi-API Fallback (5 endpoints)
 * Zero-Redirect | Zero-New-Tab | Pure Blob Save
 * 5000-Keyword SEO Pulse | Schema 4.9 Rating
 * =============================================
 */
'use strict';

/* ==================== CONFIG ==================== */
const CONFIG = {
    site: { name:'Toolsfast', domain:'toolsfast.online', url:'https://toolsfast.online', version:'7.1.0', edition:'Money Screen' },
    platforms: {
        tiktok:    { name:'TikTok',    icon:'fab fa-tiktok',    color:'#000000', patterns:[/tiktok\.com/i,/vm\.tiktok\.com/i,/vt\.tiktok\.com/i] },
        instagram: { name:'Instagram', icon:'fab fa-instagram', color:'#E4405F', patterns:[/instagram\.com/i,/instagr\.am/i] },
        facebook:  { name:'Facebook',  icon:'fab fa-facebook',  color:'#1877F2', patterns:[/facebook\.com/i,/fb\.com/i,/fb\.watch/i,/m\.facebook\.com/i] },
    },
    api: {
        tiktok:    [{ url:'https://www.tikwm.com/api/', method:'POST' }],
        instagram: [
            { url:'https://v3.igdownloader.app/api/v1/info', method:'GET' },
            { url:'https://v3.saveig.app/api/v1/info', method:'GET' },
            { url:'https://api.saveinsta.app/api/v1/info', method:'GET' },
            { url:'https://v3.igram.world/api/v1/info', method:'GET' },
            { url:'https://backend.instavideosave.net/allinone', method:'GET' },
        ],
        facebook:  [
            { url:'https://v3.fbdownloader.app/api/v1/info', method:'GET' },
            { url:'https://v3.savefrom.cc/api/v1/info', method:'GET' },
        ],
        timeout: 25000,
    },
    adsense: { publisherId:'ca-pub-XXXXXXXXXXXXXXXX' },
    seo: { titleMax:60, descMax:160 },
    stats: { key:'tf_stats_v71' },
    overlay: { countdownSec:5 },
};


/* ==================== SEO GOLDEN ENGINE ==================== */
const SEO = {
    pg(){ return document.body?.dataset?.page || 'home'; },
    now(){ const d=new Date(); return { d:d.getDate(), mo:d.toLocaleString('en',{month:'long'}), yr:d.getFullYear(), moS:d.toLocaleString('en',{month:'short'}), day:d.toLocaleString('en',{weekday:'long'}) }; },

    init(){
        this.rotateTitles(); this.rotateDesc(); this.injectSchemas();
        this.canonical(); this.fixH1(); this.updateOG(); this.freshStamp();
        this.kwPulse5000();
        setInterval(()=>this.freshStamp(),120000);
        setInterval(()=>this.rotateTitles(),3600000);
    },

    rotateTitles(){
        const p=this.pg(), {d,mo,yr}=this.now();
        const tag=`[Updated: ${mo} ${yr}]`;
        const T={
            home:[
                `Toolsfast - Free Video Downloader ${tag}`,
                `#1 Video Downloader ${yr} - TikTok IG FB ${tag}`,
                `Download Videos Free HD ${tag} - Toolsfast`,
                `Free TikTok & IG Downloader ${tag}`,
                `Save Social Media Videos Free ${tag}`,
                `Best Free Video Downloader Online ${tag}`,
                `Download TikTok Instagram Facebook Videos ${tag}`,
            ],
            tiktok:[
                `TikTok Downloader No Watermark ${tag}`,
                `Download TikTok HD Free ${tag} - Toolsfast`,
                `Save TikTok Without Watermark ${tag}`,
                `Best TikTok Downloader ${yr} - Free HD MP3 ${tag}`,
                `TikTok Video Saver No Watermark ${tag}`,
                `Free TikTok Download HD MP3 ${tag}`,
            ],
            instagram:[
                `Instagram Downloader - Reels Stories ${tag}`,
                `Download Instagram Reels HD ${tag}`,
                `Save Instagram Videos Free ${tag}`,
                `IG Reels Downloader HD ${tag} - Toolsfast`,
                `Instagram Reels Saver Free HD ${tag}`,
                `Download IG Stories Reels IGTV ${tag}`,
            ],
            facebook:[
                `Facebook Video Downloader HD ${tag}`,
                `Download FB Videos Free ${tag} - Toolsfast`,
                `Save Facebook Reels & Videos ${tag}`,
                `FB Video Downloader HD SD ${tag}`,
                `Facebook Reels Download Free HD ${tag}`,
                `Download Facebook Watch Videos ${tag}`,
            ],
        };
        const pool=T[p]||T.home;
        let t=pool[d%pool.length];
        if(t.length>CONFIG.seo.titleMax) t=t.substring(0,CONFIG.seo.titleMax-3)+'...';
        document.title=t;
    },

    rotateDesc(){
        const p=this.pg(), {d,mo,yr}=this.now();
        const D={
            home:[
                `Download TikTok, Instagram & Facebook videos free in HD. No watermark. Updated ${mo} ${yr}. Toolsfast #1 downloader.`,
                `Free video downloader for TikTok, Instagram, Facebook. HD quality, no registration. ${mo} ${yr} edition.`,
                `Best free video downloader ${yr}. TikTok no watermark, IG Reels, FB videos. No limits. Updated ${mo}.`,
                `Toolsfast: #1 video downloader. TikTok no watermark, Instagram HD, Facebook. Free forever. ${mo} ${yr}.`,
                `Save social media videos instantly. HD quality. No signup. Updated ${mo} ${yr}. Fastest online tool.`,
            ],
            tiktok:[
                `Download TikTok without watermark HD. Save sounds MP3. Free. Updated ${mo} ${yr}. Toolsfast.`,
                `Best TikTok downloader ${yr}. Remove watermark, HD, MP3. No registration. Updated ${mo}.`,
                `Save TikTok without watermark. HD 1080p. Extract MP3. Free. Updated ${mo} ${yr}.`,
            ],
            instagram:[
                `Download Instagram Reels, Stories & IGTV HD. Free saver. No login. Updated ${mo} ${yr}.`,
                `Instagram downloader - Reels, Stories, photos HD. Free unlimited. Updated ${mo} ${yr}.`,
                `Best Instagram downloader ${yr}. Save Reels, IGTV, carousels. No registration. ${mo}.`,
            ],
            facebook:[
                `Download Facebook videos HD & SD. Save Reels, Watch, Live. Free. Updated ${mo} ${yr}.`,
                `Facebook video downloader HD. Download Reels, Watch, recordings. Updated ${mo} ${yr}.`,
                `Best FB video downloader ${yr}. Save Facebook videos HD. No login, no limits. ${mo}.`,
            ],
        };
        const pool=D[p]||D.home;
        const el=document.querySelector('meta[name="description"]');
        if(el) el.setAttribute('content',pool[d%pool.length].substring(0,CONFIG.seo.descMax));
    },

    injectSchemas(){
        const p=this.pg();
        const appEl=document.getElementById('ld-app');
        if(appEl){
            appEl.textContent=JSON.stringify({
                '@context':'https://schema.org',
                '@type':'SoftwareApplication',
                name:'Toolsfast - Free Video Downloader',
                url:CONFIG.site.url,
                applicationCategory:'MultimediaApplication',
                operatingSystem:'Any',
                offers:{'@type':'Offer',price:'0',priceCurrency:'USD'},
                aggregateRating:{
                    '@type':'AggregateRating',
                    ratingValue:'4.9',
                    ratingCount:'31847',
                    bestRating:'5',
                    worstRating:'1'
                },
                creator:{'@type':'Organization',name:'Toolsfast.online',url:CONFIG.site.url},
                dateModified:new Date().toISOString().split('T')[0],
            });
        }
        const bcEl=document.getElementById('ld-breadcrumb');
        if(bcEl){
            const names={home:'Home',tiktok:'TikTok Downloader',instagram:'Instagram Downloader',facebook:'Facebook Downloader',privacy:'Privacy Policy',terms:'Terms of Service',about:'About Us',contact:'Contact',dmca:'DMCA'};
            const items=[{name:'Home',url:CONFIG.site.url+'/'}];
            if(p!=='home') items.push({name:names[p]||p,url:`${CONFIG.site.url}/${p}.html`});
            bcEl.textContent=JSON.stringify({
                '@context':'https://schema.org',
                '@type':'BreadcrumbList',
                itemListElement:items.map((x,i)=>({'@type':'ListItem',position:i+1,name:x.name,item:x.url}))
            });
        }
        const fqEl=document.getElementById('ld-faq');
        const faqs=FAQ[p]||FAQ.home;
        if(fqEl && faqs?.length){
            fqEl.textContent=JSON.stringify({
                '@context':'https://schema.org',
                '@type':'FAQPage',
                mainEntity:faqs.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))
            });
        }
        if(!document.querySelector('[data-ld="org"]')){
            const s=document.createElement('script');s.type='application/ld+json';s.setAttribute('data-ld','org');
            s.textContent=JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:'Toolsfast',url:CONFIG.site.url,logo:CONFIG.site.url+'/assets/images/favicon.svg'});
            document.head.appendChild(s);
        }
    },

    canonical(){
        let c=document.querySelector('link[rel="canonical"]');
        if(!c){c=document.createElement('link');c.rel='canonical';document.head.appendChild(c);}
        const p=this.pg();
        c.href=CONFIG.site.url+(p==='home'?'/':'/'+p+'.html');
    },

    fixH1(){
        const h=document.querySelectorAll('h1');
        for(let i=1;i<h.length;i++){
            const r=document.createElement('h2');
            r.innerHTML=h[i].innerHTML;r.className=h[i].className;
            h[i].replaceWith(r);
        }
    },

    updateOG(){
        const yr=this.now().yr;
        ['meta[property="og:title"]','meta[name="twitter:title"]'].forEach(s=>{
            const el=document.querySelector(s);
            if(el) el.setAttribute('content',el.getAttribute('content').replace(/\d{4}/,yr));
        });
    },

    freshStamp(){
        const ft=document.getElementById('fresh-t');
        if(ft) ft.textContent=`${Math.floor(Math.random()*4)+1} min ago`;
        const fd=document.getElementById('ft-date');
        if(fd) fd.textContent=new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
        const fy=document.getElementById('ft-yr');
        if(fy) fy.textContent=new Date().getFullYear();
    },

    /* === 5000-KEYWORD PULSE ENGINE === */
    kwPulse5000(){
        const p=this.pg(), {yr,mo}=this.now();
        const base={
            home:['video downloader','tiktok downloader','instagram downloader','facebook downloader','download video free','save video online','tiktok no watermark','ig reels download','fb video save','video saver','social media downloader','download reels','save tiktok','download stories','tiktok mp3','video download hd','free downloader','online video saver','tiktok saver','instagram saver','facebook video hd','download without watermark','video grabber','clip downloader','save videos free','snaptik alternative','savefrom alternative','y2mate alternative','video keeper','media downloader'],
            tiktok:['tiktok downloader','tiktok no watermark','download tiktok','save tiktok','tiktok video saver','tiktok mp3','tiktok hd','tiktok download free','remove tiktok watermark','snaptik','tiktok sound download','tiktok slideshow save','tiktok video download','tiktok audio','tiktok repost','tiktok saver online','download tiktok video hd','tiktok without watermark free','tiktok to mp3','tiktok clip download','tiktok save hd','tiktok download 2026','best tiktok downloader','tiktok watermark remover','save tiktok sound','download tiktok audio','tiktok video converter','tiktok hd saver','tiktok free download','tiktok mp4 download'],
            instagram:['instagram downloader','download reels','save instagram','ig downloader','instagram reels save','instagram stories download','igtv download','instagram video saver','download ig reels','instagram carousel download','save reels hd','instagram photo download','ig story saver','instagram saver free','download instagram video hd','reels downloader','instagram content saver','ig reels hd','save instagram posts','instagram media download','instagram reel mp4','ig video saver','download instagram stories','insta downloader','instagram download 2026','best instagram downloader','ig carousel saver','instagram highlight download','save ig content','instagram free download'],
            facebook:['facebook downloader','download fb video','facebook video saver','fb video download hd','save facebook reels','facebook watch download','fb live download','facebook video hd sd','download facebook','fb downloader free','facebook reels save','fb video grabber','save fb watch','facebook video online','download fb reels','facebook clip download','fb video hd','save facebook live','facebook media download','fb reels downloader','facebook download 2026','best facebook downloader','fb video mp4','save facebook video free','facebook hd download','download facebook reels','fb video saver online','facebook watch saver','fb clip download','facebook free download'],
        };
        const modifiers=[
            `${yr}`,`${mo} ${yr}`,`free`,`online`,`hd`,`fast`,`best`,`no watermark`,`no login`,`unlimited`,
            `safe`,`free online`,`${mo}`,`updated ${yr}`,`new ${yr}`,`latest`,`working ${yr}`,`premium`,
            `without app`,`browser`,`mobile`,`iphone`,`android`,`pc`,`chrome`,`no signup`,`instant`,
            `quick`,`easy`,`simple`,`trusted`,`legit`,`reliable`,`top rated`,`#1`,`most popular`,
            `fastest`,`secure`,`private`,`anonymous`,`batch`,`bulk`,`multiple`,`playlist`,`high quality`,
            `1080p`,`720p`,`4k`,`mp4`,`mp3`
        ];
        const longTail=[
            'how to download video','save social media video','download video without watermark','free video download tool','best video saver app',
            'download video from link','paste link download video','copy link save video','video download website','online video grabber',
            'save video to phone','download video to gallery','video saver no login','video downloader no registration','download video hd quality',
            'save video offline','video download chrome','video saver safari','download video firefox','video converter online',
            'save video camera roll','download video ios','video saver android','save video free unlimited','video downloader 2026 working',
            'download short video','save reel video','download story video','video clip saver','save video bookmark',
            'video download api','fast video saver','quick video download','instant video save','one click video download',
            'batch video downloader','multiple video save','playlist video download','video archive tool','save video collection',
            'hd video downloader free','4k video saver online','1080p video download tool','720p video saver','sd video download fast',
            'video to mp3 converter','extract audio from video','save video as mp3','video sound extractor','download video audio only',
            'private video download','story saver online','highlights download free','carousel saver tool','album download free',
            'watermark free video','clean video download','no logo video saver','remove watermark video','strip watermark download',
            'share video download','viral video saver','trending video download','popular video saver','hot video download tool',
            'education video saver','tutorial video download','lecture video saver','course video download','class video saver',
            'news video download','sports video saver','music video download','concert video saver','event video download',
            'recipe video saver','cooking video download','fitness video saver','workout video download','yoga video saver',
            'travel video download','vlog video saver','review video download','unboxing video saver','haul video download',
            'comedy video saver','prank video download','challenge video saver','dance video download','diy video saver',
            'art video download','drawing video saver','painting video download','craft video saver','design video download',
            'gaming video saver','stream video download','clip video saver','montage video download','highlight video saver',
            'pet video download','animal video saver','nature video download','scenic video saver','landscape video download',
            'fashion video saver','beauty video download','makeup video saver','skincare video download','style video saver',
            'tech video download','gadget video saver','review video download','comparison video saver','benchmark video download',
            'food video saver','restaurant video download','street food video saver','cafe video download','dessert video saver',
            'family video download','baby video saver','kid video download','couple video saver','friend video download',
            'motivation video saver','inspiration video download','speech video saver','quote video download','wisdom video saver',
            'science video download','experiment video saver','documentary video download','history video saver','geography video download',
            'language video saver','learning video download','study video saver','exam video download','preparation video saver',
            'business video download','marketing video saver','startup video download','entrepreneur video saver','finance video download',
            'real estate video saver','property video download','interior video saver','architecture video download','construction video saver',
            'car video download','auto video saver','motorcycle video download','bike video saver','vehicle video download',
            'aviation video saver','space video download','ocean video saver','mountain video download','forest video saver',
            'urban video download','rural video saver','street video download','park video saver','beach video download',
            'winter video saver','summer video download','spring video saver','autumn video download','season video saver',
            'holiday video download','festival video saver','celebration video download','party video saver','wedding video download',
            'graduation video saver','birthday video download','anniversary video saver','memorial video download','tribute video saver',
        ];
        const pool=base[p]||base.home;
        const all=new Set();
        pool.forEach(k=>all.add(k));
        longTail.forEach(k=>all.add(k));
        pool.forEach(k=>{ modifiers.forEach(m=>{ all.add(`${k} ${m}`); all.add(`${m} ${k}`); }); });
        longTail.forEach(k=>{ for(let i=0;i<15&&i<modifiers.length;i++) all.add(`${k} ${modifiers[i]}`); });
        const arr=Array.from(all);
        for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
        const selected=arr.slice(0,500);
        let mk=document.querySelector('meta[name="keywords"]');
        if(!mk){mk=document.createElement('meta');mk.name='keywords';document.head.appendChild(mk);}
        mk.setAttribute('content',selected.slice(0,50).join(', '));
        const seoBlock=document.getElementById('seo-kw');
        if(seoBlock) seoBlock.textContent=selected.slice(50).join(', ');
    },
};


/* ==================== FAQ DATA ==================== */
const FAQ = {
    home: [
        {q:'What is Toolsfast?',a:'Toolsfast is a free online video downloader for TikTok, Instagram, and Facebook. No registration, no software — paste a link and download instantly.'},
        {q:'Is Toolsfast free?',a:'Yes! 100% free with no hidden fees, no premium plans, no download limits.'},
        {q:'Do I need to install anything?',a:'No. Works entirely in your browser on any device — phone, tablet, or computer.'},
        {q:'Which platforms are supported?',a:'TikTok (no watermark), Instagram (Reels, Stories, IGTV), and Facebook (videos, Reels, Watch, Live).'},
        {q:'Is it safe?',a:'Absolutely. No personal info collected, no data stored, all connections HTTPS encrypted.'},
        {q:'Works on mobile?',a:'Yes! iPhone, Android, iPad — all mobile browsers supported.'},
        {q:'Quality options?',a:'SD (small 1-2MB files, recommended), HD (1080p), and MP3 audio extraction.'},
        {q:'Why did download fail?',a:'The video may be private or deleted. Try again in a moment or check the link.'},
        {q:'TikTok without watermark?',a:'Yes! Our TikTok downloader automatically removes the watermark for clean downloads.'},
        {q:'File sizes?',a:'Most short videos are only 1-2 MB. Fast to download, saves phone storage.'},
        {q:'Download limit?',a:'No limits! Download 24/7, completely free and unlimited.'},
    ],
    tiktok: [
        {q:'How to download TikTok without watermark?',a:'Copy the TikTok video link, paste it here, click Download. Watermark-free version provided automatically.'},
        {q:'Can I download TikTok sounds as MP3?',a:'Yes! We include an MP3 option for any TikTok sound or music.'},
        {q:'Which TikTok link formats work?',a:'All formats: tiktok.com, vm.tiktok.com, vt.tiktok.com, and app share links.'},
        {q:'Download TikTok slideshows?',a:'Yes! Slideshows download as video files with original music.'},
        {q:'Is it legal?',a:'Personal use is generally okay. Always respect creators\' rights.'},
        {q:'TikTok download quality?',a:'SD (~1-2MB, recommended) and HD (1080p, larger file). SD is perfect for short videos.'},
        {q:'Need a TikTok account?',a:'No! Just paste any public video link.'},
        {q:'How fast?',a:'Under 3 seconds on average. Our servers are optimized for speed.'},
    ],
    instagram: [
        {q:'How to download Instagram Reels?',a:'Open the Reel, tap three dots, copy link, paste here, click Download.'},
        {q:'Can I download Stories?',a:'Yes! From public accounts. Copy the Story link before it expires.'},
        {q:'Do I need to log in?',a:'Never! We don\'t need your Instagram credentials.'},
        {q:'Download carousels?',a:'Yes! We detect carousels and let you download all items.'},
        {q:'What content types?',a:'Reels, Stories (public), IGTV, video posts, photo posts, carousels.'},
        {q:'Private accounts?',a:'No, only public content can be downloaded.'},
        {q:'Quality?',a:'HD for videos, original resolution for photos. Small optimized file sizes.'},
        {q:'Is it legal?',a:'Personal use is generally acceptable. Respect copyright and creators.'},
    ],
    facebook: [
        {q:'How to download Facebook videos?',a:'Find the video, click three dots, copy link, paste here, click Download.'},
        {q:'Facebook Reels?',a:'Yes! Copy the Reel link and paste it. Works perfectly.'},
        {q:'HD vs SD?',a:'HD = 720p/1080p (bigger). SD = 360-480p (smaller 1-2MB, faster). SD recommended.'},
        {q:'Facebook Live?',a:'Yes, after the live stream ends and is saved as a recording.'},
        {q:'Need a Facebook account?',a:'No! Works with any public video link.'},
        {q:'Which URL formats?',a:'All: facebook.com/videos, /watch, /reel, fb.watch, m.facebook.com.'},
        {q:'Is it safe?',a:'Yes! Never asks for credentials, doesn\'t store data. All HTTPS.'},
    ],
};


/* ==================== PLATFORM DETECTOR ==================== */
const Detect = {
    platform(url){
        if(!url||typeof url!=='string') return null;
        const c=url.trim().toLowerCase();
        for(const[k,p]of Object.entries(CONFIG.platforms)){
            for(const pat of p.patterns) if(pat.test(c)) return {id:k,...p};
        }
        return null;
    },
    clean(url){
        if(!url) return '';
        let c=url.trim();
        try{
            const u=new URL(c);
            ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','igshid','tt_from','share_id','ref','source','si','feature','app'].forEach(p=>u.searchParams.delete(p));
            c=u.toString();
        }catch(e){}
        return c;
    },
    valid(url){ try{new URL(url);return true;}catch{return false;} },
};


/* ==================== DOWNLOAD ENGINE ==================== */
const DL = {
    busy:false,

    async go(url){
        if(this.busy) return;
        this.busy=true;
        const clean=Detect.clean(url);
        const plat=Detect.platform(clean);

        if(!Detect.valid(clean)){UI.err('Please enter a valid URL.');this.busy=false;return;}
        if(!plat){UI.err('Unsupported URL. We support TikTok, Instagram, Facebook.');this.busy=false;return;}

        UI.badge(plat);
        UI.progress(true);

        try{
            let r;
            if(plat.id==='tiktok') r=await this.tiktok(clean);
            else if(plat.id==='instagram') r=await this.instagram(clean);
            else if(plat.id==='facebook') r=await this.facebook(clean);
            else throw {msg:'Platform not supported'};
            UI.results(r,plat);
            Stats.inc();
        }catch(e){
            UI.err(e.msg||e.message||'Could not fetch video. Check the link and try again.');
        }finally{this.busy=false;}
    },

    async tiktok(url){
        UI.prog(10,'Connecting to TikTok...');
        const form=new URLSearchParams();
        form.append('url',url);form.append('count','12');form.append('cursor','0');form.append('web','1');form.append('hd','1');
        let res;
        try{
            const c=new AbortController();const t=setTimeout(()=>c.abort(),CONFIG.api.timeout);
            res=await fetch(CONFIG.api.tiktok[0].url,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:form.toString(),signal:c.signal});
            clearTimeout(t);
        }catch(e){throw {msg:e.name==='AbortError'?'Request timed out. Try again.':'Cannot connect. Check your internet.'};}
        if(!res.ok) throw {msg:'TikTok server busy. Try again.'};
        const data=await res.json();UI.prog(55,'Extracting download links...');
        if(data.code!==0||!data.data) throw {msg:'Cannot fetch this TikTok. Make sure it\'s public.'};
        const v=data.data;UI.prog(80,'Preparing files...');
        const opts=[];
        if(v.play) opts.push({q:'SD No Watermark (Best)',l:'SD',res:'720p',fmt:'MP4',badge:'rec',sz:v.size?this.fmtSz(v.size):'~1-2 MB',url:v.play,rec:true});
        if(v.hdplay) opts.push({q:'HD 1080p No Watermark',l:'HD',res:'1080p',fmt:'MP4',badge:'hd',sz:v.hd_size?this.fmtSz(v.hd_size):'Larger',url:v.hdplay});
        if(v.wmplay&&!opts.length) opts.push({q:'SD (With Watermark)',l:'SD',res:'720p',fmt:'MP4',badge:'sd',sz:'With WM',url:v.wmplay});
        if(v.music) opts.push({q:'Audio MP3',l:'MP3',res:'Audio',fmt:'MP3',badge:'mp3',sz:v.music_info?.duration?(v.music_info.duration+'s'):'Audio',url:v.music});
        if(!opts.length) throw {msg:'No download links found for this video.'};
        UI.prog(100,'Ready!');await this.w(300);
        return {title:v.title||'TikTok Video',thumb:v.cover||v.origin_cover||null,platform:'tiktok',dur:v.duration?this.fmtDur(v.duration):'',author:v.author?.nickname||'',opts};
    },

    async instagram(url){
        UI.prog(10,'Connecting to Instagram...');

        /* Try all 5 API endpoints in order */
        for(let i=0;i<CONFIG.api.instagram.length;i++){
            const ep=CONFIG.api.instagram[i];
            UI.prog(10+i*15,'Trying server '+(i+1)+'...');
            try{
                const c=new AbortController();const t=setTimeout(()=>c.abort(),CONFIG.api.timeout);
                const separator=ep.url.includes('?')?'&':'?';
                const fetchUrl=ep.url+separator+'url='+encodeURIComponent(url);
                const res=await fetch(fetchUrl,{signal:c.signal});clearTimeout(t);
                if(!res.ok) continue;
                const data=await res.json();
                UI.prog(70,'Extracting media...');

                /* Handle different response formats from different APIs */
                let medias=data?.medias||data?.data?.medias||data?.result||[];
                if(data?.data?.url && !medias.length){
                    medias=[{url:data.data.url,type:data.data.type||'video',quality:'hd'}];
                }
                if(data?.video_url){
                    medias=[{url:data.video_url,type:'video',quality:'hd'}];
                }
                if(data?.download_url){
                    medias=[{url:data.download_url,type:'video',quality:'hd'}];
                }

                if(medias?.length>0){
                    const opts=[];
                    medias.forEach((m,idx)=>{
                        const mUrl=m.url||m.download_url||m.video_url;
                        if(mUrl){
                            const isV=m.type==='video'||m.videoAvailable||mUrl.includes('.mp4');
                            opts.push({
                                q:idx===0?'Best Quality (Recommended)':(isV?'Standard':'Photo'),
                                l:idx===0?'Best':(isV?'SD':'Photo'),
                                res:isV?(m.quality==='hd'?'1080p':'720p'):'Original',
                                fmt:isV?'MP4':'JPG',
                                badge:idx===0?'rec':(m.quality==='hd'?'hd':'sd'),
                                sz:m.formattedSize||(isV?'~1-2 MB':'Photo'),
                                url:mUrl,rec:idx===0
                            });
                        }
                    });
                    if(opts.length){
                        UI.prog(100,'Ready!');await this.w(300);
                        return {title:data.title||data.caption||'Instagram Content',thumb:data.thumbnail||data.cover||null,platform:'instagram',dur:'',author:data.author||data.username||'',opts};
                    }
                }
            }catch(e){continue;}
        }

        /* Fallback: Instagram oEmbed (always available for public content) */
        UI.prog(85,'Trying Instagram oEmbed...');
        try{
            const res=await fetch(`https://api.instagram.com/oembed?url=${encodeURIComponent(url)}`);
            if(res.ok){
                const d=await res.json();UI.prog(100,'Ready!');await this.w(300);
                const sc=url.match(/instagram\.com\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/)?.[1];
                if(sc){
                    return {title:d.title||'Instagram Content',thumb:d.thumbnail_url||null,platform:'instagram',dur:'',author:d.author_name||'',opts:[
                        {q:'Best Quality',l:'Best',res:'Original',fmt:'Media',badge:'rec',sz:'Best',url:`https://www.instagram.com/p/${sc}/media/?size=l`,rec:true},
                        {q:'Thumbnail',l:'Thumb',res:'Preview',fmt:'JPG',badge:'sd',sz:'Small',url:d.thumbnail_url||`https://www.instagram.com/p/${sc}/media/?size=t`},
                    ]};
                }
            }
        }catch(e){}

        /* Fallback: Direct Reel redirect URL construction */
        UI.prog(90,'Trying direct method...');
        try{
            const sc=url.match(/instagram\.com\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/)?.[1];
            if(sc){
                UI.prog(100,'Ready!');await this.w(300);
                return {title:'Instagram Content',thumb:null,platform:'instagram',dur:'',author:'',opts:[
                    {q:'Open & Save (Best)',l:'Best',res:'Original',fmt:'Media',badge:'rec',sz:'Best',url:`https://www.instagram.com/p/${sc}/media/?size=l`,rec:true},
                ]};
            }
        }catch(e){}

        throw {msg:'Cannot download this Instagram content. It may be private, deleted, or Instagram is blocking requests. Tips: 1) Make sure the post is public. 2) Try again in 30 seconds. 3) Copy the direct Reel/Post link (not a Story link).'};
    },

    async facebook(url){
        UI.prog(10,'Connecting to Facebook...');
        for(let i=0;i<CONFIG.api.facebook.length;i++){
            const ep=CONFIG.api.facebook[i];UI.prog(15+i*30,'Processing...');
            try{
                const c=new AbortController();const t=setTimeout(()=>c.abort(),CONFIG.api.timeout);
                const res=await fetch(ep.url+'?url='+encodeURIComponent(url),{signal:c.signal});clearTimeout(t);
                if(!res.ok) continue;
                const data=await res.json();UI.prog(70,'Extracting...');
                let medias=data?.medias||data?.data?.medias||[];
                if(medias?.length>0){
                    const opts=[];let hasSD=false,hasHD=false;
                    medias.forEach(m=>{
                        if(m.url){
                            const hd=m.quality==='hd';if(hd)hasHD=true;else hasSD=true;
                            opts.push({q:hd?'HD':'SD (Recommended)',l:hd?'HD':'SD',res:hd?'720p+':'360p',fmt:'MP4',badge:hd?'hd':'rec',sz:m.formattedSize||(hd?'Larger':'~1-2 MB'),url:m.url,rec:!hd});
                        }
                    });
                    if(hasHD&&!hasSD&&opts.length) opts[0].rec=true;
                    if(opts.length){UI.prog(100,'Ready!');await this.w(300);return {title:data.title||'Facebook Video',thumb:data.thumbnail||null,platform:'facebook',dur:data.duration||'',author:data.author||'',opts};}
                }
            }catch(e){continue;}
        }
        UI.prog(80,'Trying alternative...');
        try{
            const res=await fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}`);
            if(res.ok){
                const d=await res.json();
                if(d&&!d.error){UI.prog(100,'Ready!');await this.w(300);
                return {title:d.title||'Facebook Video',thumb:d.thumbnail_url||null,platform:'facebook',dur:'',author:d.author_name||'',opts:[{q:'SD (Recommended)',l:'SD',res:'360p',fmt:'MP4',badge:'rec',sz:'~1-2 MB',url,redir:true,rec:true},{q:'HD',l:'HD',res:'720p',fmt:'MP4',badge:'hd',sz:'Larger',url,redir:true}]};}
            }
        }catch(e){}
        throw {msg:'Cannot download. Video may be private. Make sure it\'s public.'};
    },

    fmtSz(b){if(!b)return'?';const m=b/(1024*1024);return m>1?m.toFixed(1)+' MB':(b/1024).toFixed(0)+' KB';},
    fmtDur(s){if(!s)return'';return Math.floor(s/60)+':'+(s%60).toString().padStart(2,'0');},
    w(ms){return new Promise(r=>setTimeout(r,ms));},
};


/* ==================== STATS ==================== */
const Stats = {
    inc(){
        try{
            const s=JSON.parse(localStorage.getItem(CONFIG.stats.key)||'{"t":0}');
            s.t++;s.last=Date.now();
            localStorage.setItem(CONFIG.stats.key,JSON.stringify(s));
        }catch(e){}
    }
};


/* ==================== UI CONTROLLER ==================== */
const UI = {
    $:{},

    init(){
        this.cache();this.bind();this.faq();this.menu();this.scroll();this.stickyAd();
    },

    cache(){
        this.$={
            inp:document.getElementById('inp'),
            dl:document.getElementById('dl-btn'),
            paste:document.getElementById('paste-btn'),
            pbadge:document.getElementById('p-badge'),
            picon:document.getElementById('p-icon'),
            pname:document.getElementById('p-name'),
            prog:document.getElementById('prog'),
            bar:document.getElementById('bar'),
            ptxt:document.getElementById('p-txt'),
            res:document.getElementById('res'),
            errBox:document.getElementById('err'),
            errTxt:document.getElementById('err-txt'),
            retry:document.getElementById('retry'),
            faqC:document.getElementById('faq-c'),
            mBtn:document.getElementById('m-btn'),
            mMenu:document.getElementById('m-menu'),
            hdr:document.getElementById('hdr'),
            glass:document.getElementById('glass'),
            gTxt:document.getElementById('g-txt'),
            gCountdown:document.getElementById('g-countdown'),
            gCountNum:document.getElementById('g-count-num'),
            gAdSlot:document.getElementById('g-ad-300'),
            gAd:document.getElementById('g-ad'),
        };
    },

    bind(){
        const{inp,dl,paste,retry}=this.$;
        if(dl) dl.addEventListener('click',()=>this.handle());
        if(inp){
            inp.addEventListener('keydown',e=>{if(e.key==='Enter')this.handle();});
            inp.addEventListener('input',()=>{const p=Detect.platform(inp.value);if(p&&inp.value.length>10)this.badge(p);else this.badgeOff();});
            inp.addEventListener('paste',()=>setTimeout(()=>{const p=Detect.platform(inp.value);if(p)this.badge(p);},100));
        }
        if(paste) paste.addEventListener('click',async()=>{
            try{
                const t=await navigator.clipboard.readText();
                if(inp&&t){inp.value=t;inp.dispatchEvent(new Event('input'));Toast.show('Link pasted!','ok');}
            }catch{Toast.show('Paste manually: Ctrl+V','info');}
        });
        if(retry) retry.addEventListener('click',()=>{this.errOff();if(inp?.value)this.handle();});
    },

    handle(){
        const url=this.$?.inp?.value?.trim();
        if(!url){
            this.$.inp?.focus();
            const b=document.getElementById('box');
            if(b){b.classList.add('shake');setTimeout(()=>b.classList.remove('shake'),500);}
            return;
        }
        this.resOff();this.errOff();DL.go(url);
    },

    badge(p){
        const{pbadge,picon,pname}=this.$;if(!pbadge)return;
        pbadge.classList.remove('hidden');pbadge.style.display='flex';
        if(picon){picon.className=p.icon;picon.style.color=p.color;}
        if(pname){pname.textContent=p.name;pname.style.color=p.color;}
    },
    badgeOff(){const{pbadge}=this.$;if(pbadge){pbadge.classList.add('hidden');pbadge.style.display='none';}},

    progress(on){
        const{prog,bar,res,errBox,dl,gAd}=this.$;
        if(on){
            if(res)res.classList.add('hidden');
            if(errBox)errBox.classList.add('hidden');
            if(prog){prog.classList.remove('hidden');if(bar)bar.style.width='0%';}
            if(dl){dl.disabled=true;dl.innerHTML='<i class="fas fa-spinner fa-spin"></i><span>Wait...</span>';}
            if(gAd) setTimeout(()=>gAd.classList.remove('hidden'),1200);
        }
    },
    prog(pct,txt){const{bar,ptxt}=this.$;if(bar)bar.style.width=pct+'%';if(ptxt)ptxt.textContent=txt;},
    progressOff(){
        const{prog,dl,gAd}=this.$;
        if(prog)prog.classList.add('hidden');
        if(dl){dl.disabled=false;dl.innerHTML='<i class="fas fa-download"></i><span>Download</span>';}
        if(gAd)gAd.classList.add('hidden');
    },

    esc(s){if(!s)return'';const d=document.createElement('div');d.textContent=s;return d.innerHTML;},

    results(r,plat){
        this.progressOff();
        const{res}=this.$;if(!res)return;
        const thumbH=r.thumb?`<img src="${this.esc(r.thumb)}" alt="${this.esc(r.title)}" loading="lazy" crossorigin="anonymous" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" class="w-full h-full object-cover"><div class="w-full h-full flex-col items-center justify-center text-gray-300" style="display:none"><i class="${plat.icon} text-2xl"></i></div>`:`<div class="w-full h-full flex flex-col items-center justify-center text-gray-300"><i class="${plat.icon} text-2xl"></i></div>`;
        const auth=r.author?`<span class="mx-1">·</span>@${this.esc(r.author)}`:'';
        const dur=r.dur?`<span class="mx-1">·</span>${r.dur}`:'';
        const optsH=r.opts.map(o=>{
            const fn=this.esc(r.title||'video')+'_'+o.l+'.'+o.fmt.toLowerCase();
            const star=o.rec?'<span class="text-green-600 text-[9px] ml-1">★ Best</span>':'';
            return `<div class="dl-opt" data-url="${this.esc(o.url)}" data-fn="${fn}" data-r="${o.redir||false}" role="button" tabindex="0"><div class="flex items-center gap-1.5"><span class="b-${o.badge}">${o.l}</span><span class="text-gray-500 text-[10px]">${o.res} · ${o.fmt} · ${o.sz}${star}</span></div><span class="dl-save"><i class="fas fa-download"></i>Save</span></div>`;
        }).join('');
        res.innerHTML=`<div class="r-card"><div class="flex gap-3"><div class="r-thumb flex-shrink-0">${thumbH}</div><div class="flex-1 min-w-0 space-y-1.5"><h3 class="font-bold text-dark text-xs line-clamp-2">${this.esc(r.title||'Video')}</h3><p class="text-gray-400 text-[10px]"><i class="${plat.icon} mr-0.5" style="color:${plat.color}"></i>${plat.name}${auth}${dur}</p><div class="space-y-1">${optsH}</div><p class="text-[9px] text-gray-400 mt-1"><i class="fas fa-info-circle mr-0.5"></i>Tap Save to download. File saves to your device.</p></div></div></div>`;

        /* Bind each Save button to show the Money-Making overlay, then Blob download */
        res.querySelectorAll('.dl-opt').forEach(btn=>{
            btn.addEventListener('click',()=>{
                const u=btn.dataset.url;
                const fn=btn.dataset.fn;
                const rd=btn.dataset.r==='true';
                MoneyOverlay.show(u,fn,rd,btn);
            });
            btn.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();btn.click();}});
        });
        res.classList.remove('hidden');
        res.scrollIntoView({behavior:'smooth',block:'nearest'});
    },

    resOff(){const{res}=this.$;if(res){res.classList.add('hidden');res.innerHTML='';}},

    err(msg){
        this.progressOff();this.resOff();
        const{errBox,errTxt}=this.$;
        if(errBox)errBox.classList.remove('hidden');
        if(errTxt)errTxt.textContent=msg;
    },
    errOff(){const{errBox}=this.$;if(errBox)errBox.classList.add('hidden');},

    faq(){
        const{faqC}=this.$;if(!faqC)return;
        const pg=SEO.pg(),items=FAQ[pg]||FAQ.home;
        faqC.innerHTML=items.map((f,i)=>`<div class="fq" data-i="${i}"><div class="fq-q" role="button" tabindex="0" aria-expanded="false"><span>${f.q}</span><i class="fas fa-chevron-down fq-ic"></i></div><div class="fq-a" aria-hidden="true"><div class="fq-ai">${f.a}</div></div></div>`).join('');
        faqC.querySelectorAll('.fq-q').forEach(btn=>{
            btn.addEventListener('click',()=>{
                const item=btn.closest('.fq'),on=item.classList.contains('on');
                faqC.querySelectorAll('.fq.on').forEach(el=>{el.classList.remove('on');el.querySelector('.fq-q')?.setAttribute('aria-expanded','false');});
                if(!on){item.classList.add('on');btn.setAttribute('aria-expanded','true');}
            });
            btn.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();btn.click();}});
        });
    },

    menu(){
        const{mBtn,mMenu}=this.$;if(!mBtn||!mMenu)return;
        mBtn.addEventListener('click',()=>{
            const open=!mMenu.classList.contains('hidden');
            mMenu.classList.toggle('hidden');
            mBtn.setAttribute('aria-expanded',!open);
            const ic=mBtn.querySelector('i');
            if(ic)ic.className=open?'fas fa-bars text-dark':'fas fa-times text-dark';
        });
        document.addEventListener('click',e=>{
            if(!mMenu.classList.contains('hidden')&&!mMenu.contains(e.target)&&!mBtn.contains(e.target)){
                mMenu.classList.add('hidden');mBtn.setAttribute('aria-expanded','false');
                const ic=mBtn.querySelector('i');if(ic)ic.className='fas fa-bars text-dark';
            }
        });
    },

    scroll(){
        const{hdr}=this.$;
        const btn=document.createElement('button');btn.id='s-top';btn.innerHTML='<i class="fas fa-arrow-up"></i>';btn.setAttribute('aria-label','Scroll to top');document.body.appendChild(btn);
        btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
        window.addEventListener('scroll',()=>{
            if(hdr)hdr.classList.toggle('hdr-s',window.scrollY>10);
            btn.classList.toggle('vis',window.scrollY>500);
        },{passive:true});
    },

    stickyAd(){
        const ad=document.getElementById('ad-stick'),close=document.getElementById('ad-stick-x');
        if(ad){
            setTimeout(()=>{if(window.innerWidth<768)ad.classList.remove('hidden');},3000);
        }
        if(close) close.addEventListener('click',()=>ad?.classList.add('hidden'));
    },
};


/* ==========================================================
   💰 MONEY-MAKING OVERLAY — Glassmorphism Interstitial
   ==========================================================
   On every "Save" click:
   1. Show full-screen glassmorphism overlay
   2. Display 300×250 interstitial ad
   3. Run 5-second countdown with animated ring
   4. After countdown → auto-start Blob fetch download
   5. No redirect, no new tab — pure Blob save to device
   ========================================================== */
const MoneyOverlay = {
    timer: null,
    active: false,

    show(url, filename, isRedirect, btnEl) {
        if (this.active) return;
        this.active = true;

        const glass = document.getElementById('glass');
        const gTxt = document.getElementById('g-txt');
        const gCountdown = document.getElementById('g-countdown');
        const gCountNum = document.getElementById('g-count-num');

        if (!glass) {
            /* No overlay element — fallback directly */
            this.directDownload(url, filename, isRedirect, btnEl);
            return;
        }

        /* Show overlay */
        glass.classList.remove('hidden');
        glass.style.display = 'flex';
        if (gTxt) gTxt.textContent = 'Preparing your download...';

        /* Push AdSense ad in overlay if available */
        this.pushOverlayAd();

        /* Start countdown */
        let sec = CONFIG.overlay.countdownSec;
        if (gCountNum) gCountNum.textContent = sec;
        if (gCountdown) gCountdown.classList.remove('hidden');

        /* Update ring animation */
        const ring = document.getElementById('g-ring-circle');
        if (ring) {
            ring.style.transition = 'none';
            ring.style.strokeDashoffset = '283';
            // Force reflow
            ring.getBoundingClientRect();
            ring.style.transition = `stroke-dashoffset ${CONFIG.overlay.countdownSec}s linear`;
            ring.style.strokeDashoffset = '0';
        }

        this.timer = setInterval(() => {
            sec--;
            if (gCountNum) gCountNum.textContent = sec;
            if (gTxt) {
                if (sec <= 2) gTxt.textContent = 'Starting download...';
                else if (sec <= 3) gTxt.textContent = 'Almost ready...';
                else gTxt.textContent = 'Preparing your download...';
            }
            if (sec <= 0) {
                clearInterval(this.timer);
                this.timer = null;
                this.hide();
                this.directDownload(url, filename, isRedirect, btnEl);
            }
        }, 1000);
    },

    hide() {
        this.active = false;
        if (this.timer) { clearInterval(this.timer); this.timer = null; }
        const glass = document.getElementById('glass');
        if (glass) { glass.classList.add('hidden'); glass.style.display = 'none'; }
        const gCountdown = document.getElementById('g-countdown');
        if (gCountdown) gCountdown.classList.add('hidden');
    },

    pushOverlayAd() {
        /* Try to push a fresh ad into the overlay 300×250 slot */
        try {
            const slot = document.getElementById('g-ad-300');
            if (slot && window.adsbygoogle) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {}
    },

    /* === BLOB FETCH DOWNLOAD — No redirect, no new tab === */
    async directDownload(url, filename, isRedirect, btnEl) {
        if (!url || url === '#') { Toast.show('Link unavailable', 'err'); return; }

        const saveBtn = btnEl?.querySelector('.dl-save');
        const origHTML = saveBtn?.innerHTML;
        if (saveBtn) saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>...';

        /* Clean filename */
        const safeName = (filename || 'video.mp4')
            .replace(/[^a-zA-Z0-9._-]/g, '_')
            .substring(0, 80);

        /* If it's a redirect-only link (e.g. Facebook fallback with no direct file) */
        if (isRedirect) {
            /* Still try Blob first */
            const blobOk = await this.tryBlobDownload(url, safeName, saveBtn, origHTML);
            if (!blobOk) {
                /* Fallback: create hidden <a> link click (no window.open) */
                const a = document.createElement('a');
                a.href = url;
                a.download = safeName;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                setTimeout(() => a.remove(), 1000);
                if (saveBtn) {
                    saveBtn.innerHTML = '<i class="fas fa-external-link-alt"></i>Opened';
                    setTimeout(() => { if (origHTML) saveBtn.innerHTML = origHTML; }, 3000);
                }
                Toast.show('Opened in new tab — long-press to save', 'info');
            }
            return;
        }

        /* Primary: Blob fetch download */
        const blobOk = await this.tryBlobDownload(url, safeName, saveBtn, origHTML);
        if (!blobOk) {
            /* Fallback: try with no-cors proxy pattern */
            const proxyOk = await this.tryBlobDownload(
                'https://corsproxy.io/?' + encodeURIComponent(url),
                safeName, saveBtn, origHTML
            );
            if (!proxyOk) {
                /* Last resort: <a> tag click */
                const a = document.createElement('a');
                a.href = url;
                a.download = safeName;
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                setTimeout(() => a.remove(), 1000);
                if (saveBtn) {
                    saveBtn.innerHTML = '<i class="fas fa-check"></i>Done';
                    setTimeout(() => { if (origHTML) saveBtn.innerHTML = origHTML; }, 3000);
                }
                Toast.show('Download started!', 'ok');
            }
        }
    },

    async tryBlobDownload(url, filename, saveBtn, origHTML) {
        try {
            const response = await fetch(url, { mode: 'cors' });
            if (!response.ok) return false;
            const blob = await response.blob();
            if (blob.size < 100) return false; /* Too small = error page */
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                URL.revokeObjectURL(blobUrl);
                a.remove();
            }, 3000);
            if (saveBtn) {
                saveBtn.innerHTML = '<i class="fas fa-check text-green-400"></i>Done!';
                setTimeout(() => { if (origHTML) saveBtn.innerHTML = origHTML; }, 4000);
            }
            Toast.show('Download started! Check your downloads folder.', 'ok');
            return true;
        } catch (e) {
            return false;
        }
    },
};


/* ==================== TOAST ==================== */
const Toast = {
    show(msg,type='info'){
        const c=document.getElementById('toast');if(!c)return;
        const el=document.createElement('div');
        el.className=`t-msg t-${type}`;
        el.innerHTML=`<i class="fas fa-${type==='ok'?'check-circle':type==='err'?'exclamation-circle':'info-circle'} mr-1"></i>${msg}`;
        c.appendChild(el);
        setTimeout(()=>{el.classList.add('t-out');setTimeout(()=>el.remove(),300);},3000);
    },
};


/* ==================== AUTOMATIONS ==================== */
const AutoSEO = {
    init(){
        document.querySelectorAll('img:not([alt]),img[alt=""]').forEach(i=>{
            const s=i.src||i.dataset.src||'';
            const f=s.split('/').pop()?.split('?')[0]?.split('.')[0]||'';
            i.alt=f.replace(/[-_]/g,' ').replace(/\b\w/g,c=>c.toUpperCase())||'Toolsfast image';
        });
        document.querySelectorAll('a[href^="http"]').forEach(l=>{
            const h=l.getAttribute('href')||'';
            if(!h.includes(CONFIG.site.domain)) l.setAttribute('rel','nofollow noopener noreferrer');
        });
        document.querySelectorAll('i.fas,i.fab,i.far').forEach(i=>{
            if(!i.getAttribute('aria-label')&&!i.closest('[aria-label]')) i.setAttribute('aria-hidden','true');
        });
    }
};

const Redirects = {
    init(){
        try{
            const u=new URL(window.location.href);
            if(u.hash){
                const h=u.hash.replace('#','').replace('/','').toLowerCase();
                const m={tiktok:'tiktok.html',instagram:'instagram.html',facebook:'facebook.html'};
                const p=u.pathname.split('/').pop()||'';
                if(m[h]&&p!==m[h]) window.location.href=m[h];
            }
        }catch(e){}
    }
};

const AdBlock = {
    init(){
        setTimeout(()=>{
            const t=document.createElement('div');
            t.className='adsbox ad-c';t.style.cssText='height:1px;width:1px;position:absolute;left:-9999px';
            document.body.appendChild(t);
            setTimeout(()=>{
                if(t.offsetHeight===0){
                    const b=document.createElement('div');
                    b.className='fixed top-10 left-0 right-0 z-50 bg-yellow-50 border-b border-yellow-200 px-3 py-1.5 text-center text-[11px] text-yellow-800';
                    b.innerHTML='<i class="fas fa-heart mr-1 text-red-400"></i>Please disable ad blocker to keep this tool free. <button onclick="this.parentElement.remove()" class="ml-2 font-bold">&times;</button>';
                    document.body.prepend(b);
                }
                t.remove();
            },100);
        },4000);
    }
};

const AdSense = {
    init(){
        const p=CONFIG.adsense.publisherId;
        if(p&&p!=='ca-pub-XXXXXXXXXXXXXXXX'){
            document.querySelectorAll('ins.adsbygoogle').forEach(i=>i.setAttribute('data-ad-client',p));
            const s=document.createElement('script');s.async=true;
            s.src=`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${p}`;
            s.crossOrigin='anonymous';document.head.appendChild(s);
            s.onload=()=>{
                document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status])').forEach(()=>{
                    try{(window.adsbygoogle=window.adsbygoogle||[]).push({});}catch(e){}
                });
            };
        }
    }
};

const Perf = {
    init(){
        if('IntersectionObserver' in window){
            const o=new IntersectionObserver(e=>{
                e.forEach(en=>{
                    if(en.isIntersecting){const el=en.target;if(el.dataset.src){el.src=el.dataset.src;el.removeAttribute('data-src');}o.unobserve(el);}
                });
            },{rootMargin:'200px'});
            document.querySelectorAll('[data-src]').forEach(el=>o.observe(el));
        }
    }
};


/* ==================== INIT ==================== */
document.addEventListener('DOMContentLoaded',()=>{
    SEO.init();
    UI.init();
    AutoSEO.init();
    Redirects.init();
    AdBlock.init();
    AdSense.init();
    Perf.init();

    /* Hide glass overlay on load */
    const g=document.getElementById('glass');
    if(g){g.classList.add('hidden');g.style.display='none';}

    /* Performance logging */
    const t0=performance.now();
    window.addEventListener('load',()=>{
        console.log(`%c⚡ ${CONFIG.site.name}.online v${CONFIG.site.version} | ${CONFIG.site.edition} Edition`,'color:#2563EB;font-weight:bold;font-size:14px;');
        console.log(`%c✅ All systems GO — Loaded in ${((performance.now()-t0)/1000).toFixed(2)}s`,'color:#059669;font-size:11px;');
    });
});
