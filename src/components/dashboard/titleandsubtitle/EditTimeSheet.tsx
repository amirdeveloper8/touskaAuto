import { useEffect, useState } from "react";
import { getData } from "../../../lib/get-data";
import SingleTitle from "./SingleTitle";
import CreateTitle from "./CreateTitle";
import classes from "./edit.module.css";
import CreateSubtitle from "./CreateSubtitle";

export interface typeListTitles {
  id: number;
  title: string;
  subtitles: {
    id: number;
    name: string;
  }[];
}

export interface typeSubtitles {
  id: number;
  name: string;
}

const EditTimeSheet: React.FC = () => {
  const [allTitles, setAllTitles] = useState<typeListTitles[]>([]);

  const [allSubtitles, setAllSubtitles] = useState<typeSubtitles[]>([]);

  const [showAllTitles, setShowAllTitles] = useState(true);
  const [showCreateTitle, setShowCreateTitle] = useState(false);
  const [showCreateSub, setShowCreateSub] = useState(false);

  useEffect(() => {
    const getTitles = async () => {
      const value = await getData("get/getTitleWithsubTitles");
      setAllTitles(value);
    };
    getTitles();

    const getSubtitles = async () => {
      const value = await getData("get/subTitle");
      setAllSubtitles(value.subtitle);
    };
    getSubtitles();
  }, []);

  console.log("allSubtitles", allSubtitles);
  console.log("titles", allTitles);

  const singleTitle = [];
  for (let i = 0; i < allTitles.length; i++) {
    singleTitle[i] = (
      <SingleTitle key={i + 1} subtitles={allSubtitles} value={allTitles[i]} />
    );
  }

  const showAllTitlessHandelr = () => {
    setShowAllTitles(true);
    setShowCreateTitle(false);
    setShowCreateSub(false);
  };

  const showCreateTitleHandelr = () => {
    setShowAllTitles(false);
    setShowCreateTitle(true);
    setShowCreateSub(false);
  };

  const showCreateSubHandelr = () => {
    setShowAllTitles(false);
    setShowCreateTitle(false);
    setShowCreateSub(true);
  };
  return (
    <section className={classes.edit}>
      <h1>آپدیت تایم شیت</h1>
      <div className={classes.links}>
        <button onClick={showAllTitlessHandelr}>نمایش عنوان‌ها</button>
        <button onClick={showCreateTitleHandelr}>ایجاد Title</button>
        <button onClick={showCreateSubHandelr}>ایجاد Subtitle</button>
      </div>
      {showAllTitles && <div className={classes.allTitles}>{singleTitle}</div>}
      {showCreateTitle && <CreateTitle />}
      {showCreateSub && <CreateSubtitle titles={allTitles} />}
    </section>
  );
};

export default EditTimeSheet;