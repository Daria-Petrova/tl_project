function resizeButton() {
  let findSize = document.querySelectorAll('.room-info__button')
  let sizeArray = [].map.call(findSize, (obj) => obj.offsetHeight )
  let maxSize = (Math.max(...sizeArray))
  findSize.forEach( item => {
    item.style.minHeight = maxSize + 'px'
  })
}

resizeButton();

function reserveRoom() {
  let targetElement = this.event.target
  if (targetElement.closest('.room')) {
    changeStyle(targetElement.closest('.room'))
  }
}

function changeStyle(item) {
  if (item.classList) {
    item.classList.add('room_active')
    item.addEventListener('mouseleave', () => {
      item.classList.remove('room_active')
      item.classList.add('room_reserved')
    }, {once: true})
  }
}

function cancelReserve() {
  document.addEventListener('click', ({target: t}) => {
    if (t.className !== 'room__reserved-link') {
      if (t.closest('.room.room_reserved')) {
        t.closest('.room.room_reserved').classList.remove('room_reserved')
      }
    }
  })
}

cancelReserve();

resizePrice();


function resizePrice() {
  let findSize = document.querySelectorAll('.room-info__price')
  console.log(findSize)
  let sizeArray = [].map.call(findSize, (obj) => obj.offsetHeight )
  let maxSize = (Math.max(...sizeArray))
  findSize.forEach( item => {
    item.style.minHeight = maxSize + 'px'
  })
}