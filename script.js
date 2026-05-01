document.addEventListener("DOMContentLoaded", () => {

  const sections = document.querySelectorAll(".section");
  let current = 0;
  let busy = false;

  function go(index){
    if(index<0 || index>=sections.length) return;
    if(busy) return;

    busy = true;

    sections.forEach(s=>s.classList.remove("active"));
    sections[index].classList.add("active");

    sections[index].scrollIntoView({behavior:"smooth"});
    current = index;

    trigger(index);

    if(index === sections.length-1){
      startCards();
    }

    setTimeout(()=>busy=false,1000);
  }

  window.addEventListener("wheel", e=>{
    if(e.deltaY>0) go(current+1);
    else go(current-1);
  });

  let startY=0;
  window.addEventListener("touchstart",e=>{
    startY = e.touches[0].clientY;
  });

  window.addEventListener("touchend",e=>{
    let end = e.changedTouches[0].clientY;
    if(startY-end>50) go(current+1);
    else if(end-startY>50) go(current-1);
  });

  function trigger(i){
    const sec = sections[i];

    const fade = sec.querySelector(".fade");
    if(fade) fade.classList.add("show");

    const caption = sec.querySelector(".caption");
    if(caption) setTimeout(()=>caption.classList.add("show"),300);

    const vid = sec.querySelector("video");
    if(vid) vid.play().catch(()=>{});
  }

  window.openLetter = function(el){
    const sec = el.closest(".interact");
    sec.querySelector(".choices").style.display="none";

    sec.querySelector(".envelope").classList.add("open");

    setTimeout(()=>{
      sec.querySelector(".reveal-heart").classList.add("show");
    },500);

    setTimeout(()=>{
      sec.querySelector(".hidden-text").classList.add("show");
    },1100);
  }

  const noBtn = document.getElementById("noBtn");
  if(noBtn){
    noBtn.addEventListener("mouseover", moveNo);
    noBtn.addEventListener("touchstart", moveNo);
  }

  function moveNo(){
    noBtn.style.transform = `translate(${Math.random()*60-30}px, ${Math.random()*40-20}px)`;
  }

  function startCards(){
    const container = document.getElementById("cardBg");
    const photos = [
      "images/photo1.JPG","images/photo2.JPG","images/photo3.JPG",
      "images/photo4.JPG","images/photo5.JPG","images/photo6.JPG"
    ];

    container.innerHTML="";

    for(let i=0;i<15;i++){
      const img = document.createElement("img");
      img.src = photos[Math.floor(Math.random()*photos.length)];
      img.classList.add("card");

      img.style.left = Math.random()*90+"%";
      img.style.top = Math.random()*80+"%";

      container.appendChild(img);

      setTimeout(()=>{
        img.style.animation="dropCard 0.8s forwards";
        setTimeout(()=>img.classList.add("float"),800);
      }, i*120);
    }
  }

  go(0);
});


const indicator = document.querySelector(".scroll-indicator");

window.addEventListener("wheel", () => {
  if (indicator) indicator.style.opacity = "0";
});

window.addEventListener("touchstart", () => {
  if (indicator) indicator.style.opacity = "0";
});