import { useCallback } from 'react';

import CopyIcon from '../../../assets/icons/copy-20-20.svg';
import { Button, ButtonTheme } from '../../deprecated/Button/Button';
import cls from './Code.module.scss';
import { ToggleFeatures } from '../../../lib/features/components/ToggleFeatures/ToggleFeatures';
import { Icon } from '../Icon/Icon';
import CopyIconNew from '../../../assets/icons/copy.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

interface CodeProps {
    className?: string;
    text: string;
}

const Code = ({ className, text }: CodeProps) => {
    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <pre
                    className={classNames(cls.CodeRedesigned, {}, [className])}
                >
                    <Icon
                        clickable
                        onClick={onCopy}
                        className={cls.copyBtn}
                        Svg={CopyIconNew}
                    />
                    <code>{text}</code>
                </pre>
            }
            off={
                <pre className={classNames(cls.Code, {}, [className])}>
                    <Button
                        onClick={onCopy}
                        className={cls.copyBtn}
                        theme={ButtonTheme.CLEAR}
                    >
                        <CopyIcon className={cls.copyIcon} />
                    </Button>
                    <code>{text}</code>
                </pre>
            }
        />
    );
};

export { Code };
