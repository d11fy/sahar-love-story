(function(){
  'use strict';
  const $=(sel,root=document)=>root.querySelector(sel);
  const $$=(sel,root=document)=>Array.from(root.querySelectorAll(sel));
  const page=document.body.dataset.page;
  let toastTimer;
  function toast(msg){const t=$('#toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),3400)}
  function goto(url){if(!url || document.body.classList.contains('leaving'))return;if(matchMedia('(prefers-reduced-motion: reduce)').matches){location.href=url;return}document.body.classList.add('leaving');setTimeout(()=>location.href=url,490)}
  $$('a[data-transition]').forEach(a=>a.addEventListener('click',e=>{if(e.button!==0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)return;e.preventDefault();goto(a.getAttribute('href'))}));
  $$('[data-toast]').forEach(b=>b.addEventListener('click',()=>toast(b.dataset.toast)));
  function hearts(count, x=window.innerWidth/2,y=window.innerHeight*.65){const icons=['❤','♥','✦','♡','💗'];for(let i=0;i<count;i++){const el=document.createElement('span');el.className='float-heart';el.textContent=icons[Math.floor(Math.random()*icons.length)];el.style.setProperty('--x',`${x+(Math.random()-.5)*150}px`);el.style.setProperty('--y',`${y+(Math.random()-.5)*95}px`);el.style.setProperty('--sz',`${15+Math.random()*18}px`);el.style.setProperty('--tx',`${(Math.random()-.5)*320}px`);el.style.setProperty('--rot',`${(Math.random()-.5)*90}deg`);el.style.setProperty('--t',`${1.8+Math.random()*2}s`);el.style.color=['#ffc0d8','#ffa1c7','#d7b8ff','#fff4dd'][Math.floor(Math.random()*4)];document.body.appendChild(el);setTimeout(()=>el.remove(),4000)}}
  if(page==='welcome'){$('#not-guilty')?.addEventListener('click',()=>{toast('تم رفض طلب البراءة... عشان قلبه بيضعف قدامك أصلًا 😂');hearts(7)})}
  if(page==='cases'){
    const lines={stubborn:'يا بنت الحلال… العناد مش مسابقة كأس العالم 😂 بس لما نسمع بعض بنوصل أسرع.',same:'السؤال ده اتحفظ عندي أكتر من كلمة السر! لو زعلان مش معناها إني ناوي أمشي 🤍',double:'أنا أزعل... تقومي تزعلّي إني زعلت، وبكده عندنا زعلين بدل زعل واحد 😭',confused:'«طب أعمل إيه؟» حلو إنك بتسألي، والأحلى نسمع اللي ضايق بعض ونفكر إزاي ما يتكررش.'};
    $$('.case').forEach(c=>c.addEventListener('click',()=>{$$('.case').forEach(x=>{x.classList.remove('active');x.setAttribute('aria-pressed','false')});c.classList.add('active');c.setAttribute('aria-pressed','true');const box=$('#case-comment');box.classList.remove('pop');void box.offsetWidth;box.textContent=lines[c.dataset.case];box.classList.add('pop')}));
  }
  if(page==='loop'){
    $('#break-loop')?.addEventListener('click',()=>{const d=$('#loop-disc');d.classList.add('broken');$('.loop-core i').textContent='🌱';$('.loop-core small').textContent='تغيير حقيقي = راحة أكتر';const ns=$$('.loop-node');['موقف','حكي واضح','نفهم السبب','نغيّر التصرف'].forEach((x,i)=>ns[i].textContent=x);$('#break-loop').textContent='هيك بنبدأ صح ✨';$('#break-loop').disabled=true;$('#loop-after').hidden=false;hearts(12)})
  }
  if(page==='reaction'){
    const stages=[
      {icon:'🫶',title:'نرجع للسبب',hint:'شو اللي زعّلنا أصلًا؟'},
      {icon:'👂',title:'نسمع بعض',hint:'نفهم بدون اتهامات'},
      {icon:'🌱',title:'نتفق على تغيير',hint:'ما نكرر نفس الموقف'},
      {icon:'💗',title:'نحكي بلطف',hint:'حتى لو بعدنا متضايقين'}
    ];
    $('#reaction-switch')?.addEventListener('click',()=>{
      const board=$('#reaction-board');if(board.classList.contains('solved'))return;
      board.classList.add('solved');
      $$('.reaction-step',board).forEach((step,i)=>{
        step.style.animation='none'; void step.offsetWidth; step.style.animation='';
        $('.reaction-step-icon',step).textContent=stages[i].icon;
        $('strong',step).textContent=stages[i].title;
        $('small',step).textContent=stages[i].hint;
      });
      $('#reaction-tag').textContent='💌 النسخة اللي بدي إياها لعلاقتنا';
      $('#reaction-status').textContent='✓ رجعنا للجذر بدل ما نضيّعه';
      $('#reaction-caption').innerHTML='';
      const emot=document.createElement('span');emot.textContent='🌷';
      const msg=document.createElement('p');msg.textContent='هيك بنحلّ السبب الأساسي، وبنحكي عن طريقة الرد كمان بدون ما نكبّر الخلاف.';
      $('#reaction-caption').append(emot,msg);
      const btn=$('#reaction-switch');btn.textContent='هيك أحلى… فريق واحد 🤍';btn.setAttribute('aria-pressed','true');btn.disabled=true;
      hearts(24);
    });
  }
  if(page==='talk'){
    const choices={why:{her:'إنت زعلان ليش؟ ما عملت إشي!',him:'أنا مش طالب خناقة يا سهر، بس بديك تسمعيني قبل ما نفوت بمين الصح 🥲',tip:'الاستفهام مش مشكلة... بس الاتهام قبل الفهم بيضيّعنا.'},enough:{her:'خلص لا تزعل، يلا تصالحنا 🙈',him:'بحب أتصالح معك، بس أهم إشي ما نرجع نزعل من نفس الموضوع بكرة.',tip:'المصالحة الحلوة بتهدّي اللحظة، والتفاهم بيمنع تكرارها.'},listen:{her:'احكيلي شو ضايقك، وكيف نقدر نمنع هالإشي يتكرر؟ 🤍',him:'هيك بالضبط! تعالي نحكي ونفهم بعض… أنا وإنتِ فريق واحد 🤍',tip:'إجابة من القلب: اسمعي، افهمي، وبعدين نغيّر اللي محتاج يتغيّر.'}};
    $$('.talk-choice').forEach(b=>b.addEventListener('click',()=>{$$('.talk-choice').forEach(x=>{x.classList.remove('active');x.setAttribute('aria-pressed','false')});b.classList.add('active');b.setAttribute('aria-pressed','true');const data=choices[b.dataset.talk];const chat=$('#chat-messages');chat.innerHTML='';const m1=document.createElement('div');m1.className='bubble her';m1.textContent=data.her;const m2=document.createElement('div');m2.className='bubble him';m2.textContent=data.him;chat.append(m1,m2);$('#talk-tip').textContent=data.tip;if(b.dataset.talk==='listen')hearts(8,window.innerWidth*.5,window.innerHeight*.6)}));
  }
  if(page==='quiz'){
    const questions=[{q:'لو علي زعلان من موقف تكرر، أحسن رد إيه؟',answers:['طب خلص لا تكبّر الموضوع 😌','أسمع منه، أفهم اللي ضايقه، ونشوف حل 💗','أزعل منه لأنه زعل مني 😤'],correct:1,reply:'برافو! المصالحة مش كلمة وبس، هي اهتمام وفهم.'},{q:'ولو نفس المشكلة رجعت تاني؟',answers:['نكرر نفس الصلحة ونشوف الموسم الجاي 📺','نقول إن الموضوع بسيط وننساه','نحكي عن السبب ونتفق على تغيير واضح 🌷'],correct:2,reply:'بالضبط! المطلوب نوقف التكرار، مش نعيد الحلقة.'},{q:'وإذا سألتِ: «بدك تسيبني؟» وهو زعلان؟',answers:['أفهم إن الزعل مش معناه نهاية الحب 🤍','أفتح تحقيق ٣ ساعات 🕵️‍♀️','أزعل وأقلبها دراما تركية 🎬'],correct:0,reply:'صح! الخلاف مش نهاية القصة، والتفاهم بيخلي الحب أهدى.'},{q:'لو علي ردّ ببرود لأنه زعلان من موقف، شو الأحسن نعمل؟',answers:['ننسى الموقف ونفتح خناقة عن البرود 🎭','نفهم سبب الزعل الأول، ونحكي عن البرود بهدوء كمان 🤝','نقول خلص ونرجع نكرر نفس القصة 🔁'],correct:1,reply:'ممتاز! السبب الأساسي مهم، وطريقة الرد كمان مهمة… بنحلّ الاثنين بدون ما نضيّع الأصل.'}];
    let n=0,score=0,chosen=false;
    function render(){chosen=false;const data=questions[n];$('#quiz-index').textContent=`سؤال ${n+1} من ${questions.length}`;$('#quiz-fill').style.width=`${(n+1)/questions.length*100}%`;$('#quiz-question').textContent=data.q;const list=$('#quiz-options');list.innerHTML='';data.answers.forEach((ans,i)=>{const b=document.createElement('button');b.type='button';b.className='quiz-option';b.textContent=ans;b.addEventListener('click',()=>{if(chosen)return;chosen=true;const correct=i===data.correct;if(correct)score++;$$('.quiz-option',list).forEach((opt,k)=>{opt.disabled=true;if(k===data.correct)opt.classList.add('correct');else if(k===i)opt.classList.add('wrong')});$('#quiz-feedback').textContent=(correct?'✅ ':'💗 ')+data.reply;$('#quiz-next').hidden=false;if(correct)hearts(5)});list.appendChild(b)});$('#quiz-feedback').textContent='اختاري جواب… وما في رسوب بالحب 😌';$('#quiz-next').hidden=true}
    $('#quiz-next')?.addEventListener('click',()=>{n++;if(n<questions.length){render()}else{$('#quiz-main').hidden=true;$('#quiz-result').hidden=false;$('#quiz-score').textContent=`${score} / ${questions.length}`;$('#quiz-result-text').textContent=score===4?'مبروك! تستاهلي شهادة «خبيرة مصالحة مع مرتبة الحب» 😂💖':'المهم مش العلامة يا سهر… المهم إننا نفهم بعض ونتعلّم من بعض 🤍';hearts(26)}});render();
  }
  if(page==='promise'){
    const checks=$$('.pact-checks input');checks.forEach(c=>c.addEventListener('change',()=>{$('#pact-seal').disabled=!checks.every(x=>x.checked)}));$('#pact-seal')?.addEventListener('click',()=>{$('#pact-stamp').hidden=false;$('#pact-seal').textContent='اتفقنا يا سهر 🤍';$('#pact-seal').disabled=true;hearts(23)});
  }
  if(page==='letter'){
    const env=$('#envelope');env?.addEventListener('click',()=>{if(env.classList.contains('open'))return;env.classList.add('open');env.setAttribute('aria-expanded','true');setTimeout(()=>{$('#envelope-box').hidden=true;$('#letter-card').hidden=false;$('#open-hint').hidden=true;hearts(44)},800)});$('#love-again')?.addEventListener('click',()=>hearts(35));
    $('#copy-letter')?.addEventListener('click',async()=>{const msg=$('#love-letter-text').innerText;try{await navigator.clipboard.writeText(msg);toast('اننسخت رسالة الحب 🤍')}catch{toast('اضغطي مطوّلًا على الرسالة عشان تنسخيها 🤍')}})
  }
})();
