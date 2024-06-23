import styles from '@/styles/RoomAllocation.module.css';
import { I_Guset, I_Rooms } from '@/pages/index';
import CustomInputNumber from '../CustomInputNumber/CustomInputNumber';
import { useState } from 'react';
import { getDefaultRoomAllocation } from '@/utils/getDefaultRoomAllocation';

interface I_RoomAllocation {
  guest: I_Guset;
  rooms: I_Rooms[];
  onChange: (e: any) => void;
}

const RoomAllocation = ({ guest, rooms, onChange }: I_RoomAllocation) => {
  const [unAllotGuest, setUnAllotGuest] = useState({ adult: 0, child: 0 });
  const [roomalloction, setRoomalloction] = useState(getDefaultRoomAllocation(guest, rooms));
  let roomMax = rooms.length;

  const handleInputNumberOnBlur = (e: any) => {
    console.log('blur e.target.value', e.target.value);
    console.log('blur e.target.name', e.target.name);
  };

  const checkGuest = (str: string) => {
    return str.split('_');
  };

  const handleInputNumberOnChange = (e: any) => {
    console.log('change e.target.value', e.target.value);
    console.log('change e.target.name', e.target.name);

    const guestType = checkGuest(e.target.name)[0];
    const roomIndex = parseInt(checkGuest(e.target.name)[1]);
    const adultPrice = rooms[roomIndex].adultPrice;
    const childPrice = rooms[roomIndex].childPrice;
    const roomPrice = rooms[roomIndex].roomPrice;
    const updateRoomList = JSON.parse(JSON.stringify(roomalloction));

    updateRoomList[roomIndex][`${guestType}`] = parseInt(e.target.value);

    updateRoomList[roomIndex].price =
      adultPrice * parseInt(e.target.value) +
      childPrice * roomalloction[roomIndex].child +
      roomPrice;

    const totalAdult = updateRoomList.reduce((acc: any, val: { adult: any }) => acc + val.adult, 0);
    const totalChild = updateRoomList.reduce((acc: any, val: { child: any }) => acc + val.child, 0);

    const lastAdult = guest.adult - totalAdult;
    const lastChild = guest.child - totalChild;

    setUnAllotGuest({ adult: lastAdult, child: lastChild });
    setRoomalloction(updateRoomList);
    onChange(updateRoomList);
  };

  const handleDisable = (adult: number, child: number, capacity: number) => {
    return adult + child >= capacity;
  };

  return (
    <div className={styles.content}>
      <div
        className={styles.title}
      >{`住客人數：${guest.adult}位大人，${guest.child}位小孩 / ${roomMax}房`}</div>
      <div
        className={styles.notice}
      >{`尚未分配人數：${unAllotGuest.adult}位大人，${unAllotGuest.child}位小孩`}</div>

      {roomalloction &&
        roomalloction.map((i, index) => {
          return (
            <div className={`${index >= 1 && styles.border}`} key={index}>
              <div className={styles.roomTitle}>{`房間：${rooms[index].capacity}人`}</div>
              <div className={styles.roomBlock}>
                <div className={styles.peple}>
                  <div className={styles.pepleTitle}>大人</div>
                  <div className={styles.year}>年齡20+</div>
                </div>
                <CustomInputNumber
                  min={0}
                  max={rooms[index].capacity}
                  step={1}
                  name={`adult_${index}`}
                  value={i.adult}
                  disabled={
                    handleDisable(i.adult, i.child, rooms[index].capacity) ||
                    unAllotGuest.adult + unAllotGuest.child == 0
                  }
                  onChange={(e) => handleInputNumberOnChange(e)}
                  onBlur={(e) => handleInputNumberOnBlur(e)}
                />
              </div>
              <div className={styles.roomBlock}>
                <div className={styles.peple}>
                  <div className={styles.pepleTitle}>小孩</div>
                </div>
                <CustomInputNumber
                  min={0}
                  max={rooms[index].capacity}
                  step={1}
                  name={`child_${index}`}
                  value={i.child}
                  disabled={
                    handleDisable(i.adult, i.child, rooms[index].capacity) ||
                    unAllotGuest.adult + unAllotGuest.child == 0
                  }
                  onChange={(e) => handleInputNumberOnChange(e)}
                  onBlur={(e) => handleInputNumberOnBlur(e)}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default RoomAllocation;
