import { ChangeEvent, useCallback, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
    value: T;
    content: string;
}

interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
    readOnly?: boolean
}

const Select = <T extends string>({
  className, label, options, value, onChange, readOnly,
}: SelectProps<T>) => {
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
    onChange?.(e.target.value as T);
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
};

export { Select };
