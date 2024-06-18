import { classNames, Mods } from 'shared/lib/classNames/classNames';
import {
  ChangeEvent, memo, useCallback, useMemo,
} from 'react';
import cls from './Select.module.scss';

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    readOnly?: boolean
}

const Select = memo(({
  className, label, options, value, onChange, readOnly,
}: SelectProps) => {
  const optionList = useMemo(
    () => options?.map((item) => (
      <option
        className={cls.option}
        value={item.value}
        key={item.value}
      >
        {item.content}
      </option>
    )),
    [options],
  );

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  }, [onChange]);

  const mods: Mods = {};

  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {label && <span className={cls.label}>{`${label}>`}</span>}
      <select
        disabled={readOnly}
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionList}
      </select>
    </div>
  );
});

export { Select };
