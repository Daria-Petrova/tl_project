function changeTitleColor(item) {
  let child = item.querySelector('.room__title');
  child.classList.toggle('clicked');
}

function changeRoomColor(item) {
  item.addEventListener('mouseleave', () =>  setInfoPanel(item));
  item.removeEventListener('mouseleave',() =>  setInfoPanel(item));
}

function showMessage(item) {
  let a = item.querySelector('.reserved__message.hidden');
  a.classList.remove('hidden');
}

function setInfoPanel(item) {
  let temp1 = window.getComputedStyle(item.querySelector('.room__info.room-info'));
  let temp2 = window.getComputedStyle(item.querySelector('.room__item'));
  let height = Number(temp1.getPropertyValue('height').substr(0,2)) + 
               Math.ceil(Number(temp1.getPropertyValue('border-top-width').substr(0,4)))*2 +
               Number(temp1.getPropertyValue('padding-top').substr(0,2)) +
               Number(temp2.getPropertyValue('padding-bottom').substr(0,2));
  let a = item.querySelector('.room__gradient');
  a.classList.add('reserved');
  let b = item.querySelector('.reserved');
  b.style.height = height +'px';
  if (item.querySelector('.reserved__message.hidden')) {
    const temp3 = item.querySelector('.reserved__message.hidden');
    if (temp3.classList) {
      temp3.classList.remove('hidden');
      changeTitleColor(item);
    }
  }
  
  
}

function reserveRoom() {
  document.addEventListener('click', ({target: t}) => {
    if (t.className === 'room-info__button') {
      let parent = t.closest('.room')
      changeTitleColor(parent);
      changeRoomColor(parent);
      //showMessage(parent)
      //console.log(parent.classList)
      //parent.classList.add('hidden')
    }
  })
};

reserveRoom()
