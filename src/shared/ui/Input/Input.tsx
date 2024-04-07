import React, {
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  autofocus?: boolean;
}

const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    ...other
  } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [isFocused, setFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);

  useEffect(() => {
    if (autofocus) {
      setFocused(true);
      ref.current.focus();
    }
  }, [autofocus]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setCaretPosition(e.target.value.length);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const onFocus = () => {
    setFocused(true);
  };

  const onSelect = (e: any) => {
    setCaretPosition(e?.target?.selectionStart ?? 0);
  };

  return (
    <div className={classNames(cls.InputWrapper, {}, [className])}>
      {placeholder && (
        <div className={cls.placeholder}>{`${placeholder}>`}</div>
      )}
      <div className={cls.caretWrapper}>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={cls.input}
          onBlur={onBlur}
          onFocus={onFocus}
          onSelect={onSelect}
          {...other}
        />
        {isFocused && (
          <span
            style={{ left: `${caretPosition * 9.6}px` }}
            className={cls.caret}
          />
        )}
      </div>
    </div>
  );
});

export { Input };
