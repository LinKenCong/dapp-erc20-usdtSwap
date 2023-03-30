import { NextComponentType } from "next";
import Image from "next/image";
import img_main from "../../assets/img/临时配图.png";
import style from "./style.module.scss";
import { useLocalization } from "../../localization";

const ArticleSection: NextComponentType = () => {
  const { t } = useLocalization();
  return (
    <>
      <div className={style.ArticleSection}>
        <article>
          <div className={style.articleHTML} dangerouslySetInnerHTML={{ __html: t("html_article_home") }}></div>
          <div className={style.img}>
            <Image src={img_main} alt="artcle img" />
          </div>
        </article>
      </div>
    </>
  );
};

export default ArticleSection;
