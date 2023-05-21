import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import AddRecommendation from "../pages/addRecommendation";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/AddRecommendation">
                <AddRecommendation/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews