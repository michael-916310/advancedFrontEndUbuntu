import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import cls from "./NotFoundPage.module.scss";

interface NotFountPageProps {
  className?: string;
}

const NotFoundPage: FC<NotFountPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.NotFountPage, {}, [className])}>
      {t("Страница не найдена")}
    </div>
  );
};

export { NotFoundPage };
