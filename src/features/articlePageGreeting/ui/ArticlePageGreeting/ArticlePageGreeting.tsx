import { memo, useCallback, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { useJsonSettings } from '@/entities/User/model/selectors/jsonSettings';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { Drawer } from '@/shared/ui/Drawer';

interface ArticlePageGreetingProps {
    className?: string;
}

export const ArticlePageGreeting = memo((props: ArticlePageGreetingProps) => {
    const { className } = props;
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();

    const { isArticlesPageWasOpened } = useJsonSettings();

    useEffect(() => {
        if (!isArticlesPageWasOpened) {
            setIsOpen(true);
            dispatch(saveJsonSettings({ isArticlesPageWasOpened: true }));
        }
    }, [dispatch, isArticlesPageWasOpened]);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const text = (
        <Text
            title="Добро пожаловать на страниву статей"
            text="Здесь вы можете искать и просматривать статьи на разные темы"
        />
    );

    if (isMobile) {
        return (
            <Drawer
                lazy
                isOpen={isOpen}
                className={className}
                onClose={onClose}
            >
                {text}
            </Drawer>
        );
    }

    return (
        <Modal lazy isOpen={isOpen} className={className} onClose={onClose}>
            {text}
        </Modal>
    );
});
