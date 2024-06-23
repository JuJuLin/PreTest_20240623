import { useBlurOutside } from '@/hook/useBlurOutside';
import styles from '@/styles/CustomInputNumber.module.css';
import { useEffect, useRef, useState } from 'react';

interface I_CustomInputNumber {
  min: number;
  max: number;
  step: number;
  name: string;
  value: number;
  disabled: boolean;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
}

const CustomInputNumber = ({
  min,
  max,
  step,
  name,
  value,
  disabled,
  onChange,
  onBlur,
}: I_CustomInputNumber) => {
  const [count, setCount] = useState(value);
  // const inputRef = useBlurOutside((e) => handleInputBlur(e));
  const inputRef = useRef(null);

  const handleInputChange = (e: any) => {
    setCount(parseInt(e.target.value));
    onChange(e);
  };

  const handleInputBlur = (e) => {
    console.log('blur');
    onBlur(e);
  };

  const handleMinClick = () => {
    if (count < step) {
      triggerInput(min);
    } else {
      triggerInput(count - step);
    }
  };

  const handleMaxClick = () => {
    if (count >= max) {
      triggerInput(max);
    } else {
      if (max - count < step) {
        triggerInput(max);
      } else {
        triggerInput(count + step);
      }
    }
  };

  const triggerInput = (value: number) => {
    const input = document.getElementById(name);
    const lastValue = input.value;
    input.value = value;
    const event = new Event('input', { bubbles: true });
    const tracker = input?._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }
    input?.dispatchEvent(event);
  };

  return (
    <div className={`${styles.content}`}>
      <button
        className={`${styles.min} ${count == min && styles.disabled}`}
        onClick={handleMinClick}
      />
      <input
        ref={inputRef}
        className={styles.input}
        type='text'
        value={count}
        onChange={(e) => handleInputChange(e)}
        onBlur={(e) => handleInputBlur(e)}
        id={name}
        name={name}
        disabled={disabled}
      />
      <button
        className={`${styles.max}  ${(count == max || disabled) && styles.disabled}`}
        onClick={() => handleMaxClick()}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomInputNumber;
