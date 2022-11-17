import {
    BasicAnimationsType,
    FrameTypeEnum,
    Media,
    SlideDirections,
    UpdateZIndexMethod,
    VariableType,
} from '@chili-publish/editor-sdk';
import { ChangeEventHandler, FC, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import List, { ListItem } from '../../components/list/List';
import './RandomMemeList.css';

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

    const createBasicAnimation = (direction: SlideDirections) => {
        const basicAnimations: BasicAnimationsType = {
            intro: {
                from: 0,
                to: 1000,
                ease: 'noEase',
                styles: {
                    slide: {
                        slideDirection: direction,
                        offsetPercent: 100,
                    },
                },
            },
            outro: {
                from: 4000,
                to: 5000,
                ease: 'noEase',
                styles: {
                    scale: {
                        scalePercent: -0,
                    },
                },
            },
        };
        return basicAnimations;
    };

    const createNewImageFrame = async (selectedLayoutId: string, width: string, height: string, meme: Media) => {
        // cleanup frames
        const framesOnLayout = await window.SDK.frame.getFrames();
        framesOnLayout.parsedData?.forEach(async (frame) => {
            const frameInfo = (await window.SDK.frame.getFrameById(frame.frameId)).parsedData;
            if (!frameInfo?.frameName.includes('frameUp') && !frameInfo?.frameName.includes('frameDown')) {
                await window.SDK.frame.removeFrame(frame.frameId);
            }
        });

        await window.SDK.layout.setLayoutWidth(selectedLayoutId, width);
        await window.SDK.layout.setLayoutHeight(selectedLayoutId, height);

        const newFrame = await window.SDK.frame.addFrame(FrameTypeEnum.image, 0, 0, parseInt(width), parseInt(height));
        console.log(newFrame);
        if (newFrame.parsedData?.toString()) {
            await window.SDK.frame.setImageFromConnector(newFrame.parsedData?.toString(), 'meme-st', meme.id);
            await window.SDK.layout.setLayoutName(selectedLayoutId, meme.name);
        }
    };

    const positionTextFrame = async (
        frameName: string,
        x: string,
        y: string,
        width: string,
        height: string,
        slideDirection: SlideDirections,
    ) => {
        const frameId = await (await window.SDK.frame.getFrameByName(frameName)).parsedData?.frameId;
        if (frameId) {
            await window.SDK.frame.setFrameX(frameId, x);
            await window.SDK.frame.setFrameY(frameId, y);
            await window.SDK.frame.setFrameWidth(frameId, width);
            await window.SDK.frame.setFrameHeight(frameId, height);
            await window.SDK.frame.setEnableCopyfitting(frameId, true);
            await window.SDK.frame.setFrameZIndex(frameId, UpdateZIndexMethod.bringToFront);
            await window.SDK.animation.setFrameAnimation({
                frameId,
                from: 0,
                to: 5000,
                basicAnimations: createBasicAnimation(slideDirection),
            });
        }
    };

    const createTextFrames = async (layoutId: string, width: string, height: string) => {
        // UP
        positionTextFrame(
            'frameUpBR',
            '14',
            '10',
            String(parseInt(width) - 20),
            String(parseInt(height) / 10),
            SlideDirections.top,
        );
        positionTextFrame(
            'frameUpBL',
            '8',
            '10',
            String(parseInt(width) - 20),
            String(parseInt(height) / 10),
            SlideDirections.top,
        );
        positionTextFrame(
            'frameUpBT',
            '10',
            '8',
            String(parseInt(width) - 20),
            String(parseInt(height) / 10),
            SlideDirections.top,
        );
        positionTextFrame(
            'frameUpBB',
            '10',
            '12',
            String(parseInt(width) - 20),
            String(parseInt(height) / 10),
            SlideDirections.top,
        );
        positionTextFrame(
            'frameUp',
            '10',
            '10',
            String(parseInt(width) - 20),
            String(parseInt(height) / 10),
            SlideDirections.top,
        );

        // DOWN
        positionTextFrame(
            'frameDownBR',
            '14',
            `${height} - (${height} / 10) - 10`,
            String(parseInt(width) - 20),
            String(parseInt(height) / 10),
            SlideDirections.bottom,
        );
        positionTextFrame(
            'frameDownBL',
            '8',
            `${height} - (${height} / 10) - 10`,
            String(parseInt(width) - 20),
            String(parseInt(height) / 10),
            SlideDirections.bottom,
        );
        positionTextFrame(
            'frameDownBT',
            '10',
            `${height} - (${height} / 10) - 8`,
            String(parseInt(width) - 20),
            String(parseInt(height) / 10),
            SlideDirections.bottom,
        );
        positionTextFrame(
            'frameDownBB',
            '10',
            `${height} - (${height} / 10) - 12`,
            String(parseInt(width) - 20),
            String(parseInt(height) / 10),
            SlideDirections.bottom,
        );
        positionTextFrame(
            'frameDown',
            '10',
            `${height} - (${height} / 10) - 10`,
            String(parseInt(width) - 20),
            String(parseInt(height) / 10),
            SlideDirections.bottom,
        );
    };

    const selectMeme = async (meme: Media) => {
        const selectedLayout = await window.SDK.layout.getSelectedLayout();
        const selectedLayoutId = selectedLayout.parsedData?.layoutId;

        const width = meme.metaData.width || '0';
        const height = meme.metaData.height || '0';

        if (selectedLayoutId) {
            createNewImageFrame(selectedLayoutId, width, height, meme);
            createTextFrames(selectedLayoutId, width, height);

            // TODO: add 2 textFrames and manipulate variables in them
        }
    };

    const onTextUpChange = async (event: SyntheticEvent<HTMLInputElement>) => {
        const change = event.currentTarget.value;

        const textUp = await window.SDK.variable.getVariableByName('textUp');
        if (textUp.parsedData) {
            await window.SDK.variable.setVariableValue(textUp.parsedData.id, change);
        }
    };

    const onTextDownChange = async (event: SyntheticEvent<HTMLInputElement>) => {
        const change = event.currentTarget.value;

        const textDown = await window.SDK.variable.getVariableByName('textDown');
        if (textDown.parsedData) {
            await window.SDK.variable.setVariableValue(textDown.parsedData.id, change);
        }
    };
    useEffect(() => {
        const fetchMemes = async () => {
            const data = await window.SDK.mediaConnector.query('meme-st', {}, {});

            if (data.parsedData) {
                const parsedMemes = data.parsedData.data.map((meme) => {
                    return {
                        key: meme.id,
                        onClick: () => selectMeme(meme),
                        value: <img className="meme-img" src={meme.id} alt={meme.name} />,
                    };
                });
                setMemes(parsedMemes);
            } else {
                setMemes([]);
            }
        };

        if (canLoad) {
            fetchMemes();
        }
    }, [canLoad]);

    if (memes.length) {
        return (
            <section className="memelist">
                <section>
                    <div>
                        <label htmlFor="inputUp">Uptext: </label>
                        <input id="inputUp" onChange={onTextUpChange} />
                    </div>
                    <div>
                    <label htmlFor="inputDown">Downtext: </label>
                        <input id="inputDown" onChange={onTextDownChange} />
                    </div>
                </section>
                <List isHorizontal listItems={randomMemes} />
            </section>
        );
    }
    return null;
};

export default RandomMemeList;
