function reserveRoom() {
  document.addEventListener('click', ({target: t}) => {
    if (t.className === 'room-info__button') {
      if (t.closest('.room')) {
        changeStyle(t.closest('.room'));
      }
    }
  });
}

function changeStyle(item) {
  if (item.classList) {
    item.classList.add('room_active');
    item.addEventListener('mouseleave', () => {
      item.classList.remove('room_active');
      item.classList.add('room_reserved');
    }, {once: true});
  }
}

function cancelReserve() {
  document.addEventListener('click', ({target: t}) => {
    if (t.className !== 'room__reserved-link') {
      if (t.closest('.room.room_reserved')) {
        t.closest('.room.room_reserved').classList.remove('room_reserved');
      }
    }
  });
}

reserveRoom();
cancelReserve();