import { FrameTypeEnum, Media } from "@chili-publish/editor-sdk";
import { FC, useEffect, useMemo, useState } from "react";
import List, { ListItem } from "../../components/list/List";
import "./RandomMemeList.css";

type RandomMemeListProps = {
  canLoad: boolean;
};

const RandomMemeList: FC<RandomMemeListProps> = (props) => {
  const { canLoad } = props;
  const [memes, setMemes] = useState<ListItem[]>([]);

  const randomNumbers = useMemo(() => {
    const arr = [];
    while (arr.length < 8) {
      var r = Math.floor(Math.random() * 100) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  }, []);

  const randomMemes = useMemo(() => {
    if (memes.length) {
      return memes.filter((meme, idx) => randomNumbers.includes(idx));
    }
    return [];
  }, [randomNumbers, memes]);

  const selectMeme = async (meme: Media) => {
    console.log(meme);

    const selectedLayout = await window.SDK.layout.getSelectedLayout();
    const selectedLayoutId = selectedLayout.parsedData?.layoutId;

    // TODO: remove when SDK has been updated
    // @ts-ignore
    const width = meme.metaData.width || "0";
    // @ts-ignore
    const height = meme.metaData.height || "0";

    if (selectedLayoutId) {
      // cleanup frames
      const framesOnLayout = await window.SDK.frame.getFrames();
      framesOnLayout.parsedData?.forEach(async (frame) => {
        await window.SDK.frame.removeFrame(frame.frameId);
      });

      await window.SDK.layout.setLayoutWidth(selectedLayoutId, width);
      await window.SDK.layout.setLayoutHeight(selectedLayoutId, height);

      const newFrame = await window.SDK.frame.addFrame(
        FrameTypeEnum.image,
        0,
        0,
        parseInt(width),
        parseInt(height)
      );
      if (newFrame.parsedData?.toString()) {
        await window.SDK.frame.setImageFromConnector(
          newFrame.parsedData?.toString(),
          "demo-connector",
          meme.id
        );
      }
    }
  };

  useEffect(() => {
    const fetchMemes = async () => {
      const data = await window.SDK.mediaConnector.query(
        "demo-connector",
        {},
        {}
      );

      if (data.parsedData) {
        const parsedMemes = data.parsedData.data.map((meme) => {
          console.log(meme);
          return {
            key: meme.id,
            onClick: () => selectMeme(meme),
            value: <img className="meme-img" src={meme.id} alt={meme.name} />,
          };
        });
        setMemes(parsedMemes);
        console.log(parsedMemes);
      } else {
        setMemes([]);
      }
    };

    if (canLoad) {
      fetchMemes();
    }
  }, [canLoad]);

  console.log(canLoad);

  if (memes.length) {
    return (
      <section className="memelist">
        <List isHorizontal listItems={randomMemes} />
      </section>
    );
  }
  return null;
};

export default RandomMemeList;
