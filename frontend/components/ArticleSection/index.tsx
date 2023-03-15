import Image from "next/image";
import img_main from "../../assets/img/临时配图.png";
import style from "./style.module.scss";

const ArticleSection = () => {
  return (
    <>
      <div className={style.ArticleSection}>
        <article>
          <h1 className={style.title}>ZERONE社区金库ZRO超募预售</h1>
          <div className={style.content}>
            Hello,Good morning lady and gentleman,How do you do,glod to meet
            you,Im Zhao Ye. © Xi Da Jie primary school of Jiu quan,my topic is:
            love English.i love English ~ . English language is now used
            everywhere in the world. M * W It has become the mostcommon language
            on Internet and for in- ternational trade. Learning English makes me
            confident andbrings me great pleasure. & When I was sev-en,my mother
            sent me to an English school. W At there,I played games and
            sangEnglish songs with other children. Then I discovered the beauty
            of the language,and began my colorfuldream.
          </div>
          <div className={style.img}>
            <Image src={img_main} />
          </div>
        </article>
      </div>
    </>
  );
};

export default ArticleSection;
