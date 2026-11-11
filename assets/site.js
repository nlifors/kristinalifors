(function(){
  // Opened straight from disk (file://)? Point folder links at their index.html so navigation still works.
  if(location.protocol==="file:"){document.querySelectorAll('a[href]').forEach(function(a){var h=a.getAttribute("href");if(/^(\.\.?\/|[a-z0-9-]+\/)/i.test(h)&&h.slice(-1)==="/"&&!/^[a-z]+:/i.test(h))a.setAttribute("href",h+"index.html");});}

  // Mobile menu
  var t=document.querySelector(".nav-toggle"),nav=document.getElementById("nav");
  if(t)t.addEventListener("click",function(){var o=nav.classList.toggle("is-open");t.setAttribute("aria-expanded",o);});

  // E-mail (assembled here to keep it away from address harvesters)
  document.querySelectorAll(".js-email").forEach(function(a){var m=a.dataset.u+"@"+a.dataset.d;a.href="mailto:"+m;a.textContent=m;});

  // Home slider
  var hero=document.querySelector(".hero");
  if(hero){
    var s=[].slice.call(hero.querySelectorAll(".slide")),dots=hero.querySelector(".hero-dots"),i=0,timer,
        still=matchMedia("(prefers-reduced-motion: reduce)").matches;
    s.forEach(function(_,k){var b=document.createElement("button");b.setAttribute("role","tab");b.setAttribute("aria-label","Image "+(k+1));b.onclick=function(){go(k,true)};dots.appendChild(b);});
    function go(k,user){i=(k+s.length)%s.length;s.forEach(function(el,j){el.classList.toggle("is-active",j===i);});
      [].forEach.call(dots.children,function(d,j){d.setAttribute("aria-selected",j===i);});
      var im=s[(i+1)%s.length].querySelector("img");if(im)im.loading="eager";if(user)play();}
    function play(){clearInterval(timer);if(!still)timer=setInterval(function(){go(i+1)},6000);}
    hero.querySelector(".prev").onclick=function(){go(i-1,true)};
    hero.querySelector(".next").onclick=function(){go(i+1,true)};
    hero.addEventListener("mouseenter",function(){clearInterval(timer)});hero.addEventListener("mouseleave",play);
    hero.addEventListener("focusin",function(){clearInterval(timer)});
    var x0=null;hero.addEventListener("touchstart",function(e){x0=e.touches[0].clientX},{passive:true});
    hero.addEventListener("touchend",function(e){if(x0===null)return;var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)go(i+(d<0?1:-1),true);x0=null});
    go(0);
    // Reveal the carousel as it scrolls into view, and only auto-advance while it is on screen.
    // At the top of the page it fills the screen below the header and needs no reveal.
    var hd=document.querySelector(".site-header");
    function fit(){if(hd)hero.style.setProperty("--header-h",hd.offsetHeight+"px");}
    fit();addEventListener("resize",fit);
    if("IntersectionObserver" in window){
      if(hero.getBoundingClientRect().top>innerHeight*.6)hero.classList.add("is-hidden");
      new IntersectionObserver(function(es){es.forEach(function(e){
        if(e.isIntersecting){hero.classList.add("is-revealed");play();}else clearInterval(timer);
      });},{threshold:.2}).observe(hero);
    }else play();
  }

  // Gallery lightbox
  var g=document.querySelector("[data-lightbox]");
  if(g){
    var links=[].slice.call(g.querySelectorAll("a")),n=0,last,
        lb=document.createElement("div");lb.className="lb";lb.hidden=true;lb.setAttribute("role","dialog");lb.setAttribute("aria-modal","true");lb.setAttribute("aria-label","Image viewer");
    lb.innerHTML='<button class="lb-close" aria-label="Close">×</button><button class="lb-prev" aria-label="Previous image">‹</button><img alt=""><button class="lb-next" aria-label="Next image">›</button><div class="lb-count"></div>';
    document.body.appendChild(lb);
    var im=lb.querySelector("img"),count=lb.querySelector(".lb-count");
    function show(k){n=(k+links.length)%links.length;var a=links[n];delete im.dataset.tried;im.dataset.fallback=a.dataset.fallback;im.alt=a.querySelector("img").alt;im.src=a.getAttribute("href");count.textContent=(n+1)+" / "+links.length;}
    function open(k){last=document.activeElement;lb.hidden=false;document.body.style.overflow="hidden";show(k);lb.querySelector(".lb-close").focus();}
    function close(){lb.hidden=true;document.body.style.overflow="";if(last)last.focus();}
    links.forEach(function(a,k){a.addEventListener("click",function(e){e.preventDefault();open(k)});});
    lb.querySelector(".lb-close").onclick=close;
    lb.querySelector(".lb-prev").onclick=function(){show(n-1)};
    lb.querySelector(".lb-next").onclick=function(){show(n+1)};
    lb.addEventListener("click",function(e){if(e.target===lb)close()});
    document.addEventListener("keydown",function(e){if(lb.hidden)return;
      if(e.key==="Escape")close();else if(e.key==="ArrowLeft")show(n-1);else if(e.key==="ArrowRight")show(n+1);
      else if(e.key==="Tab"){var b=lb.querySelectorAll("button"),f=b[0],l=b[b.length-1];if(e.shiftKey&&document.activeElement===f){e.preventDefault();l.focus()}else if(!e.shiftKey&&document.activeElement===l){e.preventDefault();f.focus()}}});
    var tx=null;lb.addEventListener("touchstart",function(e){tx=e.touches[0].clientX},{passive:true});
    lb.addEventListener("touchend",function(e){if(tx===null)return;var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>40)show(n+(d<0?1:-1));tx=null});
  }

  // Contact form: no server needed - opens the visitor's mail program with the message filled in.
  // To send without a mail program, point the form at a form service or your host's mail script instead (see README).
  var f=document.querySelector(".contact-form");
  if(f)f.addEventListener("submit",function(e){e.preventDefault();var note=f.querySelector(".form-note");
    if(!f.checkValidity()){note.textContent="Please fill in your name, a valid e-mail address and a message.";f.reportValidity();return;}
    var d=new FormData(f),to="klifors"+"@"+"gmail.com",
        body=d.get("message")+"\n\n"+d.get("name")+"\n"+d.get("email")+(d.get("phone")?"\n"+d.get("phone"):"");
    location.href="mailto:"+to+"?subject="+encodeURIComponent("Enquiry from "+d.get("name"))+"&body="+encodeURIComponent(body);
    note.textContent="Your e-mail program should now open with the message ready to send.";});
})();
