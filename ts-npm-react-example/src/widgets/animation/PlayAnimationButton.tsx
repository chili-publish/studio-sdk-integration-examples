import type { AnimationPlaybackType } from "@chili-publish/editor-sdk"
import { FC, useEffect, useMemo, useState } from "react"
import Button from "../../components/button/Button";

const PlayAnimationButton: FC = () => {
    const [animationPlaybackState, setAnimationPlaybackState] = useState<AnimationPlaybackType | null>(null);

    useEffect(() => {
        if (window.SDK) {
            window.SDK.config.onScrubberPositionChanged = (newAnimationPlaybackState) => {
                setAnimationPlaybackState(newAnimationPlaybackState)
            };
        }
        return () => {
            window.SDK.config.onScrubberPositionChanged = undefined
        }
    }, [])

    const buttonProps = useMemo(() => {
        if (animationPlaybackState?.animationIsPlaying) {
            return {onClick: () => window.SDK.animation.pauseAnimation() ,label: "Pause animation"};
        }
        return {onClick: () => window.SDK.animation.playAnimation() ,label: "Play animation"};
    }, [animationPlaybackState?.animationIsPlaying])

    const buttonLabelSuffix = useMemo(() => {
        if (animationPlaybackState?.animationIsPlaying) {
            const rounded = (animationPlaybackState.currentAnimationTimeMs / 1000).toFixed(2)
            return ` at ${rounded}`
        }
        return ''
    }, [animationPlaybackState])
    
    
    return (
        <Button onClick={buttonProps.onClick}>
            {buttonProps.label}{buttonLabelSuffix}
        </Button>
    )
}

export default PlayAnimationButton