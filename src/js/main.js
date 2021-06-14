function changeTitleColor(item) {
  let child = item.querySelector('.room__title');
  if ( child.classList.contains('clicked')) {
    child.classList.add('double-clicked');
  }
  child.classList.add('clicked');
}

function changeImageOpacity(item) {
  let child = item.querySelector('.room__image');
  child.classList.add('clicked-image');
}

function changeRoomColor(item) {
  item.addEventListener('mouseleave', () =>  setInfoPanel(item));
  item.removeEventListener('mouseleave',() =>  setInfoPanel(item));
}

function showMessage(item) {
  let a = item.querySelector('.reserved__message.hidden');
  a.classList.remove('hidden');
}

function hiddenBestPrice(item) {
  let child = item.querySelector('.room__bestprice.room-bestprice');
  if(child) child.classList.add('hidden');
}

function setInfoPanel(item) {
  let temp1 = window.getComputedStyle(item.querySelector('.room__info.room-info'));
  let temp2 = window.getComputedStyle(item.querySelector('.room__item'));
  let t = temp1.getPropertyValue('border-top-width')
  if (t ==='1px') t='0.99px';
  let lenghtString1 = temp1.getPropertyValue('height').indexOf('.');
  let lenghtString2 = temp1.getPropertyValue('height').indexOf('p');
  let lenghtString;
  lenghtString1 ===(-1)?lenghtString = lenghtString2: lenghtString = lenghtString1; 
  let height = Number(temp1.getPropertyValue('height').slice(0, lenghtString)) + 
               Math.ceil(Number(t.substr(0,4)))*2 +
               Number(temp1.getPropertyValue('padding-top').substr(0,2)) +
               Number(temp2.getPropertyValue('padding-bottom').substr(0,2));
  let a = item.querySelector('.room__reserved');
  a.classList.add('reserved');
  let b = item.querySelector('.reserved');
  b.style.height = height +'px';
  if (item.querySelector('.reserved__message.hidden')) {
    const temp3 = item.querySelector('.reserved__message.hidden');
    if (temp3.classList) {
      temp3.classList.remove('hidden');
      changeTitleColor(item);
      changeImageOpacity(item);
      hiddenBestPrice(item);
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
