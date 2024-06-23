export const getDefaultRoomAllocation = (guest: any, rooms: any) => {
  let childCount = 0;
  let adultCount = 0;
  let childMax = guest.child;
  let adultMax = guest.adult;

  let roomArr: any[] = [];
  rooms.forEach((i: any) => {
    let roomMax = i.capacity;
    let roomChild = 0;
    let roomAdult = 0;
    let price = 0;
    if (childCount < childMax) {
      if (childCount == 0) {
        roomChild = Math.floor(roomMax / 2);
      } else {
        roomChild = childMax - childCount;
      }
      childCount += roomChild;
      price += i.childPrice * roomChild;
    }

    if (adultCount < adultMax) {
      if (adultCount == 0) {
        roomAdult = roomMax - roomChild;
      } else {
        if (roomMax > adultMax - adultCount) {
          roomAdult = adultMax - adultCount;
        } else {
          roomAdult = roomMax - roomChild;
        }
      }
      adultCount += roomAdult;
      price += i.adultPrice * roomAdult;
    }

    if (roomAdult != 0 || roomChild != 0) {
      price += i.roomPrice;
    }

    roomArr.push({ adult: roomAdult, child: roomChild, price: price });
  });

  return roomArr;
};
