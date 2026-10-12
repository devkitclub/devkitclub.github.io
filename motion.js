(() => {
  'use strict';
  const {gsap, ScrollTrigger} = window;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ignoreMobileResize:true});
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('.motion-toggle');
  const walk = document.querySelector('.walkthrough');
  const process = document.querySelector('.process');
  const dataVisual = document.querySelector('.data-visual');
  const steps = [...document.querySelectorAll('.step')];
  const stepLinks = [...document.querySelectorAll('.step-nav a')];
  let manualReduce = false, context, responsive, processTimeline, introPlayed = false, removePointer;
  try { manualReduce = localStorage.getItem('devkit-reduce-motion') === 'true'; } catch (_) {}
  const reduced = () => manualReduce || media.matches;

  function markStep(index, pinned = true) {
    stepLinks.forEach((link, i) => { link.classList.toggle('active', i === index); if (i === index) link.setAttribute('aria-current','step'); else link.removeAttribute('aria-current'); });
    steps.forEach((step, i) => {
      step.inert = pinned && i !== index;
      if (pinned && i !== index) step.setAttribute('aria-hidden','true'); else step.removeAttribute('aria-hidden');
    });
  }
  function cleanup() {
    removePointer?.(); removePointer = null;
    responsive?.revert(); context?.revert();
    responsive = context = processTimeline = null;
    walk.classList.remove('is-pinned');
    walk.classList.remove('is-mobile-readable');
    walk.style.removeProperty('--step-height');
    process.classList.remove('is-phone-scene');
    process.style.removeProperty('--scene-height');
    process.style.removeProperty('--scene-scroll');
    dataVisual.classList.remove('is-phone-scene');
    dataVisual.style.removeProperty('--data-height');
    markStep(0, false);
  }
  function build() {
    cleanup();
    const reduce = reduced();
    document.documentElement.dataset.reducedMotion = String(reduce);
    toggle.hidden = false;
    toggle.textContent = reduce ? 'Motion reduced' : 'Reduce motion';
    toggle.setAttribute('aria-pressed',String(reduce));
    toggle.disabled = media.matches;
    toggle.title = media.matches ? 'Reduced motion follows your device setting' : 'Switch scroll animations on or off';
    if (reduce) return;
    context = gsap.context(() => {
      if (!introPlayed && window.scrollY < 60 && !location.hash) {
        gsap.timeline({defaults:{ease:'power4.out'}})
          .from('.hero-object-scene',{opacity:0,duration:1.4},0)
          .from('.object-orbit',{y:100,rotationY:35,rotationZ:-12,duration:1.7},0)
          .from('.line-mask > span',{yPercent:115,rotation:3,duration:1.15,stagger:.13},.15)
          .from('.hero-copy > p',{y:25,opacity:0,duration:.9},.65)
          .from('.hero-copy .actions > *',{y:24,opacity:0,duration:.8,stagger:.1},.8)
          .from('.header > *',{y:-14,opacity:0,duration:.8,stagger:.08},.2);
        introPlayed = true;
      }
      gsap.timeline({scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}})
        .to('.object-orbit',{y:150,rotationY:40,rotationZ:-18,scale:.78,ease:'none'},0)
        .to('.hero-grid',{y:100,ease:'none'},0)
        .to('.hero-copy',{y:-85,opacity:0,ease:'none',duration:.62},.02);
      gsap.to('.hero-type-scroll',{y:-130,x:70,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.5}});
      // The pointer rig sits inside the scroll orbit: each input owns a transform.
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const hero = document.querySelector('.hero');
        const rig = document.querySelector('.pointer-rig');
        const turnX = gsap.quickTo(rig,'rotationX',{duration:.8,ease:'power3.out'});
        const turnY = gsap.quickTo(rig,'rotationY',{duration:.8,ease:'power3.out'});
        const textX = gsap.quickTo('.hero-type-pointer','x',{duration:1,ease:'power3.out'});
        const textY = gsap.quickTo('.hero-type-pointer','y',{duration:1,ease:'power3.out'});
        const move = event => {
          if (event.pointerType === 'touch') return;
          const bounds = hero.getBoundingClientRect();
          const x = Math.max(-.5,Math.min(.5,(event.clientX-bounds.left)/bounds.width-.5));
          const y = Math.max(-.5,Math.min(.5,(event.clientY-bounds.top)/bounds.height-.5));
          turnX(-y*16); turnY(x*22);
          textX(x*45);textY(y*32);
        };
        const reset = () => {turnX(0);turnY(0);textX(0);textY(0);};
        hero.addEventListener('pointermove',move,{passive:true});
        hero.addEventListener('pointerleave',reset);
        removePointer = () => {hero.removeEventListener('pointermove',move);hero.removeEventListener('pointerleave',reset);};
      }
      gsap.utils.toArray('.reveal:not(.code-workbench)').forEach((element,index) => {
        gsap.from(element,{y:55,opacity:0,duration:1.05,ease:'power3.out',delay:element.classList.contains('benefit') ? (index%3)*.06 : 0,scrollTrigger:{trigger:element,start:'top 90%',toggleActions:'play none none reverse'}});
      });
      gsap.from('.code-workbench',{y:80,rotationX:7,scale:.97,opacity:.35,transformPerspective:1200,ease:'none',scrollTrigger:{trigger:'.tool-layout',start:'top 95%',end:'top 40%',scrub:1}});
      gsap.utils.toArray('.chapter-rule').forEach(line => gsap.from(line,{scaleX:0,ease:'none',scrollTrigger:{trigger:line.parentElement,start:'top 95%',end:'top 45%',scrub:1}}));
      gsap.from('.updates h2',{x:-50,opacity:.15,ease:'none',scrollTrigger:{trigger:'.updates',start:'top 95%',end:'top 55%',scrub:1}});
      const phone = window.matchMedia('(max-width: 899px)').matches;
      const dataHeight = dataVisual.querySelector('.data-sticky').getBoundingClientRect().height;
      const pinData = phone && dataHeight <= window.innerHeight-110;
      if(pinData){dataVisual.style.setProperty('--data-height',`${Math.ceil(dataHeight)}px`);dataVisual.classList.add('is-phone-scene');}
      const data = gsap.timeline({scrollTrigger:{trigger:dataVisual,start:pinData?'top 90px':'top 85%',end:pinData?'+=600':'bottom 35%',scrub:.3,invalidateOnRefresh:true}});
      data.fromTo('.data-orbit',{rotationX:64,rotationY:0,rotationZ:-58},{rotationX:52,rotationY:0,rotationZ:-22,duration:1,ease:'none'},0);
      gsap.utils.toArray('.data-layer').forEach((layer,i) => {
        data.fromTo(layer,{z:(1.5-i)*16},{z:(1.5-i)*(phone?85:120),duration:.7,ease:'power2.inOut'},i*.07);
      });
      gsap.timeline({scrollTrigger:{trigger:'.engineering',start:'top 80%',end:'bottom 25%',scrub:1}})
        .fromTo('.packet-orbit',{rotationY:-45,rotationZ:-18},{rotationY:25,rotationZ:12,duration:1,ease:'none'},0)
        .fromTo('.packet-one',{x:-160,y:-80,rotationY:-40},{x:-95,y:-20,rotationY:0,duration:1,ease:'none'},0)
        .fromTo('.packet-two',{y:105,rotationX:55},{y:45,rotationX:0,duration:1,ease:'none'},0)
        .fromTo('.packet-three',{x:200,y:-90,rotationZ:45},{x:130,y:-15,rotationZ:0,duration:1,ease:'none'},0);
      gsap.utils.toArray('.engineering-check').forEach(element => {
        gsap.from(element,{y:65,opacity:.2,ease:'none',scrollTrigger:{trigger:element,start:'top 90%',end:'top 57%',scrub:.65}});
      });
      gsap.utils.toArray('.kit-number').forEach(number => {
        gsap.from(number,{y:20,rotationX:-80,transformPerspective:500,duration:.75,ease:'power3.out',scrollTrigger:{trigger:number.closest('.kit-row'),start:'top 94%',toggleActions:'play none none reverse'}});
      });
      gsap.from('.validation-sequence li',{y:45,opacity:.15,stagger:.14,duration:.65,ease:'power2.out',scrollTrigger:{trigger:'.validation-sequence',start:'top 88%',end:'bottom 65%',scrub:1}});
    });
    responsive = gsap.matchMedia();
    responsive.add('(min-width: 320px)', () => {
      const phone = window.matchMedia('(max-width: 899px)').matches;
      const headerHeight = phone ? 70 : 80;
      walk.classList.add('is-pinned');
      const stepHeight = Math.ceil(Math.max(...steps.map(step => step.scrollHeight)));
      walk.style.setProperty('--step-height',`${stepHeight}px`);
      // Measure complete content rather than excluding phones by width.
      // Short screens / large text retain sticky navigation and readable steps.
      if (walk.getBoundingClientRect().height > window.innerHeight-headerHeight+2) {
        walk.classList.remove('is-pinned');
        walk.classList.add('is-mobile-readable');
        walk.style.removeProperty('--step-height');
        steps.forEach((step,index) => ScrollTrigger.create({trigger:step,start:`top ${headerHeight+100}px`,end:'bottom top',onEnter:()=>markStep(index,false),onEnterBack:()=>markStep(index,false)}));
        return () => {walk.classList.remove('is-mobile-readable');markStep(0,false);};
      }
      const reel = document.querySelector('.number-reel');
      gsap.set(steps.slice(1),{autoAlpha:0,y:80});
      markStep(0);
      const clock = {value:0};
      let active = 0;
      const distance=Math.round(walk.clientHeight*(phone?2:2.6));
      if(phone){process.style.setProperty('--scene-height',`${walk.clientHeight}px`);process.style.setProperty('--scene-scroll',`${distance}px`);process.classList.add('is-phone-scene');}
      processTimeline = gsap.timeline({scrollTrigger:{trigger:phone?process:walk,start:`top ${headerHeight}px`,end:`+=${distance}`,pin:!phone,refreshPriority:10,scrub:phone?.15:.65,anticipatePin:1,invalidateOnRefresh:true,onUpdate:self=>{
        const next = self.progress < .34 ? 0 : self.progress < .67 ? 1 : 2;
        if (next !== active) { active = next; markStep(active); }
      }}});
      processTimeline.to(clock,{value:1,duration:1,ease:'none'},0);
      [1,2].forEach(i => {
        const at = i === 1 ? .275 : .605;
        processTimeline.to(steps[i-1],{autoAlpha:0,y:-18,duration:.06,ease:'power2.in'},at)
          .fromTo(steps[i],{autoAlpha:0,y:28},{autoAlpha:1,y:0,duration:.08,ease:'power3.out'},at+.065)
          .to(reel,{y:()=>-i*document.querySelector('.number-window').clientHeight,duration:.15,ease:'power3.inOut'},at);
      });
      return () => { processTimeline = null; process.classList.remove('is-phone-scene');walk.classList.remove('is-pinned'); walk.style.removeProperty('--step-height'); markStep(0,false); };
    });
    ScrollTrigger.sort();ScrollTrigger.refresh();
  }
  stepLinks.forEach((link,index) => link.addEventListener('click', event => {
    const trigger = processTimeline?.scrollTrigger;
    if (!trigger) return;
    event.preventDefault();
    const fractions=[.12,.48,.84];
    window.scrollTo({top:trigger.start+(trigger.end-trigger.start)*fractions[index],behavior:'smooth'});
    history.replaceState(null,'',link.getAttribute('href'));
  }));
  // Resolve direct links after pin distances are measured.
  function followHash() {
    const trigger=processTimeline?.scrollTrigger;
    const index=steps.findIndex(step=>`#${step.id}`===location.hash);
    if(trigger && index>=0) window.scrollTo({top:trigger.start+(trigger.end-trigger.start)*[.12,.48,.84][index],behavior:'instant'});
  }
  toggle.addEventListener('click',()=>{manualReduce=!manualReduce;try{localStorage.setItem('devkit-reduce-motion',String(manualReduce));}catch(_){}build();});
  media.addEventListener?.('change',build);
  window.addEventListener('devkit:layout',build);
  window.addEventListener('hashchange',followHash);
  window.addEventListener('pagehide',cleanup);
  window.addEventListener('pageshow',event=>{if(event.persisted)build();});
  document.querySelectorAll('details').forEach(item=>item.addEventListener('toggle',()=>ScrollTrigger.refresh()));
  build();
  document.fonts?.ready.then(()=>{build();followHash();});
  let layoutWidth=window.innerWidth, resizeTimer;
  window.addEventListener('resize',()=>{
    if(window.innerWidth===layoutWidth)return;
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(()=>{layoutWidth=window.innerWidth;build();},150);
  },{passive:true});
  window.addEventListener('load',()=>{ScrollTrigger.refresh();followHash();},{once:true});
})();
